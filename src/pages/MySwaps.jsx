import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSwap } from "../features/swaps/swapsSlice";
import { Link } from "react-router-dom";
import { selectFilteredSwaps } from "../features/swaps/swapsSlice";

const MySwaps = () => {
  const user = useSelector((state) => state.auth.user);
  const filteredSwaps = useSelector((state) => 
    selectFilteredSwaps(state).filter((swap) => swap.userId === user?.id)
  );
  const { loading } = useSelector((state) => state.swaps);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this swap?");
    if (confirmed) {
      dispatch(deleteSwap(id));
    }
  }

  return (
    <div className="container mt-5">
      <h2>My Swaps</h2>
      {filteredSwaps.length === 0 ? (
        <p>You haven't created any swaps yet.</p>
      ) : (
        <div className="row">
          {filteredSwaps.map((swap) => (
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
    </div>
  )
};
export default MySwaps;