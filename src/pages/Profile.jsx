import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { fetchSwaps } from "../features/swaps/swapsSlice";
import { fetchCommentsByUser } from "../features/comments/commentsSlice";

const Profile = () => {
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

  const userComments = commentsByUser?.filter(
    (comment) => comment.author === user?.name
  );
  const userSwaps = swaps.filter((swap) => swap.author === user?.name);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.name}!</h2>
      <p>This is your profile page.</p>
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
                <Link
                  to={`/swaps/${swap.id}`}
                  className="btn btn-sm btn-primary"
                >
                  View Swap
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">You haven't posted any swaps yet.</p>
        )}
      </div>
    </div>
  );
};
export default Profile;
