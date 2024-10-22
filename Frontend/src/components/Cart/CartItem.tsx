export interface CartItemProps {
    id: string;
    productName: string;
    productImage: string;
    quantity: number;
    price?: {
      $numberDecimal: string;
    };
    totalPrice?: {
      $numberDecimal: string;
    };
  }
  
  const CartItem = ({
    productName,
    productImage,
    quantity,
    pricePerItem,
    totalPrice,
  }: {
    productName: string;
    productImage: string;
    quantity: number;
    pricePerItem: number;
    totalPrice: number;
  }) => (
    <div className="flex items-center space-x-4 p-4 border-b">
      <img src={productImage} alt={productName} className="w-16 h-16 object-cover" />
      <div className="flex-1">
        <h2 className="font-semibold text-lg">{productName}</h2>
        <p>Quantity: {quantity}</p>
        <p>Price per item: €{pricePerItem.toFixed(2)}</p>
      </div>
      <div>
        <p className="font-semibold">Total: €{totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
  
  export default CartItem;
