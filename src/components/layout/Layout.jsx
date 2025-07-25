import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSwaps } from "../../features/swaps/swapsSlice";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const swaps = useSelector((state) => state.swaps.swaps);

  useEffect(() => {
    if (swaps.length === 0) dispatch(fetchSwaps()); // Fetch swaps once when layout loads
  }, [dispatch, swaps.length]);

  return (
    <div className="app-container">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
