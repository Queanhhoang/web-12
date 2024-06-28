
import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ productList }) {
  return (
    <div className="mt-10">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          className="text-black-600 font-bold text 2xl mt-4"
          style={{ fontSize: "30px" }}
        >
          Our Signature Products
        </h2>
        <hr
          style={{
            width: "3cm",
            height: "3px",
            backgroundColor: "black",
            border: "none",
            margin:'10px'
          }}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid:grid-cols-4 gap-5 mt-6">
        {productList.map(
          (product, index) => index < 12 && <ProductItem product={product} />
        )}
      </div>
    </div>
  );
}
export default ProductList;
