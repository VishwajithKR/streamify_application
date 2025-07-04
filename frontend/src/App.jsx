import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import Notification from "./pages/Notification";
import OnBoardingPage from "./pages/OnBoardingPage";

import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useUserAuth";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, isLoading } = useAuthUser();
  const {theme } = useThemeStore();
  const isAuthenticated = Boolean(authUser);
  const isOnBoarded = authUser?.isOnboarded;
  if (isLoading) {
    return <PageLoader />;
  }
{/* <OnBoardingPage /> */}
  return (
    <div className="h-screen w-screen" data-theme={theme}>
      <Routes>
         <Route path="/" element={(isAuthenticated && isOnBoarded) ? <Layout showSidebar={true}><HomePage /></Layout> : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />} />
         <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={!isOnBoarded ? "/onboarding" : "/"} />} />
         <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={!isOnBoarded ? "/onboarding" : "/"} />} />
         <Route path="/notifications" element={isAuthenticated && isOnBoarded ? ( <Layout showSidebar={true}><Notification /></Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)}/>
         <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
         <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
         <Route path="/onboarding" element={isAuthenticated ?  (!isOnBoarded ? <OnBoardingPage /> : <Navigate to="/" />) : <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
