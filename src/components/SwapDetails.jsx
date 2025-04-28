import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SwapDetails = () => {
  const { id } = useParams();
  const swaps = useSelector((state) => state.swaps.swaps);

  // Find the swap by ID
  const swap = swap.find((swap) => swap.id === id);

  if (!swap) {
    return <div className="container mt-5"><h2>Swap not found</h2></div>
  }

  return (
    <div className="container mt-5">
      <h2>{swap.title}</h2>
      {swap.imageUrl && <img src={swap.imageUrl} alt={swap.title} className="img-fluid mb-3" />}
      <p>{swap.description}</p>
      <span className="badge bg-secondary">{swap.category}</span>
    </div>
  );
};

export default SwapDetails;