import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSwaps } from "../../features/swaps/swapsSlice";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const swaps = useSelector((state) => state.swaps.swaps)

  useEffect(() => {
    if (swaps.length === 0)
    dispatch(fetchSwaps()); // Fetch swaps once when layout loads
  }, [dispatch, swaps.length]);

  return (
    <>
      <Navbar />
      <main className="container mt-4">
        {children}
      </main>
    </>
  )
};

export default Layout;