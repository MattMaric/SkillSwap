import { useSelector } from "react-redux";

const Explore = () => {
  const { swaps, loading, error } = useSelector((state) => state.swaps);

  if (loading) return <div>Loading...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="container mt-5">
      <h2>Explore Swaps</h2>
      <div className="row">
        {swaps.map((swap) => (
          <div key={swap.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://placehold.co/400"
                alt="Swap item"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{swap.title}</h5>
                <p className="card-text">{swap.body}</p>
                <a href="#" className="btn btn-primary">
                  View Swap
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};
export default Explore;