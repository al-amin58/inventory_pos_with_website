import React from "react";
import { FaTimes } from "react-icons/fa";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
    const { cart, isOpen, toggleCart, updateQty, removeFromCart } = useCart();

    return(
        <>
            {isOpen && (
                <div className=" fixed inset-0 bg-black/50 z-40" onClick={toggleCart}></div>
            )}
{/* h-full w-[85%] max-w-md  top-0*/}
            <div className={`fixed  right-0 
                top-[64px]
                h-[calc(100vh-110px)]
                w-[85%] max-w-md
                bg-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} >
                <div className="flex justify-between p-4 border-b">  
                    <h2 className=" font-bold text-lg">Cart</h2>
                    <FaTimes onClick={toggleCart}  className=" cursor-pointer"/>
                </div>

                <div className=" p-4 space-y-4 overflow-y-auto h-[70%] ">
                    {cart.map(item => (
                        <div key={item.id} className="flex gap-4 shadow-inner p-2 rounded">
                            <img src={item.img} className="w-16 h-16 object-cover rounded" alt="" />
                            <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-purple-600">${item.price}</p>
                                <div className="flex gap-2 items-center mt-1">
                                    <button className="cursor-pointer" onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className="cursor-pointer" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                        </div>  
                    ))}
                </div>

                <div className=" p-4 border-t space-y-2">
                    
                    <Link 
                        to="/cart" 
                        onClick={toggleCart}
                    >
                        <button  className="cursor-pointer w-full border mb-2 border-purple-600 text-purple-600 hover:text-white hover:bg-purple-600 py-2 rounded">
                        View Cart
                        </button>
                    </Link>
                    <Link 
                        to="/checkout" 
                        onClick={toggleCart}
                        
                    >
                        <button  className="cursor-pointer w-full bg-purple-600 text-white py-2 rounded">
                        Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};
export default CartDrawer;