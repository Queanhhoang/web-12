// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "../components/ui/button";
// import Link from "next/link";
// import { useAppContext } from "./context";
// import { callAPI } from "../utils/api-caller";

// const ProductItem = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const { user, setShoppingCart } = useAppContext();
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");

//   const imageUrl1 = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${product?.attributes?.image?.data[0]?.attributes?.url}`;
//   const imageUrl2 = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${product?.attributes?.image?.data[1]?.attributes?.url}`;
//   const imageStyle = {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     transition: "opacity 0.5s ease-in-out",
//   };

//   const formatPrice = (price) => {
//     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   const priceFormatted = formatPrice(product?.attributes?.price);
//   const productID = product?.id;

//   const addToCart = async (productId) => {
//     if (!user) {
//       setAlertMessage("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
//       setShowAlert(true);
//       setTimeout(() => {
//         setShowAlert(false);
//       }, 2000);
//       return;
//     }

//     try {
//       const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount: 1 });
//       setShoppingCart(res.data);
//       setAlertMessage("Thêm vào giỏ hàng thành công");
//       setShowAlert(true);
//       setTimeout(() => {
//         setShowAlert(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   return (
//     <div>
//       <div
//         className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md
//                       hover:scale-105 hover:shadow-lg
//                       transition-all ease-in-out cursor-pointer"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <Link href={`/products/${productID}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
//           <Image
//             src={imageUrl1}
//             width={200}
//             height={200}
//             alt={product?.attributes?.name}
//             style={{ ...imageStyle, opacity: isHovered ? 0 : 1 }}
//             className="h-[200px] w-[200px] object-contain"
//           />
//           <Image
//             src={imageUrl2}
//             width={200}
//             height={200}
//             alt={product?.attributes?.name}
//             style={{ ...imageStyle, opacity: isHovered ? 1 : 0 }}
//             className="h-[200px] w-[200px] object-contain"
//           />
//         </Link>
//         <div className="mt-4 px-5 pb-5 flex flex-col justify-between min-h-[160px]">
//           <div className="min-h-[100px]">
//             <a href={`/products/${productID}`}>
//               <span className="block opacity-75 -mb-1 mt-2 text-md font-medium text-orange-500">
//                 {product?.attributes?.brand?.data?.attributes?.name}
//               </span>
//               <h5 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
//                 {product?.attributes?.name}
//               </h5>
//             </a>
//           </div>
//           <div>
//             <div className="mt-3 mb-5 flex items-center justify-between">
//               <p>
//                 <span className="text-xl text-slate-900">{priceFormatted} VND</span>
//               </p>
//             </div>
//             <div className="flex justify-center">
//               <Button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   addToCart(productID);
//                 }}
//                 className="flex items-center justify-center w-full max-w-xs rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="mr-2 h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 Add to cart
//               </Button>
//             </div>
//           </div>
//           {showAlert && (
//             <div
//               className="fixed bottom-[1%] right-[1%] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
//               role="alert"
//             >
//               <svg
//                 className="flex-shrink-0 inline w-4 h-4 me-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//               </svg>
//               <span className="sr-only">Info</span>
//               <div>
//                 <span className="font-medium">Info alert!</span> {alertMessage}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductItem;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { useAppContext } from "./context";
import { callAPI } from "../utils/api-caller";
import { getUser } from "@/utils/helper";

const ProductItem = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setShoppingCart } = useAppContext();
  const [user, setUserState] = useState(getUser());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const imageUrl1 = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${product?.attributes?.image?.data[0]?.attributes?.url}`;
  const imageUrl2 = `${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${product?.attributes?.image?.data[1]?.attributes?.url}`;
  const imageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "opacity 0.5s ease-in-out",
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const priceFormatted = formatPrice(product?.attributes?.price);
  const productID = product?.id;

  const addToCart = async (productId) => {
    try {
      const res = await callAPI("/add-to-shopping-cart", "POST", {
        productId,
        amount: 1,
      });
      setShoppingCart(res.data);
      setAlertMessage("Added to cart successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const closeModal = () => {
    setShowLoginAlert(false);
  };

  return (
    <div>
      <div
        className="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md
                      hover:scale-105 hover:shadow-lg
                      transition-all ease-in-out cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={`/products/${productID}`}
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        >
          <Image
            src={imageUrl1}
            width={200}
            height={200}
            alt={product?.attributes?.name}
            style={{ ...imageStyle, opacity: isHovered ? 0 : 1 }}
            className="h-[200px] w-[200px] object-contain"
          />
          <Image
            src={imageUrl2}
            width={200}
            height={200}
            alt={product?.attributes?.name}
            style={{ ...imageStyle, opacity: isHovered ? 1 : 0 }}
            className="h-[200px] w-[200px] object-contain"
          />
        </Link>
        <div className="mt-4 px-5 pb-5 flex flex-col justify-between min-h-[160px]">
          <div className="min-h-[100px]">
            <a href={`/products/${productID}`}>
              <span className="block opacity-75 -mb-1 mt-2 text-md font-medium text-orange-500">
                {product?.attributes?.brand?.data?.attributes?.name}
              </span>
              <h5 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                {product?.attributes?.name}
              </h5>
            </a>
          </div>
          <div>
            <div className="mt-3 mb-5 flex items-center justify-between">
              <p>
                <span className="text-xl text-slate-900">
                  {priceFormatted} VND
                </span>
              </p>
            </div>
            <div className="flex justify-center">
              {!user ? (
                <button
                  onClick={() => setShowLoginAlert(true)}
                  className="flex items-center justify-center w-full max-w-xs rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </button>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(productID);
                  }}
                  className="flex items-center justify-center w-full max-w-xs rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </Button>
              )}
            </div>
          </div>
          {showAlert && (
            <div
              className="fixed bottom-[1%] right-[1%] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Info alert!</span> {alertMessage}
              </div>
            </div>
          )}
        </div>
      </div>
      {showLoginAlert && (
        <div id="YOUR_ID" className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-orange-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Warning!
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You need to sign in to continue your shopping!
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Link href={"/sign-in"}>
                  <button
                    type="button"
                    data-behavior="commit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Sign In
                  </button>
                </Link>
                <button
                  onClick={closeModal}
                  type="button"
                  data-behavior="cancel"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
