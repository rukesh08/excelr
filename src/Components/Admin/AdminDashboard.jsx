import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { api } from "../Config/Api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../Navbar/Navbar";
import { fetchRestaurantsBasedOnRole } from "../State/Restaurant/Action";

const AdminDashboard = () => {

  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [pendingRestaurants, setPendingRestaurants] = useState([]);
  const [role, setRole] = useState(null);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const jwt = localStorage.getItem("jwt");




const fetchData = async () => {
    try {
      const res = await api.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const dashboardData = res.data;
      setData(dashboardData);
      setRole(dashboardData.userRole);
      setMonthlyOrders(
      (dashboardData.monthlyOrders || []).map((item) => ({
        month: item.month,
        orders: item.orders
      }))
    );

      if (dashboardData.userRole === "ROLE_ADMIN") {
        setPendingRestaurants(dashboardData.pendingRestaurantList || []);
      }
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    }
  };

useEffect(() => {
  fetchData();
}, [jwt]);

   


  
  useEffect(() => {
    if (role && jwt) {
      console.log(" Fetching restaurants with role:", role);
      dispatch(fetchRestaurantsBasedOnRole(jwt, role));
    }
  }, [dispatch, jwt, role]);

const handleApprove = async (restaurantId) => {
  try {
    await api.put(
      `/api/admin/approve-restaurant/${restaurantId}`,
      {},
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    await fetchData();
  } catch (err) {
    console.error("Approval failed:", err);
  }
};

const handleReject = async (restaurantId) => {
  try {
    await api.delete(`/api/admin/reject-restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    await fetchData(); 
  } catch (err) {
    console.error("Rejection failed:", err);
  }
};




  if (!data) return <p className="text-center mt-10">Loading...</p>;

  const cards = [
    { label: "Total Users", value: data.totalUsers },
    { label: "Total Restaurants", value: data.totalRestaurants },
    { label: "Approved", value: data.approvedRestaurants },
    { label: "Pending", value: data.pendingRestaurants },
    { label: "Orders", value: data.totalOrders },
    { label: "Payments", value: `₹${data.totalPayments.toFixed(2)}` },
  ];

  console.log("Role:", role);
  console.log("Pending Restaurants:", pendingRestaurants);
  console.log("monthly orders",monthlyOrders);
  console.log("total orders",data.totalOrders);
  

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl  text-orange-500 font-semibold mb-6">Admin Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-sky-300 shadow-md rounded-2xl p-4 text-center"
            >
              <p className="text-gray-600">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="mt-10">
          <h3 className="text-xl  text-orange-500 font-semibold mb-2">
            Monthly Orders (Placeholder)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyOrders}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>

          </ResponsiveContainer>
        </div>

        {/* Pending Restaurants Table */}
        {role === "ROLE_ADMIN" && pendingRestaurants.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl text-orange-500 font-bold mb-6 border-b-2 border-orange-300 pb-2">
              Pending Restaurants
            </h3>

            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="min-w-full divide-y divide-gray-700 bg-stone-900 text-white">
                <thead className="bg-sky-600 text-white">
                  <tr>
                    <th className="py-3 px-5 text-left text-sm font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-5 text-left text-sm font-semibold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-3 px-5 text-left text-sm font-semibold uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="py-3 px-5 text-center text-sm font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {pendingRestaurants.map((restaurant) => (
                    <tr
                      key={restaurant.id}
                      className="hover:bg-stone-800 transition duration-200"
                    >
                      <td className="py-3 px-5">{restaurant.name}</td>
                      <td className="py-3 px-5">{restaurant.email}</td>
                      <td className="py-3 px-5">{restaurant.owner}</td>
                      <td className="py-3 px-5 text-center space-x-3">
                        <button
                          onClick={() => handleApprove(restaurant.id)}
                          className="bg-green-500 hover:bg-green-600 transition duration-200 text-white px-4 py-2 rounded-full shadow-md"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(restaurant.id)}
                          className="bg-red-500 hover:bg-red-600 transition duration-200 text-white px-4 py-2 rounded-full shadow-md"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
