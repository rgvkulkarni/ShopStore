import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Store } from 'lucide-react';
import { RootState } from '../store';

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8" />
            <span className="text-2xl font-bold">ShopStore</span>
          </Link>
          
          <Link to="/cart" className="flex items-center space-x-2">
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;