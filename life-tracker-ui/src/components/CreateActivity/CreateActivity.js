import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../services/apiClient";
// import "./Register.css";

export default function CreateActivity({ user, setUser }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    activity_type: "",
  });

  //   useEffect(() => {
  //     // if user is already logged in,
  //     // redirect them to the home page
  //     if (user?.email) {
  //       navigate("/");
  //     }
  //   }, [user, navigate]);

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
    const { data, error } = await apiClient.createActivity({
      activity_type: form.activity_type,
    });
    // console.log("data",data)
    if (error) setErrors((e) => ({ ...e, form: error }));
    if (data) {
      // data = {}
      // const {data:datal, error} = await apiClient.loginUser({email: form.email, password: form.password})
      //   setUser(data.user);
      //   apiClient.setToken(data.token);
      navigate("/activity");
    }
    setIsProcessing(false);

    // try {
    //   const res = await axios.post("http://localhost:3001/auth/register", {
    //     first_name: form.firstName,
    //     username: form.userName,
    //     last_name: form.lastName,
    //     email: form.email,
    //     password: form.password,
    //   })
    //   if (res?.data?.user) {
    //     setUser(res.data.user)
    //   } else {
    //     setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
    //   }
    // } catch (err) {
    //   console.log(err)
    //   const message = err?.response?.data?.error?.message
    //   setErrors((e) => ({ ...e, form: message ?? String(err) }))
    // } finally {
    //   setIsProcessing(false)
    // }
  };

  return (
    <div className="Register">
      <div className="card">
        <h2>New Activity</h2>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="input-field">
            <label htmlFor="name">Activity Type</label>
            <input
              type="text"
              name="activity_type"
              placeholder="Enter the activity type"
              value={form.activity_type}
              onChange={handleOnInputChange}
            />
            {errors.activity_type && (
              <span className="error">{errors.activity_type}</span>
            )}
          </div>
          {/* <div className="input-field">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter the exercise category"
              value={form.category}
              onChange={handleOnInputChange}
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div> */}
          {/* <div className="split-inputs">
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
                max="10" min="0"
                value={form.intensity}
                onChange={handleOnInputChange}
              />
              {errors.intensity && (
                <span className="error">{errors.intensity}</span>
              )}
            </div>
          </div> */}

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
