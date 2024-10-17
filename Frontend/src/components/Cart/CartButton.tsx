import { useEffect, useState } from 'react';
import { IconShoppingCart } from '@tabler/icons-react'; 
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios'; 
import { Link } from "react-router-dom";

const CartButton = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/v1/users/cart', {withCredentials: true});
        setTotalItems(response.data.data.items.length); 
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (auth) {
      fetchCartItems();
    }
  }, [auth]);

  if (!auth) return null; 

  return (
    <Link to="/purchase" className="relative flex items-center">
      <button
        className="flex items-center p-2 rounded-full text-gray-800 hover:text-gray-900"
        aria-label="Your Cart"
        onMouseEnter={() => setIsTooltipVisible(true)} // Show tooltip on hover
        onMouseLeave={() => setIsTooltipVisible(false)} // Hide tooltip when not hovering
      >
        <IconShoppingCart stroke={2} className="h-6 w-6" />
        <span className="ml-1 text-sm font-bold text-white bg-red-500 rounded-full px-2 py-0.5">
          {totalItems}
        </span>
      </button>

      {/* Tooltip on hover */}
      {isTooltipVisible && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded-md p-2 opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Your Cart
        </div>
      )}
    </Link>
  );
};

export default CartButton;
