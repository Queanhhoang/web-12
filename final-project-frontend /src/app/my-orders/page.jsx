"use client";

import OrderItem from "@/components/OrderItem";
import { callAPI } from "@/utils/api-caller";
import { useEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  import moment from 'moment';


const MyOrders = ()=>{
    const [orders, setOrders] = useState([])
    useEffect(()=>{fetchData()},[])
    const fetchData = async()=>{
        try {
            const res = await callAPI("/my-orders", "GET")
            console.log(res.data)
            setOrders(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const formatPrice = (price) => {
        if (price === undefined || price === null) return '';
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <div>
            <h2 className="flex items-center justify-center mb-5 p-4 font-extrabold text-2xl bg-orange-600 text-white">
             My Order
            </h2>
            <div className="py-8 mx-3 md:mx-20">
                <h2 className="text-3xl font-bold text-primary mb-10"> Order History</h2>
                <div>
                    {
                        orders.map((val, index) => {
                            return (
                                <Collapsible key={index}>
                                    <CollapsibleTrigger>
                                        <div className = 'border p-2 bg-slate-100 flex justify-evenly gap-40'>
                                            <h2><span className="font-bold mr-2">Order Date: </span> {moment(val.createdAt).format('DD/MM/yyyy')}</h2>
                                            <h2><span className="font-bold mr-2">Total Price: </span> {formatPrice(val.totalPrice)} VND </h2>
                                            <h2><span className="font-bold mr-2">Status: </span> {val.status} </h2>
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                     {
                                        val.products.map((order,index2)=>{
                                            return(
                                                <OrderItem
                                                    products={order}
                                                    key={index2}
                                                />
                                            )
                                        })
                                     }
                                    </CollapsibleContent>
                              </Collapsible>
                              
                            )
                        })
                    }


                </div>
                
            </div>
        </div>
    )
}
export default MyOrders