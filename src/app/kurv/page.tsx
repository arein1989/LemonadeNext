"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  strInstructions: string;
  image: string;
  strGlass: string;
  strCategory: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    console.log('Cart Items:', cartItems);
  }, [cartItems]);
  const [products, setProducts] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        interface Drink {
          idDrink: string;
          strDrink: string;
          strInstructions: string;
          strCategory: string;
          strGlass: string;
          strDrinkThumb: string;
        }

        const items = (data.drinks || []).map((drink: Drink) => ({
          id: drink.idDrink,
          name: drink.strDrink,
          strInstructions: drink.strInstructions,
          strCategory: drink.strCategory,
          strGlass: drink.strGlass,
          image: drink.strDrinkThumb,
          price: 10,
          quantity: 1, // Start med mængde 1
        }));
        setProducts(items);
        
        // Hent evt. gemte varer fra localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let updatedItems;
      
      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  
  

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="columns">
            <div className="columns is-multiline">
              {products.map((product) => (
                <div key={product.id} className="column is-one-third">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          width={300}
                          height={225}
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3 className="title is-4">{product.name}</h3>
                      <p className="subtitle is-6 mt-3">{product.strCategory}</p>
                      <p className="subtitle is-6">{product.strGlass}</p>
                      <p className="subtitle is-6">{product.strInstructions}</p>
                      <button 
                        className="button is-whiht mt-3 "
                        onClick={() => addToCart(product)} style={{border: '1px solid #188151'}}
                      >
                        Tilføj til kurv ${product.price}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          
        
          </div>
      
      
    </>
  );
};

export default Cart;