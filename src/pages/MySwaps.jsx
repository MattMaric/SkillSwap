import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSwap } from "../features/swaps/swapsSlice";
import { Link } from "react-router-dom";
import { selectFilteredSwaps } from "../features/swaps/swapsSlice";
import SwapFilters from "../components/SwapFilters";

const MySwaps = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const swapsPerPage = 6;

  const user = useSelector((state) => state.auth.user);
  // Temporarily disable user filter for testing
  // const swaps = useSelector((state) => 
  //   selectFilteredSwaps(state).filter((swap) => swap.userId === user?.id)
  // );

  // Remove this after testing
  const swaps = useSelector(selectFilteredSwaps);
  const { loading } = useSelector((state) => state.swaps);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this swap?");
    if (confirmed) {
      dispatch(deleteSwap(id));
    }
  };

  // Calculate indexes (for pagination)
  const indexOfLastSwap = currentPage * swapsPerPage;
  const indexOfFirstSwap = indexOfLastSwap - swapsPerPage;
  const currentSwaps = swaps.slice(indexOfFirstSwap, indexOfLastSwap);

  const totalPages = Math.ceil(swaps.length / swapsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Swaps</h2>

      <SwapFilters />

      {currentSwaps.length === 0 ? (
        <p>You haven't created any swaps yet.</p>
      ) : (
        <div className="row">
          {currentSwaps.map((swap) => (
            <div className="col-md-4 mb-4" key={swap.id}>
              <div className="card h-100">
                {swap.imageUrl && (
                  <img src={swap.imageUrl} className="card-image-top" alt={swap.title} />
                )}
                <div className="card-body">
                  <h5 className="card-title">{swap.title}</h5>
                  <p className="card-text">{swap.description}</p>
                  <span className="badge bg-secondary">{swap.category}</span>
                    <div className="mt-4">
                      <Link to={`/swaps/edit/${swap.id}`} className="btn btn-sm btn-warning me-2">
                        Edit
                      </Link>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(swap.id)}
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {swaps.length > swapsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="align-self-center">{currentPage} / {totalPages}</span>
          <button
            className="btn btn-outline-primary ms-2"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
};
export default MySwaps;