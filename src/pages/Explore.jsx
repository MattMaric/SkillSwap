import { useSelector } from "react-redux";
import { toggleFavorite } from "../features/swaps/swapsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Explore = () => {
  const { swaps, loading, error } = useSelector((state) => state.swaps);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Explore Swaps</h2>
      <div className="row">
        {swaps.map((swap) => (
          <div key={swap.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={swap.imageUrl}
                alt="Swap item"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{swap.title}</h5>
                <p className="card-text">{swap.body}</p>
                <a href={`/swaps/${swap.id}`} className="btn btn-primary">
                  View Swap
                </a>
                <div className="mt-4">
                  <button
                    className="btn btn-sm border-0 bg-transparent"
                    onClick={() => {
                      dispatch(toggleFavorite(swap.id));
                    }}
                    title="Toggle favorite"
                    aria-label="Toggle favorite"
                  >
                    <FontAwesomeIcon
                      icon={swap.isFavorite ? solidHeart : regularHeart}
                      style={{ color: "red", fontSize: "1.25rem" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Explore;
