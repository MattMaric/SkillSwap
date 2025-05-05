import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postComment, fetchComments } from "../features/comments/commentsSlice";

const SwapDetails = () => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const swaps = useSelector((state) => state.swaps.swaps);
  // Find the swap by ID
  const swap = swaps.find((swap) => swap.id.toString() === id);

  const comments = useSelector(state => 
    state.comments.comments.filter(c => c.swapId.toString() === id)
  );

  useEffect(() => {
    if (swap) {
      dispatch(fetchComments(swap.id));
    }
  }, [dispatch, swap]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    dispatch(postComment({ swapId: swap.id, author: "User", text: commentText }));
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
        <p>{swap.description}</p>
        <span className="badge bg-secondary">{swap.category}</span>
      </div>
      
      {/* Comments Section */}
      <div className="container mt-5">
        <h4>Comments</h4>

        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <h6 className="card-title mb-1">{comment.author}</h6>
                <p className="card-text mb-0">{comment.text}</p>
              </div>
            </div>
            ))
          ) : (
            <p className="text-muted">No comments yet. Be the first to comment</p>
          )
        }

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