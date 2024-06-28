// "use client";
// import { callAPI } from "@/utils/api-caller";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import * as React from "react"
// import { useAppContext } from "@/components/context"
// import Link from "next/link";

// const ViewProductDetail = () => {
//     const params = useParams();
//     const [product, setProduct] = useState(null);
//     const [mainImageUrl, setMainImageUrl] = useState('');
//     const [quantity, setQuantity] = useState(1);
//     const { setShoppingCart } = useAppContext();
//     const [showAlert, setShowAlert] = useState(false);

//     useEffect(() => {
//         getDetailProduct();
//     }, []);

//     const getDetailProduct = async () => {
//         try {
//             const res = await callAPI("/products/" + params.id + "?populate=*", "GET");
//             setProduct(res.data.data);
//             if (res.data.data.attributes.image.data.length > 0) {
//                 setMainImageUrl(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${res.data.data.attributes.image.data[0]?.attributes.url}`);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleThumbnailClick = (imageUrl) => {
//         setMainImageUrl(imageUrl);
//     };

//     const formatPrice = (price) => {
//         if (price === undefined || price === null) return '';
//         return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//     };
//     const priceFormatted = formatPrice(product?.attributes?.price);

//     const increaseQuantity = () => {
//         setQuantity(quantity + 1);
//     };

//     const decreaseQuantity = () => {
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     };

//     const addToCart = async () => {
//         try {
//             const res = await callAPI("/add-to-shopping-cart", "POST", { productId: params.id, amount: quantity });
//             setShoppingCart(res.data);
//             setShowAlert(true);
//             setTimeout(() => {
//                 setShowAlert(false);
//             }, 2000);
//         } catch (error) {
//             console.error("Error adding to cart:", error);
//         }
//     };

//     return (
//         product !== null ?
//             <div>
//                 <div className="font-sans bg-white mt-8 mb-6">
//                     <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
//                         <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(255,140,78,0.4)] p-6 rounded-lg">
//                             <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">

//                                 <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(255,140,78,0.4)] relative">
//                                     <img src={mainImageUrl} width={800} height={600} alt="Product" className="rounded object-cover mx-auto" />
//                                 </div>

//                                 <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
//                                     {product?.attributes?.image?.data.map((image, index) => (
//                                         <div key={index} className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(255,140,78,0.4)] cursor-pointer" onClick={() => handleThumbnailClick(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${image.attributes.url}`)}>
//                                             <img src={`${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${image.attributes.url}`} alt={`Product${index + 1}`} className="w-full" />
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="lg:col-span-2">
//                                 <h2 className="text-2xl font-extrabold text-gray-800"> {product?.attributes?.name}| {product?.attributes?.category?.data?.attributes?.name}</h2>
//                                 <div className="flex space-x-2 mt-4 font-medium text-orange-500">
//                                     {product?.attributes?.brand?.data?.attributes?.name}
//                                 </div>
//                                 <div className={`flex space-x-2 mt-4 font-semibold ${product?.attributes?.instock === 0 ? 'text-red-500 mb-2 font-bold text-2xl' : ''}`}>
//                                     {product?.attributes?.instock === 0 ? 'Out of stock' : `In stock: ${product?.attributes?.instock}`}
//                                 </div>
//                                 <p className="leading-relaxed font-semibold">Size: {product?.attributes?.size}</p>
//                                 <p className="leading-relaxed font-semibold">Material: {product?.attributes?.material}</p>
//                                 <p className="leading-relaxed font-semibold">Age: {product?.attributes?.age}</p>
//                                 <hr className="border-gray-300 my-4 mt-5" />

//                                 <div className="flex flex-wrap gap-4 mt-8">
//                                     <p className="text-gray-800 text-3xl font-bold">{priceFormatted} VND</p>
//                                 </div>

