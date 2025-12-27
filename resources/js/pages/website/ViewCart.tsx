import React from 'react';
import { useCart } from '@/components/website/CartContext';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ViewCart: React.FC = () => {

    const { cart, updateQty, removeFromCart } = useCart();

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return(
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h1 className='text-2xl font-bold mb-6'>Your Cart</h1>

            {cart.length === 0 ? (
                <div className='text-center py-20'>
                    <p className='text-gray-500 mb-4'>Your cart is empty</p>
                    <Link to='/' className='inline-block bg-purple-600 text-white px-6 py-2 rounded'>Continue Shopping</Link>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='md:col-span-2 space-y-4'>
                        {cart.map(item => (
                            <div
                                key={item.id}
                                className='flex gap-4 border rounded-lg p-4'
                            >
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div className='flex-1'>
                                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                                    <p className='text-purple-600'>${item.price}</p>
                                    <div className='flex items-center gap-3 mt-2'>
                                        <button
                                            className='px-3 py-1 border rounded cursor-pointer'
                                            onClick={() =>
                                                updateQty(item.id, item.quantity - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className='px-3 py-1 border rounded cursor-pointer'
                                            onClick={() =>
                                                updateQty(item.id, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                        
                                    </div> 
                                </div>  

                                <div className='flex flex-col items-end justify-between cursor-pointer'>
                                    <p className='font-semibold'>
                                            ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        className='text-red-600 ml-4 cursor-pointer'
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div> 
                            </div>
                        ))};
                    </div>

                    <div className='border rounded-lg p-4 h-fit'>
                        <h2 className='font-semibold text-lg mb-4'>Order Summary</h2>

                        <div className='flex justify-between mb-2'>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        
                        
                        <div className='border-t pt-3 flex justify-between font-bold'>
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <Link to="/checkout">
                            <button className=' cursor-pointer w-full mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700'>
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCart;