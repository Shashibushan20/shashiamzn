import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';

function CheckoutProduct({ id, title, price, ratingLength, description, category, image, hasPrime }) {
    const dispatch = useDispatch();
    const handleAddToBasket = () => {
        // Dispatch the addToBasket action with the product details
        dispatch(
          addToBasket({
            id,
            title,
            price,
            ratingLength,
            description,
            category,
            image,
            hasPrime,
          })
        );
      };
    
      const handleRemoveFromBasket = () => {
        // Dispatch the removeFromBasket action with the product id
        dispatch(removeFromBasket({ id }));
      };
    const priceInINR = (parseFloat(price) * 83).toFixed(2);
    
    
  return (
    <div className='grid grid-cols-5'>
      <Image src={image} height={200} width={200} objectFit='contain' />
      {/* Middle */}
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
            {Array(ratingLength)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
             ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <h1 className='mb-5'>{priceInINR}₹</h1>
        {hasPrime && (
         <p className="text-sm font-extrabold text-blue-500">
          <span className="text-yellow-500 extrabold">✓</span>prime -{' '}
          <span className="text-sm text-gray-500 font-normal">Free Next-Day Delivery</span>
         </p>
        )}
      </div>
      <div className='flex flex-col space-y-2 my-auto justify-self-end'> 
        <button onClick={handleAddToBasket} className='button'>Add to basket</button>
        <button onClick={handleRemoveFromBasket} className='button'>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct
