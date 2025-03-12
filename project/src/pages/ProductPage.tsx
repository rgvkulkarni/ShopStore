import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { Product } from '../types';
import { addToCart } from '../store/reducers/cartSlice';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-600 p-4">
        {error || 'Product not found'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1">{product.rating.rate}</span>
            </div>
            <span className="text-gray-500">({product.rating.count} reviews)</span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-3xl font-bold">${product.price}</div>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
          >
            <ShoppingCart className="h-6 w-6" />
            <span>Add to Cart</span>
          </button>

          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;