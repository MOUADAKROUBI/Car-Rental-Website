import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUpPage";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import BookHomes from "./pages/BookHomesPage";
import Rent from "./pages/RentPage";
import Profile from "./pages/ProfilePage";
import Dashboard from "./pages/DashboardPage";
import NotFound from "./pages/Page404";
import LoadingSpinner from "./components/ui/loading-spinner";
import useAuthentication from "./useAuthentication";
import { useEffect } from "react";
import { AuthContext } from "./Contexts/AuthContext";

function RedirectToHome() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return null;
}

function App() {
  const { isLoggedIn, isLoading } = useAuthentication();
  if (isLoading) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToHome />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="homes" element={<BookHomes />} />
        <Route path="homes/:id" element={<Rent />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// {isLoggedIn ? <Home /> : <Login />}
