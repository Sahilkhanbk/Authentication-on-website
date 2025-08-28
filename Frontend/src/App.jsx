import Dashboard from "./pages/Dashboard/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPassword from './pages/auth/forgotPassword/ForgotPassword.jsx'
import Support from "./pages/Support/Support";
import TransactionPage from "./pages/Transaction/Transaction";
import SignUp from "./pages/auth/signup/SignUp";
import Signin from "./pages/auth/signin/Signin";
import RegisterEmailVerify from "./pages/auth/registerEmailVerify/RegisterEmailVerify.jsx";
import RegisterSuccess from "./pages/auth/registerSuccess/RegisterSuccess.jsx";
import ForgotPassSent from "./pages/auth/forgotPassSent/ForgotPassSent.jsx";
import ResetPassSent from "./pages/auth/resetPassSent/ResetPassSent.jsx";
import ResetPass from "./pages/auth/resetPass/ResetPass.jsx";
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import AlreadySignedRoute from "./components/Auth/AlreadySignroute.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    },
    {
      path: "/transactions",
      element: <ProtectedRoute><TransactionPage /></ProtectedRoute>,
    },
    {
      path: "/support",
      element: <ProtectedRoute><Support /></ProtectedRoute>,
    },
    {
      path: "/signup",
      element: <AlreadySignedRoute><SignUp /></AlreadySignedRoute>,
    },
    {
      path: "/signin",
      element: <AlreadySignedRoute><Signin /></AlreadySignedRoute>,
    },
    {
      path: "/forgotPassword",
      element: <AlreadySignedRoute><ForgotPassword /></AlreadySignedRoute>,
    },
    {
      path: "/register-email-verify/:email",
      element: <AlreadySignedRoute><RegisterEmailVerify /></AlreadySignedRoute>,
    },
    {
      path: "/email-verify/:token",
      element: <AlreadySignedRoute><RegisterSuccess /></AlreadySignedRoute>,
    },
    {
      path: "/forgotsuccess/:email",
      element: <AlreadySignedRoute><ForgotPassSent /></AlreadySignedRoute>,
    },
    {
      path: "/reset-success",
      element: <AlreadySignedRoute><ResetPassSent /></AlreadySignedRoute>,
    },
    {
      path: "/forgot-password-verify/:token",
      element: <AlreadySignedRoute><ResetPass /></AlreadySignedRoute>,
    },
  ]);
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
