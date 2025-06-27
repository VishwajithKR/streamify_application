import React, { use, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import Notification from "./pages/Notification";
import OnBoardingPage from "./pages/OnBoardingPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const App = () => {
// const [data,setData] = useState([]);
// const [error,setError] = useState(null);
// const [isLoading,setIsLoading] = useState(false);

// const getData = async ()=>{
//   setIsLoading(true);
//   try {
//     const data  = await fetch ("https://jsonplaceholder.typicode.com/todos");
//     const json = await data.json();
//     setData(json);
//   } catch (error) {
//     setError(error);
//   } finally {
//     setIsLoading(false);
//   }
// }
// useEffect(() => {
//   getData();
// },[])

const {data,error,isLoading} = useQuery({
  queryKey:["todos"],
  queryFn: async ()=>{
    const data  = await fetch ("https://jsonplaceholder.typicode.com/todos");
    const json = await data.json();
    return json;
  }
})
console.log(data)
  return (
    <div className=" h-screen w-screen" data-theme="light">
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/notification" element={<Notification />}/>
        <Route path="/call" element={<CallPage />}/>
        <Route path="/chat" element={<ChatPage />}/>
        <Route path="/onboarding" element={<OnBoardingPage />}/>
      </Routes>
    </div>
  );
};

export default App;
