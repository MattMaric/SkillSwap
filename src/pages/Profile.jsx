import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comments);
  const { swaps } = useSelector((state) => state.swaps);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const userComments = comments?.filter(
    (comment) => comment.author === user?.name
  );

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
          userComments.map((comment) => {
            const swap = swaps?.find((swap) => swap.id === comment.swapId);
            const swapTitle = swap?.title || "Unknown Swap";

            return (
              <div className="card mb-3" key={comment.id}>
                <div className="card-body">
                  <p className="card-text mb-1">{comment.text}</p>
                  <small className="text-muted">
                    Commented on:{" "}
                    <Link
                      to={`/swaps/${swap?.id}`}
                      className="text-decoration-none fw-semibold"
                    >
                      {swapTitle}
                    </Link>
                  </small>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted">You haven't written any comments yet.</p>
        )}
      </div>
    </div>
  );
};
export default Profile;
