import { useState } from 'react';
import axios from 'axios';

function App() {
  const [newdata, setnewData] = useState([]); 
  const [cart, setCart] = useState([]); 

 
  const submitHandler = async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    console.log(response.data);
    setnewData(response.data);
  };


  const removeFromCartHandler = (productId) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(item => item.id === productId); 
      if (index !== -1) { 
        updatedCart.splice(index, 1); 
        return updatedCart; 
      }
      return prevCart; 
    });
  };
  

  const addToCartHandler = (product) => {
    setCart((prevCart) => [...prevCart, product]); 
  };

  return (
    <div className="flex">
   
      <div className="w-3/4 p-5 bg-gray-300 h-[200%]">
        <button
          onClick={submitHandler}
          className="bg-blue-500 text-white mt-5 px-3 py-2 rounded-md hover:bg-blue-800"
        >
          Products
        </button>
       
        <div className="line mt-2 h-[1px] w-full bg-black"></div>

       
        <div className="flex flex-wrap gap-4 mt-5">
          {newdata.map((item) => (
            <div
              key={item.id}
              className="card bg-gray-400 rounded-md ml-4 h-fit p-2 w-[180px]"
            >
              <img
                className="h-[150px] mt-2 w-[150px] object-cover mx-auto"
                src={item.image}
                alt={item.title}
              />
              <h4 className="text-center font-normal leading-4 text-bold mt-2">
                {item.title}
              </h4>
              <p className="text-center mt-2 leading-4 text-gray-700 text-sm line-clamp-2">
                {item.description}
              </p>
              <p className="text-center font-bold">${item.price}</p>
              <div className="flex justify-center mt-auto">
                <button
                  onClick={() => addToCartHandler(item)} // Add product to cart when clicked
                  className="bg-blue-500 text-sm mt-2 text-white px-2 py-1 rounded-md hover:bg-blue-800"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/4 bg-gray-500 min-h-screen">
        <h2 className="text-white text-xl font-bold underline ml-5">Cart List</h2>

       
        <div>
          {cart.length === 0 ? (
            <p className="text-white">Your cart is empty!</p>
          ) : ( 
            cart.map((item, index) => (
              <div key={index} className="p-2 bg-gray-400 rounded-md shadow-slate-100 h-fit w-[260px] ml-6 mb-1 mt-2 px-4">
                <img
                  className="h-[120px] w-[150px] object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <h4 className="text-white">{item.title}</h4>
                <p className="text-white ml-12">${item.price}</p>
                <button onClick={()=>removeFromCartHandler(item.id)} className='bg-blue-500 text-sm rounded-md p-2 text-white py-1 mt-1 ml-2'>Remove from cart</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
