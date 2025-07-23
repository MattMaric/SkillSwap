import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSwap,
  selectFilteredSwaps,
  toggleFavorite,
} from "../../features/swaps/swapsSlice";
import { Link, useNavigate } from "react-router-dom";
import SwapFilters from "../../components/SwapFilters";
import SwapEditModal from "../../components/SwapEditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "./MySwaps.module.css";

const MySwaps = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(null);

  const swapsPerPage = 6;

  const user = useSelector((state) => state.auth.user);
  const swaps = useSelector((state) =>
    selectFilteredSwaps(state).filter((swap) => swap.userId === user?.id)
  );
  const { loading } = useSelector((state) => state.swaps);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this swap?"
    );
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
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleEditClick = (swap) => {
    setSelectedSwap(swap);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSwap(null);
    setShowModal(false);
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <h2 className="text-center">My Swaps</h2>

      <SwapFilters />

      {currentSwaps.length === 0 ? (
        <p>You haven't created any swaps yet.</p>
      ) : (
        <div className="row">
          {currentSwaps.map((swap) => (
            <div className="col-md-4 mb-4" key={swap.id}>
              <div
                className={`card ${styles.wrapCard}`}
                style={{ cursor: "pointer" }}
              >
                {swap.imageUrl && (
                  <img
                    src={swap.imageUrl}
                    className="card-image-top"
                    alt={swap.title}
                    onClick={() => navigate(`/swaps/${swap.id}`)}
                  />
                )}
                <div className="card-body">
                  <h5
                    className="card-title"
                    onClick={() => navigate(`/swaps/${swap.id}`)}
                  >
                    {swap.title}
                  </h5>
                  <p className="card-text">{swap.description}</p>
                  <span className="badge bg-secondary">{swap.category}</span>
                  <div className="mt-4">
                    <Link
                      className="btn btn-sm btn-primary text-white me-2"
                      onClick={() => handleEditClick(swap)}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(swap.id)}
                      disabled={loading}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                    <button
                      className={`btn btn-sm ${styles.heartIcon}`}
                      onClick={() => {
                        dispatch(toggleFavorite(swap.id));
                      }}
                      title="Toggle favorite"
                      aria-label="Toggle favorite"
                    >
                      <FontAwesomeIcon
                        icon={swap.isFavorite ? solidHeart : regularHeart}
                        style={{ color: "red", fontSize: "1.25rem" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <SwapEditModal
        show={showModal}
        swap={selectedSwap}
        onClose={closeModal}
      />

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
          <span className="align-self-center">
            {currentPage} / {totalPages}
          </span>
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
  );
};
export default MySwaps;
