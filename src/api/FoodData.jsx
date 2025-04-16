import React, { useContext, useEffect, useState } from 'react';
import { APIResponse } from '../view/ContextData';

const FoodData = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

  const {APIData,SetAPIData}=useContext(APIResponse)


    const [FoodMenu,setFoodMenu]=useState([])
  const getfoodinfo = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        console.log('API Response is not Valid', response);
        return;
      }

      const result = await response.json();
    if(result){
      SetAPIData(JSON.parse(result.data))

    }
  
} catch (err) {
      console.log('Catch Block', err);
    }
  };

  useEffect(() => {
    getfoodinfo();
  }, []);


  return <></>;
};

export default FoodData;
