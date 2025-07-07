import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  postComment,
  fetchCommentsBySwapId,
  deleteComment,
  editComment,
  likeComment,
} from "../features/comments/commentsSlice";
import { createNotification } from "../features/notifications/notificationsSlice";

const SwapDetails = () => {
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const commentInputRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const swaps = useSelector((state) => state.swaps.swaps);
  const comments = useSelector((state) =>
    state.comments.commentsBySwap.filter((c) => c.swapId.toString() === id)
  );

  // Find the swap by ID
  const swap = swaps.find((swap) => swap.id.toString() === id);

  useEffect(() => {
    if (swap) {
      dispatch(fetchCommentsBySwapId(swap.id));
    }
  }, [dispatch, swap]);

  useEffect(() => {
    commentInputRef.current?.focus();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      swapId: swap.id,
      author: user?.name || "Anonymous",
      authorId: user?.id,
      text: commentText,
      likes: [],
      timestamp: new Date().toISOString(),
    };

    const resultAction = await dispatch(postComment(newComment));

    if (resultAction.meta.requestStatus === "fulfilled") {
      // Dispatch notification only if commenter is not the owner of the swap
      if (swap.userId !== user.id) {
        dispatch(
          createNotification({
            recipientId: swap.userId,
            senderName: user?.name || "Anonymous",
            message: `${user?.name || "Someone"} commented on your swap.`,
            swapId: swap.id,
            timestamp: new Date().toISOString(),
            read: false,
          })
        );
      }
    }

    setCommentText("");
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleEditInit = (comment) => {
    setEditingId(comment.id);
    setEditedText(comment.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedText("");
  };

  const handleEditSave = (id) => {
    if (!editedText.trim()) return;
    dispatch(editComment({ id, updatedText: editedText }));
    setEditingId(null);
    setEditedText("");
  };

  if (!swap) {
    return (
      <div className="container mt-5">
        <h2>Swap not found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">
          &larr; Back
        </button>
        <h2>{swap.title}</h2>
        {swap.imageUrl && (
          <img
            src={swap.imageUrl}
            alt={swap.title}
            className="img-fluid mb-3"
          />
        )}
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
            const isLiked = comment.likes.includes(user.email);

            return (
              <div className="card mb-3" key={comment.id}>
                <div className="card-body position-relative">
                  <h6 className="card-title">{comment.author}</h6>
                  <small className="text-muted">
                    {new Date(comment.timestamp).toLocaleString()}
                  </small>

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
                        disabled={
                          !editedText.trim() || editedText === comment.text
                        }
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
                      <p className="card-text mt-3 mb-0">{comment.text}</p>
                      {comment.editedAt && (
                        <p className="text-muted small mb-0 mt-1">
                          <em>
                            edited {new Date(comment.editedAt).toLocaleString()}
                          </em>
                        </p>
                      )}

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        {user && (
                          <button
                            className={`btn btn-sm fw-bold ${
                              isLiked ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() =>
                              dispatch(
                                likeComment({
                                  commentId: comment.id,
                                  userEmail: user.email,
                                })
                              )
                            }
                          >
                            👍 {comment.likes.length}
                          </button>
                        )}

                        {isAuthor && (
                          <div className="d-flex gap-1">
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
                      </div>
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
