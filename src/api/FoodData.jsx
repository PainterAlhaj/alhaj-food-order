import React, { useContext, useEffect } from 'react';
import { APIResponse } from '../view/ContextData';

const FoodData = () => {
  //  API URL from .env file
  const API_URL = import.meta.env.VITE_API_URL;

  //  Accessing context for setting API data
  const { APIData, SetAPIData } = useContext(APIResponse);

  //  Fetching food info
  const getFoodInfo = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        console.log('API Response is not valid:', response.status);
        return;
      }

      const result = await response.json();

      if (result?.data) {
        // Parsing and setting data into context
        SetAPIData(JSON.parse(result.data));
      } else {
        console.warn('No data found in API response.');
      }
    } catch (err) {
      console.error('Catch Block Error:', err);
    }
  };

  //  Call fetch function once component mounts
  useEffect(() => {
    getFoodInfo();
  }, []);

  return <></>; 
};

export default FoodData;
