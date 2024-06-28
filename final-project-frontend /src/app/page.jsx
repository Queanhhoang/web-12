"use client";
import Image from "next/image";
import GlobalApi from "./_utils/GlobalApi";
import Slider from "@/components/slider-component";
import Header from "@/components/header";
import { callAPI } from "@/utils/api-caller";
import Footer from "@/components/footer";
import CategoryList from "@/components/categorylist";
import ProductList from "@/components/ProductList";
import { isLogined, getUser } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(()=>{
  
    console.log(getUser())
    if (getUser()?.role?.name === "Shop-Manager")
    {
        router.replace("/shop-manager")
    }
}, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const sliderData = await GlobalApi.getSliders();
        const categoryData = await GlobalApi.getCategoryList();
        const productData = await GlobalApi.getProductList();

        setSliderList(sliderData);
        setCategoryList(categoryData);
        setProductList(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />

      {/*Slider*/}
      <div className="p-10 px-16">
        <Slider sliderList={sliderList} />
        <div
          className="mt-5"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            className="text-black-600 font-bold text 2xl"
            style={{ fontSize: "30px" }}
          >
            Shopping by Category
          </h2>
          <hr
            style={{
              width: "3cm",
              height: "3px",
              backgroundColor: "black",
              border: "none",
              margin: "10px",
            }}
          />
        </div>
        <CategoryList categoryList={categoryList} />
        <ProductList productList={productList} />
      </div>

      {/*Footer*/}
      <Footer />
    </div>
  );
};

export default Home;