// "use client"

// import ShoppingCartItem from "@/components/ShoppingCartItem"
// import { useAppContext } from "@/components/context"
// import { callAPI } from "@/utils/api-caller"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { useRouter } from 'next/navigation'

// const SHIPPING_COST = 30000;
// const CheckOut = () => {
//     const { shoppingCart, setShoppingCart } = useAppContext();
//     const [subTotalPrice, setSubTotalPrice] = useState(0);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [name, setName] = useState("");
//     const [address, setAddress] = useState("");
//     const [phone, setPhone] = useState("");
//     const router = useRouter();

//     useEffect(() => {
//         calcTotalPrice();
//     }, [shoppingCart]);

//     const calcTotalPrice = () => {
//         let sum = 0;
//         for (let i = 0; i < shoppingCart.length; i++) {
//             sum += +shoppingCart[i].price * +shoppingCart[i].amount;
//         }
//         setSubTotalPrice(sum);
//         setTotalPrice(sum + SHIPPING_COST);
//     };
//     const onPayment = async () => {
//         try {
//             const data = {
//                 name,
//                 address,
//                 phone,
//             };
//             const res = await callAPI("/check-out", "POST", data);
//             setShoppingCart([]);
//             router.push("/order-confirmation");
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     const formatPrice = (price) => {
//         if (price === undefined || price === null) return '';
//         return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     };

//     const subTotalPriceFormatted = formatPrice(subTotalPrice);
//     const totalPriceFormatted = formatPrice(totalPrice);
//     const shipPriceFormatted = formatPrice(SHIPPING_COST);
//     return (
//         <div className="">
//             <h1 className="flex items-center justify-center mb-10 p-3 font-extrabold text-2xl bg-orange-600 text-white">
//              Check Out
//             </h1>
//             <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
//                 <div className = "md:col-span-2 mx-20">
//                     <h2 className="font-bold text-3xl">Billing Details</h2>
//                     <div className="grid grid-cols-2 gap-10 mt-3">
//                         <input
//                         value={name}
//                         onChange={e => setName(e.target.value)}
//                         placeholder="Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
//                         <input
//                         value={phone}
//                         onChange={e => setPhone(e.target.value)}
//                         placeholder="Phone Numer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
//                     </div>
//                     <div className="mt-3">
//                         <input
//                         value={address}
//                         onChange={e => setAddress(e.target.value)}
//                         placeholder="Address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
//                     </div>
//                 </div>
//                 <div className="mx-10 border">
//                     <h2 className="p-3 bg-gray-200 font-bold text-center"> Invoice </h2>
//                     <div className="p-4 flex flex-col gap-4">
//                         <h2 className="font-bold flex justify-between">Subtotal: <span>{subTotalPriceFormatted} VND</span></h2>
//                         <hr></hr>
//                         <h2 className="flex justify-between">Shipping: <span>{shipPriceFormatted} VND</span></h2>
//                         <hr></hr>
//                         <h2 className="font-bold flex justify-between">Total: <span>{totalPriceFormatted} VND</span></h2>
//                         <button onClick={onPayment} className="mt-6 w-full rounded-md bg-orange-400 py-1.5 font-medium text-blue-50 hover:bg-orange-600">Payment</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CheckOut;
"use client";

import ShoppingCartItem from "@/components/ShoppingCartItem";
import { useAppContext } from "@/components/context";
import { callAPI } from "@/utils/api-caller";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SHIPPING_COST = 30000;
const CheckOut = () => {
  const { shoppingCart, setShoppingCart } = useAppContext();
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(""); // Add state for phone error
  const router = useRouter();

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

  const validatePhone = (phone) => {
    // Ensure phone number contains only digits and is 10 digits long
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const onPayment = async () => {
    if (!validatePhone(phone)) {
      setPhoneError(
        "Phone number must be 10 digits long and contain only digits"
      );
      return;
    }

    try {
      const data = {
        name,
        address,
        phone,
      };
      const res = await callAPI("/check-out", "POST", data);
      setShoppingCart([]);
      router.push("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const subTotalPriceFormatted = formatPrice(subTotalPrice);
  const totalPriceFormatted = formatPrice(totalPrice);
  const shipPriceFormatted = formatPrice(SHIPPING_COST);
  return (
    <div className="">
      <h1 className="flex items-center justify-center mb-10 p-3 font-extrabold text-2xl bg-orange-600 text-white">
        Check Out
      </h1>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError(""); // Clear error when user starts typing
              }}
              placeholder="Phone Number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          {phoneError && (
            <p className="text-red-500 text-sm mt-2">{phoneError}</p>
          )}
          <div className="mt-3">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center"> Invoice </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>{subTotalPriceFormatted} VND</span>
            </h2>
            <hr></hr>
            <h2 className="flex justify-between">
              Shipping: <span>{shipPriceFormatted} VND</span>
            </h2>
            <hr></hr>
            <h2 className="font-bold flex justify-between">
              Total: <span>{totalPriceFormatted} VND</span>
            </h2>
            <button
              onClick={onPayment}
              className="mt-6 w-full rounded-md bg-orange-400 py-1.5 font-medium text-blue-50 hover:bg-orange-600"
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
