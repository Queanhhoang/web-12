"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem";
import { callAPI } from "@/utils/api-caller";
import { useParams, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


const ProductByCategory = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true); 
    try {
      const categoryId = params.id;
      const res = await callAPI(`/products?populate=*&filters[category][id][$eq]=${categoryId}&pagination[page]=${page}&pagination[pageSize]=16`, "GET");
      setProducts(res.data.data);
      const res2 = await callAPI(`/categories/${categoryId}`, "GET");
      setCategory(res2.data.data);
      setTotalPages(res.data.meta.pagination.pageCount);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
        <h1 className="flex items-center justify-center p-4 font-extrabold text-4xl bg-orange-600 text-white">
          {category !== null && category.attributes.name}
        </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      {loading ? (
        <div className="flex items-center justify-center mt-10 mb-20 text-orange-600 font-bold text-2xl">
          Loading...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid:grid-cols-4 gap-5 mt-6">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
            {products.length === 0 && (
              <div className="flex items-center justify-center mt-10 mb-20 text-orange-600 font-bold text-4xl">
                Category is not available!
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mt-4 mb-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(page > 1 ? page - 1 : 1); }}
                  />
                </PaginationItem>
                <PaginationItem className="flex items-center">
                  <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(1); }} className="text-sm font-semibold">
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="text-sm font-semibold">/ {totalPages}</PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(page + 1); }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductByCategory;
