"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import moment from "moment";
import { callAPI } from "@/utils/api-caller";
import { getUser, isLogined, setToken, setUser } from "@/utils/helper";
import { Button } from "@/components/ui/button";

const ShopManager = () => {
  const [revenue, setRevenue] = useState(0);
  const [user, setUserState] = useState(getUser());
  const [data, setData] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    if (!isLogined()){
        router.replace("/sign-in")
    }
    if (getUser().role.name !== "Shop-Manager")
    {
        router.replace("/")
    }
    getRevenue();
    fetchData();
}, [])


  const getRevenue = async () => {
    try {
      const res = await callAPI("/get-revenue", "GET");
      setRevenue(res.data.revenue);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await callAPI("/orders", "GET");
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setUserState(null);
    router.replace("/");
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.attributes.status); // Initialize the status
  };

  const handleChangeStatus = async () => {
    if (!selectedOrder) return;

    try {
      const res = await callAPI(`/orders/${selectedOrder.id}`, "PUT", {
        data: {
          status: newStatus,
        },
      });
      setSelectedOrder(null);
      fetchData(); 
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const handleDeleteOrder = async (order) => {
    try {
      await callAPI(`/orders/${order.id}`, "DELETE");
      setData((prevData) => prevData.filter((item) => item.id !== order.id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 px-1 lg:px-6 pb-2 dark:bg-gray-800 shadow-md">
        <div className="flex items-center justify-between mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <Image src="/logo.png" alt="logo" width={130} height={80} />
          </a>
          <Button onClick={logout} className="font-semibold">
            Sign Out
          </Button>
        </div>
      </nav>
      <h2 className="flex items-center justify-center mb-5 p-4 font-extrabold text-2xl bg-orange-600 text-white">
          Shop Management
      </h2>
      <div className="p-4">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 max-w-md">
          <p className="text-sm font-regular">Total Revenue</p>
          <h2 className="font-sans font-bold text-4xl mt-2">
            {revenue.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h2>
        </div>
        <div className="relative overflow-x-auto mt-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-8 py-3">
                  Customer
                </th>
                <th scope="col" className="px-8 py-3">
                  Total
                </th>
                <th scope="col" className="px-8 py-3">
                  Created Date
                </th>
                <th scope="col" className="px-8 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-8 py-4">{order.attributes.name}</td>
                  <td className="px-4 py-4">
                    {formatPrice(order.attributes.totalPrice)}
                  </td>
                  <td className="px-9 py-4">
                    {moment(order.attributes.createdAt).format("DD/MM/yyyy")}
                  </td>
                  <td className="px-6 py-4">{order.attributes.status}</td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => handleEditOrder(order)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    >
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => handleDeleteOrder(order)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Change Order Status</h2>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                New Status
              </label>
              <select
                id="status"
                name="status"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setNewStatus(e.target.value)}
                value={newStatus}
              >
                <option value="PENDING">PENDING</option>
                <option value="SHIPPING">SHIPPING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleChangeStatus}
              >
                Save
              </button>
              <button
                type="button"
                className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => setSelectedOrder(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopManager;
