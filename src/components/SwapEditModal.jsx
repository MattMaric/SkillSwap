import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editSwap } from "../features/swaps/swapsSlice";

const SwapEditModal = ({ show, swap, onClose }) => {
  const dispatch = useDispatch();
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
        id: swap.id,
        updatedData: {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          imageUrl: formData.imageUrl,
          updatedAt: new Date().toISOString(),
        },
      })
    );

    onClose();
  };

  if (!show || !swap) return null;

  return (
    <>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit} noValidate>
            <div className="modal-header">
              <h5 className="modal-title">Edit Swap</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
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
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
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
                  className={`form-select ${
                    errors.category ? "is-invalid" : ""
                  }`}
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
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SwapEditModal;
