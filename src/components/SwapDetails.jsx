import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SwapDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const swaps = useSelector((state) => state.swaps.swaps);

  // Find the swap by ID
  const swap = swaps.find((swap) => swap.id.toString() === id);

  if (!swap) {
    return <div className="container mt-5"><h2>Swap not found</h2></div>
  }

  return (
    <div className="container mt-5">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mb-4"
      >
        &larr; Back
      </button>
      <h2>{swap.title}</h2>
      {swap.imageUrl && <img src={swap.imageUrl} alt={swap.title} className="img-fluid mb-3" />}
      {/* Change to swap.description later */}
      <p>{swap.body}</p>
      <span className="badge bg-secondary">{swap.category}</span>
    </div>
  );
};

export default SwapDetails;