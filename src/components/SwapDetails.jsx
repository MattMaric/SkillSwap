import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../features/swaps/swapsSlice";

const SwapDetails = () => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const swaps = useSelector((state) => state.swaps.swaps);

  // Find the swap by ID
  const swap = swaps.find((swap) => swap.id.toString() === id);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    dispatch(addComment({ swapId: swap.id, comment: commentText.trim() }));
    setCommentText("");
  }

  if (!swap) {
    return <div className="container mt-5"><h2>Swap not found</h2></div>
  }

  return (
    <>
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
      
      {/* Comments Section */}
      <div className="container mt-5">
        <h4>Comments</h4>

        {swap.comments && swap.comments.length > 0 ? (
          <ul className="list-group mb-3">
            {swap.comments.map((comment, index) => (
              <li 
                key={index} 
                className="list-group-item mb-2" 
                style={{borderRadius: "5px", border: "1px solid #dee2e6"}}
              >
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No comments yet. Be the first to comment</p>
        )}

        <form onSubmit={handleAddComment}>
          <div className="mb-3">
            <textarea 
              className="form-control"
              rows="3"
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Comment
          </button>
        </form>
      </div>
    </>
  );
};

export default SwapDetails;