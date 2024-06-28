"use client";
import { callAPI } from "@/utils/api-caller";
import { postAPI } from "@/utils/api-post";
import { getUser, getToken } from "@/utils/helper";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";



const MyProfilePage = () => {
  const [user, setUserProfile] = useState(null);
 
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [initialUsername, setInitialUsername] = useState("");
  const [initialEmail, setInitialEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const token = getToken();
        if (token) {
            getUserInfo(token);
        }
      if (userId) {
          getUserInfo();
      }
  }, [userId]);


  const getUserInfo = async () => {
      try {
          const res = await callAPI(`/users/${userId}`, "GET");
          console.log(res.data)
          setUserProfile(res.data);
          setInitialUsername(res.data.username);
          setInitialEmail(res.data.email);
      } catch (error) {
          console.log(error);
      }
  };

  const handleUsernameChangeClick = () => {
    setInitialUsername(user.username);
    setShowUsernameForm(true);
};

  const handleEmailChangeClick = () => {
      setInitialEmail(user.email);
      setShowEmailForm(true);
  };

  const handleSaveUsername = async () => {
      try {
          await callAPI(`/users/${user.id}`, "PUT", { username: user.username });
          getUserInfo();
          setShowUsernameForm(false);
      } catch (error) {
          console.log(error);
      }
  };

  const handleSaveEmail = async () => {
      try {
          await callAPI(`/users/${user.id}`, "PUT", { email: user.email });
          getUserInfo();
          setShowEmailForm(false);
      } catch (error) {
          console.log(error);
      }
  };
 

  const changePasswordClick = async () => {
    console.log("current password: " + currentPassword)
    console.log("new password: " + newPassword)
    console.log("confirm password: " + confirmPassword)
    
    if (confirmPassword !== newPassword) {
      setErrorMessage("Confirm password does not match new password.");
      setTimeout(() => {
          setErrorMessage("");
      }, 10000); 
      return; 
  }

    try{
      const data = {
        currentPassword: currentPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      }
      const res = await postAPI('/auth/change-password', "POST", data)
      console.log(res.data)
      setSuccessMessage("Password changed successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 10000); 
    }catch(error) {
      console.log("Error:" + error)
    }
  }
   


  const handleCloseForm = () => {
      setShowUsernameForm(false);
      setShowEmailForm(false);
      setUserProfile({ ...user, username: initialUsername, email: initialEmail});
  };
  
  const handleDeleteAccount = async () => {
    try {
      await callAPI(`/users/${user.id}`, "DELETE");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
 

  

  return(
    user !== null?
    <div className = "py-8 mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <div className=" col-span-8 justify-center items-center overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-bold text-center">Account Settings</h1>
        </div>

        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">User Name</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-600">Your name is <strong>{user?.username}</strong></p>
                    <button onClick={handleUsernameChangeClick} className="inline-flex text-sm font-semibold text-orange-600 underline decoration-2">Change</button>
                </div> 

                {showUsernameForm && (
                  <div  className=" inset-0 flex overflow-y-auto overflow-x-hidden fixed top-0  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div className="relative p-4 w-full max-w-md max-h-full">
      
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              Update Username
                          </h3>
                          <button type="button" onClick={handleCloseForm} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                              </svg>
                              <span className="sr-only">Close modal</span>
                          </button>
                      </div>
                      <form className="p-4 md:p-5">
                          <div className="col-span-2 sm:col-span-1">
                              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New username</label>
                              <input value={user?.username} 
                                    type="text" 
                                    onChange={(e) => setUserProfile({ ...user, username: e.target.value })}
                                    placeholder="Enter new username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                          </div>
                          <button onClick={handleSaveUsername} type="button" 
                                className="text-white inline-flex items-center my-4 bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Save
                          </button>
                      </form>
                     </div>
                  </div>
                </div>
                    
                        
                
                )}

        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-600">Your email address is <strong>{user?.email}</strong></p>
                    <button onClick={handleEmailChangeClick} className="inline-flex text-sm font-semibold text-orange-600 underline decoration-2">Change</button>
        </div> 
                {showEmailForm && (
                    <div  className=" inset-0 flex overflow-y-auto overflow-x-hidden fixed top-0  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
        
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Update Email Address
                            </h3>
                            <button type="button" onClick={handleCloseForm} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5">
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New email</label>
                                <input value={user?.email} 
                                       onChange={(e) => setUserProfile({ ...user, email: e.target.value })} 
                                       type="email" 
                                       placeholder="Enter new email address"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                            </div>
                            <button onClick={handleSaveEmail} type="button" 
                                  className="text-white inline-flex items-center my-4 bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Save
                            </button>
                        </form>
                          
                       </div>
                    </div>
                  </div>
                )}


        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Password</p>
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <label htmlFor="login-current-password">
              <span className="text-sm text-gray-500">Current Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-orange-600">
                <input type="password" id="current-password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
                      placeholder="***********" />
              </div>
            </label>
            <label htmlFor="login-new-password">
              <span className="text-sm text-gray-500">New Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-orange-600">
                <input type="password" id="new-password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
            <label htmlFor="login-confirm-password">
              <span className="text-sm text-gray-500">Confirm Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-orange-600">
                <input type="password" id="confirm-password" 
                      value ={confirmPassword}
                      onChange={(e) =>setConfirmPassword(e.target.value)}
                      className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
              </div>
            </label>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </div>
        {successMessage && (
          <div className="text-green-600">{successMessage}</div>
        )}
        {errorMessage && (
           <div className="text-red-600">{errorMessage}</div>
        )}
        {/*<p className="mt-2">Can't remember your current password. <a className="text-sm font-semibold text-orange-600 underline decoration-2" href="#">Recover Account</a></p>*/}
        <button onClick={changePasswordClick}
        className="mt-4 rounded-lg bg-orange-600 hover:bg-orange-800 px-4 py-2 text-white">Save Password</button>
        
        
        <hr className="mt-4 mb-8" />
        <div className="mb-10">
          <p className="py-2 text-xl font-semibold">Delete Account</p>
          <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Proceed with caution
          </p>
          <p className="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
          <button onClick={() => setShowDeleteConfirm(true)} className="ml-auto text-sm font-semibold text-rose-600  underline decoration-2">Continue with deletion</button>
        </div>
        {showDeleteConfirm && (
            <div className="inset-0 flex overflow-y-auto overflow-x-hidden fixed top-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Confirm Account Deletion
                    </h3>
                    <button type="button" onClick={() => setShowDeleteConfirm(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5">
                    <p className="text-gray-600">Are you sure you want to delete your account? This action cannot be undone.</p>
                    <div className="flex justify-end mt-4">
                      <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600">
                        Cancel
                      </button>
                      <button onClick={handleDeleteAccount} className="ml-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
     :
     <div>Loading...</div>
  )
}

export default MyProfilePage;