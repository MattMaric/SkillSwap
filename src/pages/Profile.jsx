import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import SwapEditModal from "../components/SwapEditModal";
import { fetchSwaps } from "../features/swaps/swapsSlice";
import { fetchCommentsByUser } from "../features/comments/commentsSlice";
import { deleteSwap } from "../features/swaps/swapsSlice";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { commentsByUser } = useSelector((state) => state.comments);
  const { swaps } = useSelector((state) => state.swaps);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCommentsByUser(user.id));
      dispatch(fetchSwaps());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this swap?")) {
      dispatch(deleteSwap(id));
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

  const userComments = commentsByUser?.filter(
    (comment) => comment.author === user?.name
  );
  const userSwaps = swaps.filter((swap) => swap.author === user?.name);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name}!</h2>
      <div className="card my-4">
        <div className="card-body">
          <h5 className="card-title mb-2">Profile Info</h5>
          <p className="card-text mb-1">
            <strong>Name: </strong> {user?.name}
          </p>
          <p className="card-text mb-1">
            <strong>Email: </strong> {user?.email}
          </p>
          <p className="card-text mb-1">
            <strong>Joined: </strong>{" "}
            {new Date(user?.createdAt).toLocaleString() || "Unknown"}
          </p>
        </div>
      </div>

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>

      <div>
        <h4>Your Comments</h4>
        {userComments?.length > 0 ? (
          userComments.map((comment) => (
            <div className="card mb-3" key={comment.id}>
              <div className="card-body">
                <p className="card-text mb-1">{comment.text}</p>
                <small className="text-muted">
                  Commented on:{" "}
                  <Link
                    to={`/swaps/${comment.swapId}`}
                    className="text-decoration-none fw-semibold"
                  >
                    {swaps.find((s) => s.id === comment.swapId)?.title ||
                      "Unknown Swap"}
                  </Link>
                </small>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">You haven't written any comments yet.</p>
        )}

        <h4 className="mt-5">Your Swaps</h4>
        {userSwaps.length > 0 ? (
          userSwaps.map((swap) => (
            <div className="card mb-3" key={swap.id}>
              <div className="card-body">
                <h5 className="card-title">{swap.title}</h5>
                <p className="card-text">
                  <strong>Category:</strong> {swap.category}
                </p>
                <p className="card-text">{swap.description.slice(0, 100)}...</p>
                <div className="mb-2">
                  <small className="d-block text-muted">
                    Created at: {new Date(swap.createdAt).toLocaleString()}
                  </small>
                  {swap.updatedAt && (
                    <small className="d-block text-muted">
                      Edited at: {new Date(swap.updatedAt).toLocaleString()}
                    </small>
                  )}
                </div>
                <Link
                  to={`/swaps/${swap.id}`}
                  className="btn btn-sm btn-primary"
                >
                  View Swap
                </Link>
                <Link
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEditClick(swap)}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(swap.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">You haven't posted any swaps yet.</p>
        )}
      </div>

      <SwapEditModal
        show={showModal}
        swap={selectedSwap}
        onClose={closeModal}
      />
    </div>
  );
};
export default Profile;
