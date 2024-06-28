import React from "react";
import ProductItem from "./ProductItem";
function AllProductList({ productList }) {
  return (
    <div className="mt-2">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid:grid-cols-4 gap-5 mt-6">
        {productList.map((product, index) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default AllProductList;