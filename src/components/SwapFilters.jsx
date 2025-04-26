import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setCategoryFilter } from "../features/swaps/swapsSlice";

const SwapFilters = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.swaps.search);
  const category = useSelector((state) => state.swaps.category);

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategoryFilter(e.target.value));
  };

  return (
    <div className="mb-4 d-flex flex-column flex-md-row align-items-md-end gap-3">
      <div className="w-100">
        <label htmlFor="search" className="form-label">Search by Title</label>
        <input 
          id="search"
          type="text"
          className="form-control"
          placeholder="Enter title..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="w-100">
        <label htmlFor="category" className="form-label">Filter by Category</label>
        <select
          id="category"
          className="form-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="books">Books</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
        </select>
      </div>
    </div>
  );
};

export default SwapFilters;