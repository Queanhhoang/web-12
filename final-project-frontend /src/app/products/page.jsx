"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/header";
import GlobalApi from "@/app/_utils/GlobalApi";
import AllProductList from "@/components/AllProductList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, meta } = await GlobalApi.getAllProductList(page);
      setProductList(data);
      setTotalPages(meta.pageCount);
    };
    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
    return(
        <div>
        <h2 className="flex items-center justify-center p-4 font-extrabold text-4xl bg-orange-600 text-white">
          Product List
        </h2>
        <AllProductList productList={productList} />
        <div className="flex items-center justify-center mt-4 mb-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
                />
              </PaginationItem >
              <PaginationItem className="flex items-center">
                <PaginationLink href="#" onClick={() => handlePageChange(1)}  className="text-sm font-semibold">
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="text-sm font-semibold">/ {totalPages}
              </PaginationItem>
              <PaginationItem className="ml-2">
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    )
}

export default ProductPage;