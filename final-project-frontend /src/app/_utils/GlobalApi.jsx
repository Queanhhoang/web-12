
const {default: axios} = require("axios")

const axiosClient = axios.create({
    baseURL: "http://localhost:1337/api",
})
const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE;

const getCategory=() =>axiosClient.get('/categories?populate=*');

const getSliders =() => axiosClient.get('/sliders?populate=*').then(resp =>{
    return resp.data.data
})
const getCategoryList = () => axiosClient.get("/categories?populate=*").then((resp) => resp.data.data);

const getProductList = () => axiosClient.get("/products?populate=*").then((resp) => resp.data.data);

const getAllProductList = async (page) => {
    const paginationParams = `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const response = await axiosClient.get(`/products?populate=*&${paginationParams}`);
    return {
      data: response.data.data,
      meta: response.data.meta.pagination,
    };
  };
  

export default{
    getCategory,
    getSliders,
    getCategoryList,
    getProductList,
    getAllProductList,
}