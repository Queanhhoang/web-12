"use client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { callAPI } from "@/utils/api-caller";
import Link from "next/link";
import { isLogined, setToken, setUser } from '@/utils/helper';



const SignInPage  = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const router = useRouter()
    const onLoginClick = async() => {
        console.log("email vua nhap: " + email)
        console.log("password vua nhap: " + password)
        try {
            const data = {
                identifier: email,
                password
            } 
            const res = await callAPI("/auth/local?populate=*", "POST", data)
            //console.log(res.data)
            setToken(res.data.jwt)
            const userRes = await callAPI("/users/me", "GET")
            setUser(userRes.data)
            //console.log(res.data.jwt)
            router.replace("/")
        } catch (error) {
            setErrorText("Sai địa chỉ mail hoặc mật khẩu!")
            console.log(error)
        }
        
    }
    useEffect(() => {
        if (isLogined()){
            router.replace("/")
        }
    },[])

    return(
            <div className="min-h-screen bg-orange-100 text-gray-900 flex justify-center items-center">
                <div className="max-w-xl h-full m-0 sm:m-1 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-full p-3 sm:p-5">
                        <div>
                            <a href="/" className="grid justify-items-center">
                                <img src="/logo.png" className="w-40 mx-auto" />
                            </a>    
                        </div>
                        <div className="mt-6 flex flex-col items-center">
                            <h1 className="text-2xl lg:text-3xl font-extrabold">
                                Đăng Nhập
                            </h1>
                            <div className="w-full flex-1 mt-5">
                                <div className="mx-auto max-w-xs">
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-0.5">Email</label>
                                        <input
                                            type="email" placeholder="example@gmail.com" value={email} onChange={(e)=>{setEmail(e.target.value); setErrorText("")}} 
                                            required className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
                                    </div>  
                                    <div className="mb-6 mt-4">
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-0.5">Password</label>
                                        <input
                                        className="w-full px-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value);  setErrorText("")}} 
                                        required/>
                                    </div>  
                
                                    <span style={{color: "red"}}>{errorText}</span>
                                    <button onClick={()=>onLoginClick()}
                                        className="mt-5 tracking-wide font-bold bg-orange-400 text-white-500 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                                        <svg className="w-6 h-6 -ml-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                                                width="30" height="30" fill="none" viewBox="0 0 24 24" strokeWidth="2" >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                                        </svg>

                                        <span className="ml-2">
                                            Đăng nhập
                                        </span>
                                    </button>

                                </div>

                                <div className="my-8 border-b text-center">
                                  {/*  <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transhtmlForm translate-y-1/2">
                                        Hoặc đăng nhập với
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <div className="mt-5 grid grid-cols-2 gap-4 items-center">
                                        <div>
                                            <a href="#"
                                                className="w-full flex items-center justify-center px-8 py-3 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-orange-50 hover:border-orange-200">
                                                <img className="h-6 w-6" src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
                                                    alt=""/>
                                            </a>
                                        </div>
                                        <div>
                                            <button
                                        
                                                className="w-full flex items-center justify-center px-8 py-3 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-orange-50 hover:border-orange-200">
                                                <img className="h-6 w-6" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                                                    alt=""/>
                                            </button>
                                        </div>

                                    </div>*/}

                                    <div>
                                         <p className="mt-5 text-sm text-gray-600 text-center items-center justify-center">
                                                Nếu quý khách chưa có tài khoản? 
                                             <a href="/sign-up" className="text-orange-500 hover:text-orange-700">
                                             &nbsp; Đăng ký 
                                            </a>
                                        </p>
                                    </div>


                                    <div className="flex-1  mt-4 text-center hidden lg:flex items-center justify-center">
                                        
                                        <div className="mt-2 xl:m-3 w-full bg-contain bg-center bg-no-repeat">
                                            <p className="text-center text-xs text-gray-600 ">
                                            &nbsp;Tôi đồng ý các &nbsp;
                                                <a href="#" className="border-b border-gray-500 border-dotted">
                                                    điều khoản dịch vụ
                                                </a>
                                                &nbsp;và&nbsp;
                                                <a href="#" className="border-b border-gray-500 border-dotted">
                                                    chính sách bảo mật
                                                </a>
                                                &nbsp;của Otaku Otoke
                                            </p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

    )
}
   
export default SignInPage;