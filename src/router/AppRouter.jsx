import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/explore/Explore";
import MySwaps from "../pages/my-swaps/MySwaps";
import Profile from "../pages/profile/Profile";
import NotFound from "../pages/NotFound";
import Layout from "../components/layout/Layout";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import NewSwap from "../pages/NewSwap";
import SwapDetails from "../components/SwapDetails";
import FavoriteSwaps from "../pages/favorite-swaps/FavoriteSwaps";
import SignUp from "../pages/SignUp";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/swaps"
            element={
              <PrivateRoute>
                <MySwaps />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-swap"
            element={
              <PrivateRoute>
                <NewSwap />
              </PrivateRoute>
            }
          />
          <Route path="/swaps/:id" element={<SwapDetails />} />
          <Route path="/favorites" element={<FavoriteSwaps />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
