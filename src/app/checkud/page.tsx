"use client";

import { useEffect, useState } from 'react';
import { useLemon } from '../../context/LemonContext';
import Navbar from '@/components/navbar';
import trest from '../../../public/trest.jpg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { lemon, setLemon } = useLemon();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleCheckout = () => {
    // Opdater lemon profit
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setLemon(lemon + total);
    
    // Ryd kurven
    localStorage.removeItem('cart');
    router.push('/tak');
  };
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div>
      <Navbar />
      <div className="container flex justify-center">
                  
                  {cartItems.length === 0 ? (
                    <div className='container' style={{
                        backgroundImage: `url(${trest.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "100vh"}}>
                        <h4 className='mt-5 ml-5 is-5 justify-center'>Din kurv er tom</h4>
                    </div>
                  ) : (
                    <>
                      {cartItems.map(item => (
                        <div key={item.id} className="box mb-3">
                          <div className="media">
                            <div className="media-left">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                              />
                            </div>
                            <div className="media-content">
                              <p className="title is-5">{item.name}</p>
                              <p className="subtitle is-6">${item.price} x {item.quantity}</p>
                              <div className="buttons has-addons">
                                <button 
                                  className="button is-small"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <button className="button is-small is-static">
                                  {item.quantity}
                                </button>
                                <button 
                                  className="button is-small"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                                <button 
                                  className="button is-small is-danger"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  Fjern
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="box">
                        <h3 className="title is-4">Total: ${totalPrice}</h3>
                        <button 
                          className="button mt-3"
                          onClick={handleCheckout} style={{border: '1px solid #188151'}}
                        >
                          Tjek ud 🍋
                        </button>
                      </div>
                    </>
                  
          )}
        </div>
      </div>

  );
};

export default Checkout;