//                                 <h2 className="mt-4 mb-2 font-medium text-xl">Quantity</h2>
//                                 <div className="flex flex-col items-baseline space-x-1 mt-1">
//                                     <div className="flex items-center justify-center px-5">
//                                         <button onClick={decreaseQuantity}
//                                             className="flex justify-center items-center w-8 h-8 rounded-md text-white focus:outline-none bg-orange-500 hover:bg-orange-600">
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
//                                             </svg>
//                                         </button>
//                                         <span className="text-xl font-semibold mx-4">{quantity}</span>
//                                         <button onClick={increaseQuantity}
//                                             className="flex justify-center items-center w-8 h-8 rounded-md text-white focus:outline-none bg-orange-500 hover:bg-orange-600">
//                                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
//                                                 xmlns="http://www.w3.org/2000/svg">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12"></path>
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <hr className="border-gray-300 my-4 mt-5" />
//                                 <div className="flex flex-wrap gap-4 mt-8">
//                                 <Link href={'/check-out'}>
//                                     <button onClick={addToCart} type="button" className="min-w-[200px] px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded">Buy now</button>
//                                 </Link>
//                                     <button onClick={addToCart} type="button" className="min-w-[200px] px-4 py-2.5 border border-orange-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Add to cart</button>
//                                 </div>
//                                 {showAlert && (
//                                     <div className="mt-4 text-green-500">
//                                         Added to cart successfully!
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {product?.attributes?.description && (
//                             <div className="mt-7 shadow-[0_2px_10px_-3px_rgba(255,140,78,0.4)] p-4">
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-5">Product Description</h3>
//                                 <div className="text-justify">
//                                     {product.attributes.description.split('\n\n').map((paragraph, index) => (
//                                         <p className="mb-4" key={index}>{paragraph}</p>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             : <div>Loading...</div>
//     );
// }

// export default ViewProductDetail;

"use client";
import { callAPI } from "@/utils/api-caller";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react";
import { useAppContext } from "@/components/context";
import Link from "next/link";
import { getUser } from "@/utils/helper";
import { Button } from "@/components/ui/button";

const ViewProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { setShoppingCart } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUserState] = useState(getUser());
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    getDetailProduct();
  }, []);

  const getDetailProduct = async () => {
    try {
      const res = await callAPI(
        "/products/" + params.id + "?populate=*",
        "GET"
      );
      setProduct(res.data.data);
      if (res.data.data.attributes.image.data.length > 0) {
        setMainImageUrl(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${res.data.data.attributes.image.data[0]?.attributes.url}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainImageUrl(imageUrl);
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const priceFormatted = formatPrice(product?.attributes?.price);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      const res = await callAPI("/add-to-shopping-cart", "POST", {
        productId: params.id,
        amount: quantity,
      });
      setShoppingCart(res.data);
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

  return product !== null ? (
    <div>
      <div className="font-sans bg-white mt-8 mb-6">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(255,140,78,0.4)] p-6 rounded-lg">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
              <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(255,140,78,0.4)] relative">
                <img
                  src={mainImageUrl}
                  width={800}
                  height={600}
                  alt="Product"
                  className="rounded object-cover mx-auto"
                />
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                {product?.attributes?.image?.data.map((image, index) => (
                  <div
                    key={index}
                    className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(255,140,78,0.4)] cursor-pointer"
                    onClick={() =>
                      handleThumbnailClick(
                        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${image.attributes.url}`
                      )
                    }
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${image.attributes.url}`}
                      alt={`Product${index + 1}`}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-gray-800">
                {" "}
                {product?.attributes?.name}|{" "}
                {product?.attributes?.category?.data?.attributes?.name}
              </h2>
              <div className="flex space-x-2 mt-4 font-medium text-orange-500">
                {product?.attributes?.brand?.data?.attributes?.name}
              </div>
              <div
                className={`flex space-x-2 mt-4 font-semibold ${
                  product?.attributes?.instock === 0
                    ? "text-red-500 mb-2 font-bold text-2xl"
                    : ""
                }`}
              >
                {product?.attributes?.instock === 0
                  ? "Out of stock"
                  : `In stock: ${product?.attributes?.instock}`}
              </div>
              <p className="leading-relaxed font-semibold">
                Size: {product?.attributes?.size}
              </p>
              <p className="leading-relaxed font-semibold">
                Material: {product?.attributes?.material}
              </p>
              <p className="leading-relaxed font-semibold">
                Age: {product?.attributes?.age}
              </p>
              <hr className="border-gray-300 my-4 mt-5" />

              <div className="flex flex-wrap gap-4 mt-8">
                <p className="text-gray-800 text-3xl font-bold">
                  {priceFormatted} VND
                </p>
              </div>

              <h2 className="mt-4 mb-2 font-medium text-xl">Quantity</h2>
              <div className="flex flex-col items-baseline space-x-1 mt-1">
                <div className="flex items-center justify-center px-5">
                  <button
                    onClick={decreaseQuantity}
                    className="flex justify-center items-center w-8 h-8 rounded-md text-white focus:outline-none bg-orange-500 hover:bg-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      ></path>
                    </svg>
                  </button>
                  <span className="text-xl font-semibold mx-4">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="flex justify-center items-center w-8 h-8 rounded-md text-white focus:outline-none bg-orange-500 hover:bg-orange-600"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v12M6 12h12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <hr className="border-gray-300 my-4 mt-5" />
              <div className="flex flex-wrap gap-4 mt-8">
                {!user ? (
                  <button
                    onClick={() => setShowLoginAlert(true)}
                    type="button"
                    className="min-w-[200px] px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded"
                  >
                    Buy now
                  </button>
                ) : (
                  <Link href={"/check-out"}>
                    <button
                      onClick={addToCart}
                      type="button"
                      className="min-w-[200px] px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded"
                    >
                      Buy now
                    </button>
                  </Link>
                )}
                {!user ? (
                  <button
                    onClick={() => setShowLoginAlert(true)}
                    type="button"
                    className="min-w-[200px] px-4 py-2.5 border border-orange-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    onClick={addToCart}
                    type="button"
                    className="min-w-[200px] px-4 py-2.5 border border-orange-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                  >
                    Add to cart
                  </button>
                )}
              </div>
              {showAlert && (
                <div class="bg-green-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center max-w-lg">
                  <svg
                    viewBox="0 0 24 24"
                    class="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                  </svg>
                  <span class="text-green-800">
                    Added to cart successfully!
                  </span>
                </div>
              )}
              {showLoginAlert && (
                <div
                  id="YOUR_ID"
                  className="fixed z-50 inset-0 overflow-y-auto"
                >
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
          </div>

          {product?.attributes?.description && (
            <div className="mt-7 shadow-[0_2px_10px_-3px_rgba(255,140,78,0.4)] p-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-5">
                Product Description
              </h3>
              <div className="text-justify">
                {product.attributes.description
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p className="mb-4" key={index}>
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ViewProductDetail;
