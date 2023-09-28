import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/features/user/userSlice";

const SignIn = () => {
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false){
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate("/")
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input type="email" placeholder="email" className="border p-3 rounded-lg" name="email" onChange={handleChange} />
        <input type="password" placeholder="password" className="border p-3 rounded-lg" name="password" onChange={handleChange} />
        <button 
        disabled={loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading...": "Sign In"}
          </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link className="text-blue-700" to="/sign-up">Sign Up</Link>
      </div>
      
    </div>
  )
}

export default SignIn;