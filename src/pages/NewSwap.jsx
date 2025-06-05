import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSwap, clearSwapStatus } from "../features/swaps/swapsSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NewSwap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.swaps);
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const resultAction = await dispatch(
      createSwap({
        ...formData,
        userId: user.id,
        author: user.name,
      })
    );
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/swaps");
      }, 1000);
    }
  }, [success, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearSwapStatus());
    };
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2>Create a New Swap</h2>
      {success && (
        <div className="alert alert-success">Swap created successfully!</div>
      )}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-warning">
          Please fix the highlighted errors before submitting.
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`form-select ${errors.category ? "is-invalid" : ""}`}
          >
            <option value="">Select a category</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {formData.imageUrl && (
          <div className="my-3 text-center">
            <img
              src={formData.imageUrl}
              alt="Swap Preview"
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Swap"}
        </button>
        {loading && (
          <div className="mt-3 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewSwap;
