import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function CreateExercise({ user, setUser }) {
  const categoryOptions = [
    { key: 1, label: "Endurance", value: "endurance" },
    { key: 2, label: "Strength", value: "strength" },
    { key: 3, label: "Balance", value: "balance" },
    { key: 4, label: "Flexibility", value: "flexibility" },
  ];
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    category: "Endurance",
    duration: "",
    intensity: "",
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
    const { data, error } = await apiClient.createExercise({
      name: form.name,
      category: form.category,
      duration: Number(form.duration),
      intensity: Number(form.intensity),
    });
    if (error) setErrors((e) => ({ ...e, form: error }));
    if (data) {
      navigate("/exercise");
    }
    setIsProcessing(false);
  };

  return (
    <div className="Register">
      <div className="card">
        <h2>New Exercise</h2>

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
            <label htmlFor="name">Select a category</label>
            <select
              name="category"
              onChange={(event) =>
                setForm((f) => ({ ...f, category: event.target.value }))
              }
            >
              {categoryOptions.map((category) => (
                <option key={category.key} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>
          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">Duration In Minutes</label>
              <input
                type="number"
                name="duration"
                min="1"
                value={form.duration}
                onChange={handleOnInputChange}
              />
              {errors.duration && (
                <span className="error">{errors.duration}</span>
              )}
            </div>
            <div className="input-field">
              <label htmlFor="name">Intensity</label>
              <input
                type="number"
                name="intensity"
                max="10"
                min="0"
                value={form.intensity}
                onChange={handleOnInputChange}
              />
              {errors.intensity && (
                <span className="error">{errors.intensity}</span>
              )}
            </div>
          </div>

          <button
            className="btn"
            disabled={isProcessing}
            onClick={handleOnSubmit}
          >
            {isProcessing ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
