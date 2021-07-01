import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function CreateExercise({ user, setUser }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    calories: "",
    image_url: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match.",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsProcessing(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }
    const { data, error } = await apiClient.createNutrition({
      name: form.name,
      category: form.category,
      quantity: Number(form.quantity),
      calories: Number(form.calories),
      image_url: form.image_url,
    });
    if (error) setErrors((e) => ({ ...e, form: error }));
    if (data) {
      navigate("/nutrition");
    }
    setIsProcessing(false);
  };

  return (
    <div className="Register">
      <div className="card">
        <h2>New Nutrition</h2>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter the exercise name"
              value={form.name}
              onChange={handleOnInputChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="input-field">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter the nutrition category"
              value={form.category}
              onChange={handleOnInputChange}
            />
            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>
          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleOnInputChange}
              />
              {errors.quantity && (
                <span className="error">{errors.quantity}</span>
              )}
            </div>
            <div className="input-field">
              <label htmlFor="name">Calories</label>
              <input
                type="number"
                name="calories"
                min="0"
                value={form.calories}
                onChange={handleOnInputChange}
              />
              {errors.calories && (
                <span className="error">{errors.calories}</span>
              )}
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="imageUrl">Image Url</label>
            <input
              type="text"
              name="image_url"
              placeholder="Enter the url of the image"
              value={form.image_url}
              onChange={handleOnInputChange}
            />
            {errors.image_url && (
              <span className="error">{errors.image_url}</span>
            )}
          </div>

          {/* <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter a secure password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm your password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
            />
            {errors.passwordConfirm && (
              <span className="error">{errors.passwordConfirm}</span>
            )}
          </div> */}

          <button
            className="btn"
            disabled={isProcessing}
            onClick={handleOnSubmit}
          >
            {isProcessing ? "Loading..." : "Save"}
          </button>
        </div>

        {/* <div className="footer">
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}
