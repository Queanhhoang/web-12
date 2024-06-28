"use client"

import ShoppingCartItem from "@/components/ShoppingCartItem"
import { useAppContext } from "@/components/context"
import { callAPI } from "@/utils/api-caller"
import Link from "next/link"
import { useEffect, useState } from "react"

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;
const SHIPPING_COST = 30000;

const ShoppingCartPage = () => {
    const { shoppingCart, setShoppingCart } = useAppContext();
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        calcTotalPrice();
    }, [shoppingCart]);

    const calcTotalPrice = () => {
        let sum = 0;
        for (let i = 0; i < shoppingCart.length; i++) {
            sum += +shoppingCart[i].price * +shoppingCart[i].amount;
        }
        setSubTotalPrice(sum);
        setTotalPrice(sum + SHIPPING_COST);
    };

    const add = async (productId) => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount: 1 });
            setShoppingCart(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    const decrease = async (productId) => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount: -1 });
            setShoppingCart(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const remove = async (productId, amount) => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount });
            setShoppingCart(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const formatPrice = (price) => {
        if (price === undefined || price === null) return '';
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const subTotalPriceFormatted = formatPrice(subTotalPrice);
    const totalPriceFormatted = formatPrice(totalPrice);
    const shipPriceFormatted = formatPrice(SHIPPING_COST);

    return (
        <div className="h-screen-full bg-gray-100">
            <h2 className="flex items-center justify-center mb-10 p-4 font-extrabold text-2xl bg-orange-600 text-white">
             My Shopping Cart
            </h2>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {shoppingCart.map((val, index) => (
                        <ShoppingCartItem
                            key={index}
                            productId={val.id}
                            add={add}
                            decrease={decrease}
                            remove={remove}
                            image={URL_SERVER + val.image[0].url}
                            productName={val.name}
                            price={formatPrice(val.price * val.amount)}
                            category={val.category.name}
                            amount={val.amount}
                        />
                    ))}
                
                </div>
                
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">{subTotalPriceFormatted} VND</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">{shipPriceFormatted} VND</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">{totalPriceFormatted} VND</p>
                            <p className="text-sm text-gray-700 italic">including VAT</p>
                        </div>
                    </div>
                    <Link href={"/check-out"}>
                    <button className="mt-6 w-full rounded-md bg-orange-400 py-1.5 font-medium text-blue-50 hover:bg-orange-600">Check out</button>
                    </Link>
                   
                </div>
            </div>
           
        </div>
    )
}
export default ShoppingCartPage