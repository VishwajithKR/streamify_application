import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import Notification from "./pages/Notification";
import OnBoardingPage from "./pages/OnBoardingPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

const ProtectedRoute = ({ element, authUser }) => {
  return authUser ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element, authUser }) => {
  return !authUser ? element : <Navigate to="/" />;
};

const App = () => {
  const { data: authData, error, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("auth/me");
      return res.data;
    },
    retry: false,
  });

  const authUser = authData?.user;

  return (
    <div className="h-screen w-screen" data-theme="light">
      <Routes>
        <Route path="/" element={<ProtectedRoute authUser={authUser} element={<HomePage />} />} />
        <Route path="/signup" element={<PublicRoute authUser={authUser} element={<SignUpPage />} />} />
        <Route path="/login" element={<PublicRoute authUser={authUser} element={<LoginPage />} />} />
        <Route path="/notification" element={<ProtectedRoute authUser={authUser} element={<Notification />} />} />
        <Route path="/call" element={<ProtectedRoute authUser={authUser} element={<CallPage />} />} />
        <Route path="/chat" element={<ProtectedRoute authUser={authUser} element={<ChatPage />} />} />
        <Route path="/onboarding" element={<ProtectedRoute authUser={authUser} element={<OnBoardingPage />} />} />
      </Routes>
    </div>
  );
};

export default App;
