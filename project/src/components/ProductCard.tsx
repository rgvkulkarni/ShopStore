import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Star, Plus, Minus, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { addToCart, removeFromCart, updateQuantity } from '../store/reducers/cartSlice';
import { RootState } from '../store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [showAddAnimation, setShowAddAnimation] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemInCart = cartItems.find(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowAddAnimation(true);
    setTimeout(() => setShowAddAnimation(false), 1000);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      {showAddAnimation && (
        <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center animate-bounce">
          <Plus className="h-5 w-5" />
        </div>
      )}
      
      <Link to={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1">{product.rating.rate}</span>
          <span className="text-gray-500 ml-2">({product.rating.count} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          {itemInCart ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdateQuantity(itemInCart.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Decrease quantity"
              >
                {itemInCart.quantity === 1 ? (
                  <Trash2 className="h-4 w-4 text-red-500" />
                ) : (
                  <Minus className="h-4 w-4 text-gray-600" />
                )}
              </button>
              
              <span className="w-8 text-center font-medium">
                {itemInCart.quantity}
              </span>
              
              <button
                onClick={() => handleUpdateQuantity(itemInCart.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-lg flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;