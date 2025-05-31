import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postComment, fetchComments, deleteComment } from "../features/comments/commentsSlice";

const SwapDetails = () => {
  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const commentInputRef = useRef(null);

  const user = useSelector(state => state.auth.user);
  const swaps = useSelector((state) => state.swaps.swaps);
  const comments = useSelector(state => 
    state.comments.comments.filter(c => c.swapId.toString() === id)
  );

  // Find the swap by ID
  const swap = swaps.find((swap) => swap.id.toString() === id);

  useEffect(() => {
    if (swap) {
      dispatch(fetchComments(swap.id));
    }
  }, [dispatch, swap]);

  useEffect(() => {
    commentInputRef.current?.focus();
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    dispatch(postComment({ 
      swapId: swap.id, 
      author: user?.name || "Anonymous", 
      text: commentText 
    }));
    
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
          [...comments].reverse().map((comment) => {
            const isAuthor = user?.name === comment.author;
            const isEditing = editingId === comment.id;

            return (
              <div className="card mb-3" key={comment.id}>
                <div className="card-body position-relative">
                  <h6 className="card-title mb-3">{comment.author}</h6>

                  {isEditing ? (
                    <>
                      <textarea 
                        className="form-control mb-2"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleEditSave(comment.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="card-text mb-0">{comment.text}</p>
                      {isAuthor && (
                        <div className="position-absolute top-0 end-0 mt-2 me-2 d-flex gap-1">
                          <button
                            className="btn btn-sm btn-warning fw-bold"
                            onClick={() => handleEditInit(comment)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger fw-bold"
                            onClick={() => handleDelete(comment.id)}
                          >
                            X
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted">No comments yet. Be the first to comment</p>
        )}

        {user ? (
          <form onSubmit={handleAddComment}>
            <div className="mb-3">
              <textarea 
                ref={commentInputRef}
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