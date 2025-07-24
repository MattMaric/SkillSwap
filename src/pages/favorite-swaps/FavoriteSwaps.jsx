import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./FavoriteSwaps.module.css";

const FavoriteSwaps = () => {
  const swaps = useSelector((state) => state.swaps.swaps);
  const favoriteSwaps = swaps.filter((swap) => swap.isFavorite);
  const navigate = useNavigate();

  return (
    <div className={`container ${styles.wrapper}`}>
      <h2 className="text-center mb-4">Favorite Swaps</h2>
      {favoriteSwaps.length === 0 ? (
        <p>You haven't liked any swaps yet.</p>
      ) : (
        <div className="row">
          {favoriteSwaps.map((swap) => (
            <div className="col-md-4 mb-4" key={swap.id}>
              <div
                className={`card ${styles.wrapCard}`}
                onClick={() => navigate(`/swaps/${swap.id}`)}
              >
                {swap.imageUrl && (
                  <img
                    src={swap.imageUrl}
                    className="card-img-top"
                    alt={swap.title}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{swap.title}</h5>
                  <p className="card-text">{swap.description}</p>
                  <span className="badge bg-secondary">{swap.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteSwaps;
