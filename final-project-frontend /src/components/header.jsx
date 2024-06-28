"use client";

import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { callAPI } from "@/utils/api-caller";
import Link from "next/link";
import { getUser, isLogined, setToken, setUser } from "@/utils/helper";
import { useRouter, useParams } from "next/navigation";
import { useAppContext } from "./context";
  

const Header = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [user, setUserState] = useState(getUser());
    const [input, setInput] = useState('');
    const [result, setResult] = useState([]);
    const router = useRouter();
    const params = useParams();


    useEffect(()=>{
        fetchData()
        if (isLogined())
            fetchShoppingCart();
      }, [])

    const fetchData = async()=>{
        try {
          const res =  await callAPI("/categories", "GET")
          setCategoryList(res.data.data);
          //console.log(res.data.data)
        } catch (error) {
          console.log(error)
        }
        
      }
      
    
      useEffect(() => {
        if (params.name) {
            setInput(params.name);
            SearchProductByName(params.name);
        }
    }, [params.name]);


    const SearchProductByName = async (name) => {
        try {
            const res = await callAPI("/products?filters[name][$contains]=" + name, "GET");
            //console.log(res.data);
            setResult(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        if (value) {
            SearchProductByName(value);
        } else {
            setResult([]);
        }
    }

    const {setShoppingCart, isFetchedShoppingCart, setIsFetchedShoppingCart} = useAppContext()
      const fetchShoppingCart = async()=>{
        if (!isFetchedShoppingCart){
            try {
                const res  = await callAPI("/my-shopping-cart", "GET")
                console.log(res)
                setShoppingCart(res.data)
                setIsFetchedShoppingCart(true)
            } catch (error) {
                console.log(error)
            }
        }
          
      }
    
    const logout = () => {
        setToken("")
        setUser(null)
        setUserState(null)
        router.replace("/")
    }
    const {shoppingCart} = useAppContext()

    return(
        <nav className="bg-white border-gray-200 px-1 lg:px-6 pb-2 dark:bg-gray-800 shadow-md">
            <div className="flex flex-wrap gap-10 items-center mx-auto max-w-screen-xl">
                <div className="flex items-center">
                    <a href="/" className="grid justify-items-center">
                        <Image src="/logo.png" alt ="logo" width={130} height={80}/>
                    </a>
                </div>
                <div>
                    <Link href="/">
                        <h2 className="flex gap-1 items-center text-bold font-semibold p-2 px-4 cursor-pointer hover:text-orange-400 ">
                        Home
                        </h2>
                    </Link>
                </div>
                <div >
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <h2 className="flex gap-1 items-center text-bold font-semibold cursor-pointer hover:text-orange-400">
                            Category{" "}
                            </h2>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                categoryList.map((category,index) =>{
                                    return(
                                        <DropdownMenuItem key={index}>
                                            <Link key={index} href={"/category/" + category.id } >{category.attributes.name}</Link>
                                        </DropdownMenuItem>
                                    )
                                    
                                })
                            }

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <Link href="/products">
                        <h2 className="flex gap-1 items-center text-bold font-semibold p-2 px-4 cursor-pointer hover:text-orange-400">
                        Product
                        </h2>
                    </Link>
                </div>
                
                <div className="flex flex-1 justify-center">
                    <div className="relative" style={{ width: '70%' }}>
                        <div className="flex gap-3 items-center border-2 rounded-full p-2 px-5 focus-within:border-orange-500" style={{ marginLeft: '-5rem', width: '100%' }}>
                            <Search />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="outline-none"
                                value={input}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                        </div>

                        {result.length > 0 ? (
                            <div className="absolute right-20 mt-2 w-full bg-white shadow-lg rounded-lg z-10 max-h-80 overflow-y-auto">
                                <ul>
                                    {result.map((product) => (
                                            <li key={product} className="p-2 border-b hover:bg-gray-100">
                                                <Link href={"/products/" + product.id }>{product.attributes.name}</Link>
                                            </li>
                                        
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            input && (
                                <div className="absolute right-20 mt-2 w-full bg-white shadow-lg rounded-lg z-10 p-2">
                                    <p>Products are not found</p>
                                </div>
                            )
                        )}


                        
                    </div>

                </div>
                <div className="flex justify-items-center gap-6">
                    {user &&
                    <Link href={"/shopping-cart"}>
                        <div className="relative flex items-center justify-center" style={{ marginTop: '5px' }}>
                            <ShoppingBasket size={32} />
                            <span className="absolute bg-red-600 w-4 h-4 flex justify-center items-center rounded-full text-white text-xs" style={{ bottom: '-3px', right: '-2px' }}>{shoppingCart.length}</span>
                        </div>
                    </Link>
                    }
                    {
                        !user ? (  <Link href={"/sign-in"}>
                                    <Button className="font-semibold">Sign In</Button>
                                </Link>)
                            :
                            (<DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <CircleUserRound className="h-11 w-11 bg-orange-100 p-2 rounded-full text-primary cursor-pointer"/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="font-bold">
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={`/my-profile?id=${user.id}`}>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                </Link>
                                <Link href={'/my-orders'}>
                                    <DropdownMenuItem>My Orders</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={()=>(logout())}>Sign Out</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>)
 
                    }
            
                </div>
                
                
            </div>
        </nav>
    )
}

export default Header;