import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editSwap } from "../features/swaps/swapsSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditSwap = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const swap = useSelector((state) =>
    state.swaps.swaps.find((swap) => swap.id.toString() === id)
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (swap) {
      setFormData({
        title: swap.title || "",
        description: swap.description || "",
        category: swap.category || "",
        imageUrl: swap.imageUrl || "",
      });
    }
  }, [swap]);

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

    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    const resultAction = await dispatch(
      editSwap({
        id,
        updatedData: {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          imageUrl: formData.imageUrl,
          updatedAt: new Date().toISOString(),
        },
      })
    );

    if (editSwap.fulfilled.match(resultAction)) {
      navigate("/swaps");
    }
  };

  if (!swap) return <div>Loading swap data...</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Swap</h2>
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

        <button type="submit" className="btn btn-primary">
          Update Swap
        </button>
      </form>
    </div>
  );
};

export default EditSwap;
