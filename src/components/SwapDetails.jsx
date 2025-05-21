import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postComment, fetchComments, deleteComment } from "../features/comments/commentsSlice";

const SwapDetails = () => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);

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

    dispatch(postComment({ swapId: swap.id, author: user?.name || "Anonymous", text: commentText }));
    setCommentText("");
  }

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
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
          [...comments].reverse().map((comment) => (
            <div className="card mb-3" key={comment.id}>
              <div className="card-body position-relative">
                <h6 className="card-title mb-3">{comment.author}</h6>
                <p className="card-text mb-0">{comment.text}</p>
                {user?.name === comment.author && (
                  <button
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 mt-2 me-2 fw-bold"
                    onClick={() => handleDelete(comment.id)}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
            ))
          ) : (
            <p className="text-muted">No comments yet. Be the first to comment</p>
          )
        }

        {user ? (
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
        ) : (
          <p className="text-muted">Please log in to write a comment.</p>
        )}

      </div>
    </>
  );
};

export default SwapDetails;