import React, { useContext, useEffect, useState } from 'react';
import { APIResponse } from '../view/ContextData';

const FoodData = () => {

  const {APIData,SetAPIData}=useContext(APIResponse)


    const [FoodMenu,setFoodMenu]=useState([])
  const getfoodinfo = async () => {
    try {
      const response = await fetch(
        'https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null'
      );

      if (!response.ok) {
        console.log('API Response is not Valid', response);
        return;
      }

      const result = await response.json();
    //   console.log(result);
    // const data=JSON.parse(result.data)
    if(result){
      SetAPIData(JSON.parse(result.data))

    }
    // console.log(data)
//    const newdata=  data.CategoryList.map((item)=>{
//        return item.CategryName

//     })
// if(newdata){
//     setFoodMenu(newdata)
// }

// const alldata=data.CategoryList.map((item,index)=>{
//     console.log("all data ",index,item)
// })
} catch (err) {
      console.log('catch block', err);
    }
  };

  useEffect(() => {
    getfoodinfo();
  }, []);
//   useEffect(()=>{
//     if(FoodMenu!==null){
//     console.log("food menu :",FoodMenu)
        
//     }
//   },[FoodMenu])

  return <></>;
};

export default FoodData;
