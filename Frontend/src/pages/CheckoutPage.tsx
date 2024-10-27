import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import CartItem from "../components/Cart/CartItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CheckoutPage() {
  const { cart } = useCart();
  const { checkAuth, user } = useAuth();
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    apartment: "",
    zip: "",
  });
  const [selectedShop, setSelectedShop] = useState(""); // State for selected shop
  const [isUsingShippingAddress, setIsUsingShippingAddress] = useState(true); // New state to toggle between dropdown and shipping address
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [shippingCost, setShippingCost] = useState(5.99); // Set initial shipping cost
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  // List of shop addresses
  const shopAddresses = [
    "Molėtų pl. 8, 08426 Vilnius",
    "Ukmergės g. 322, 06142 Vilnius",
    "Vytauto Pociūno g. 8, 06264 Vilnius",
    "Kalvarijų g. 206, 08314 Vilnius",
    "Ozo g. 18, 08243 Vilnius",
    "Ozo g. 25, 08217 Vilnius",
    "Ulono g. 5, 08240 Vilnius",
    "Gedimino pr. 9, 01105 Vilnius",
    "Pilies g. 3, 01123 Vilnius",
    "Gedimino pr. 51, 01504 Vilnius",
    "Gedimino pr. 52, 01110 Vilnius",
    "Gynėjų g. 16, 01108 Vilnius",
  ];

  useEffect(() => {
    const loadPage = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (user?.email && !user?.roles.includes("user")) {
          navigate("/verify");
        }
      }
    };
    loadPage();
  }, [checkAuth, navigate, user]);

  useEffect(() => {
    if (cart.items.length === 0) {
      setError("Cart is empty. Please add items to your cart before proceeding to checkout.");
    }
  }, [cart.items]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "zip") {
      const zip = value.replace(/\D/g, "").slice(0, 5); // Only allow numbers and limit to 5 characters
      setShippingAddress({ ...shippingAddress, zip });
    } else {
      setShippingAddress({
        ...shippingAddress,
        [name]: value,
      });
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedValue = value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, 19);
      setPaymentInfo({ ...paymentInfo, cardNumber: formattedValue });
    } else if (name === "expiryDate") {
      let formattedDate = value.replace(/\D/g, ""); // Only allow numbers

      if (formattedDate.length >= 2) {
        const month = formattedDate.slice(0, 2);
        if (parseInt(month) < 1 || parseInt(month) > 12) return; // Validate month

        formattedDate = month + "/" + formattedDate.slice(2, 4); // Auto-insert "/" after month
      }
      setPaymentInfo({ ...paymentInfo, expiryDate: formattedDate.slice(0, 5) }); // Limit MM/YY format
    } else if (name === "cvv") {
      const cvv = value.replace(/\D/g, "").slice(0, 3); // Only allow numbers and limit to 3 characters
      setPaymentInfo({ ...paymentInfo, cvv });
    } else {
      setPaymentInfo({ ...paymentInfo, [name]: value });
    }
  };

    // Generate a unique order number
    const generateOrderNumber = () => {
      return `ORDER-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    };

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      setError("Cart is empty. Please add items to your cart before proceeding to checkout.");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions before placing the order.");
      return;
    }

    const orderNumber = generateOrderNumber();

    // Determine the selected address
    const finalAddress = selectedShop || `${shippingAddress.street}, ${shippingAddress.apartment}, ${shippingAddress.zip}, ${shippingAddress.city}`;
    
    try {
      await axios.post(
        "http://localhost:7000/api/v1/transactions",
        {
          shippingAddress: finalAddress,
          paymentInfo,
          items: cart.items,
          total: (parseFloat(cart.total) + shippingCost).toFixed(2),
        },
        { withCredentials: true }
      );

      // After successful checkout, navigate to the confirmation page with order details
      navigate("/confirmation", {
        state: {
            orderNumber,
            cartItems: cart.items,
            total: (parseFloat(cart.total) + shippingCost).toFixed(2),
            shippingCost,
        },
    });
    } catch (err) {
      setError("Checkout failed. Please check your payment information.");
      console.error(err);
    }
  };

  const handleAcceptTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms(e.target.checked);
  };

  // Adjust shipping cost based on selection
  useEffect(() => {
    setShippingCost(isUsingShippingAddress ? 5.99 : 0); // Set shipping cost to 0 if using shop address
  }, [isUsingShippingAddress]);

  return (
    <div className="flex space-x-8 p-8 h-full">
      <div className="w-3/5 h-full p-4 rounded-lg bg-slate-200 dark:bg-zinc-800 shadow flex flex-col dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Your Cart Items</h2>
        <div className="flex-grow space-y-4 overflow-auto">
          {cart.items.length > 0 ? (
            cart.items.map((item: any) => (
              <CartItem
                key={item.productId}
                productId={item.productId}
                quantity={item.quantity}
                pricePerItem={parseFloat(item.total.$numberDecimal)}
                totalPrice={parseFloat(item.total.$numberDecimal) * item.quantity}
              />
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </div>
      </div>

      <div className="w-2/5 h-full p-4 rounded-lg bg-slate-200 dark:bg-zinc-800 dark:text-white shadow flex flex-col">
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/products")}
            >
              Go to Products
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            
            {/* Toggle between dropdown and shipping address inputs */}
            <div className="flex mb-4">
              <button
                className={`flex-1 p-2 text-sm ${isUsingShippingAddress ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setIsUsingShippingAddress(true)}
              >
                Use Shipping Address
              </button>
              <button
                className={`flex-1 p-2 text-sm ${!isUsingShippingAddress ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setIsUsingShippingAddress(false)}
              >
                Select Shop Address
              </button>
            </div>

            {/* Show either the shipping address inputs or the dropdown */}
            {isUsingShippingAddress ? (
              <>
                <label htmlFor="street" className="text-xs">Street (Ex. 123 Main St)</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  className="border p-2 mb-2 w-full"
                  value={shippingAddress.street}
                  onChange={handleShippingChange}
                />
                <label htmlFor="apartment" className="text-xs">Apartment (Ex. Apt 12)</label>
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, building, etc."
                  className="border p-2 mb-2 w-full"
                  value={shippingAddress.apartment}
                  onChange={handleShippingChange}
                />
                <label htmlFor="zip" className="text-xs">ZIP Code (LT-XXXXX)</label>
                  <div className="flex space-x-2 mb-2">
              <span className="border p-2 bg-gray-200">LT-</span>
              <input
                type="text"
                name="zip"
                placeholder="12345"
                className="border p-2 flex-1"
                value={shippingAddress.zip}
                onChange={handleShippingChange}
                maxLength={5}
                pattern="\d*"
              />
                  </div>
                <label htmlFor="city" className="text-xs">City (Ex. Vilnius)</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="border p-2 mb-2 w-full"
                  value={shippingAddress.city}
                  onChange={handleShippingChange}
                />
              </>
            ) : (
              <>
                <label htmlFor="shopSelect" className="text-xs">Select a Shop Address</label>
                <select
                  id="shopSelect"
                  className="border p-2 mb-2 w-full"
                  value={selectedShop}
                  onChange={(e) => setSelectedShop(e.target.value)}
                >
                  <option value="">Select a shop...</option>
                  {shopAddresses.map((shop, index) => (
                    <option key={index} value={shop}>{shop}</option>
                  ))}
                </select>
              </>
            )}

            <h2 className="text-xl font-semibold mt-6 mb-4">Payment Information</h2>
            <label htmlFor="name" className="text-xs">Full Cardholder Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Cardholder Name"
              className="border p-2 mb-2 w-full"
              value={paymentInfo.name}
              onChange={handlePaymentChange}
            />
            <label htmlFor="cardNumber" className="text-xs">Card Number (Ex. 1234 5678 9123 4567)</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              className="border p-2 mb-2 w-full"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentChange}
              maxLength={19}
            />
            <label htmlFor="expiryDate" className="text-xs">Expiry Date (MM/YY)</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              className="border p-2 mb-2 w-full"
              value={paymentInfo.expiryDate}
              onChange={handlePaymentChange}
              maxLength={5}
            />
            <label htmlFor="cvv" className="text-xs">CVV (3 digits)</label>
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              className="border p-2 mb-2 w-full"
              value={paymentInfo.cvv}
              onChange={handlePaymentChange}
              maxLength={3}
            />

            {/* Summary Section */}
            <h2 className="text-xl font-semibold mt-6 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal:</p>
              <p>{cart.subtotal}€</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Shipping:</p>
              <p>{shippingCost}€</p>
            </div>
            <div className="flex justify-between mb-2 font-bold">
              <p>Total:</p>
              <p>{(parseFloat(cart.total) + shippingCost).toFixed(2)}€</p>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mt-4">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={handleAcceptTerms}
              />
              <label htmlFor="acceptTerms" className="ml-2">
                I accept the terms and conditions
              </label>
            </div>

            {/* Error message display */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Place Order Button */}
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
              onClick={handleCheckout}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}