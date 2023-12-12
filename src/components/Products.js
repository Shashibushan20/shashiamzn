import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
import CheckoutProduct from './CheckoutProduct';
import { useState } from 'react';

function Products( { id, title, price, rating, description, category, image } ) {

  const dispatch = useDispatch();
  const [ratingLength, setRatingLength] = useState(Math.floor(Math.random() * 5) + 1);
  const addItemToBasket = () => {
    const product ={
      id,
      title,
      price,
      ratingLength,
      description,
      category, 
      image, 
      hasPrime,
    };
    dispatch (addToBasket(product));
  }

    const hasPrime = Math.random() < 0.5;
    const stars = Array.from({ length: ratingLength }, (_, index) => (
      <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
    ));
      const priceInINR = (parseFloat(price) * 83).toFixed(2);
  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10 mx-auto'>
        <div>
      <p className='absolute top-2 right-2 italic text-xs text-gray-400'>{category}</p></div>
      <div className="mx-auto mb-5"> {/* Center the image */}
        <Image src={image} height={200} width={200} objectFit="contain" />
      </div>
      <h4>{title}</h4>
      <div className="flex space-x-1">{stars}</div>
      <div>
      <p className='text-xs my-2 line-clamp-2'>{description}</p>
      </div>
      <div>
        <h1 className='mb-5'>{priceInINR}₹</h1>
      </div>
      <div className='flex items-center space-x-2 mb-5'>
      {hasPrime && (
         <p className="text-sm font-extrabold text-blue-500">
          <span className="text-yellow-500 extrabold">✓</span>prime -{' '}
          <span className="text-sm text-gray-500 font-normal">Free Next-Day Delivery</span>
         </p>
        )}
      </div>
      <div>
        <button onClick={addItemToBasket} className='absolute w-full button bottom-0 left-0'>Add to basket</button>
      </div>
    </div>
  )
}

export default Products
