import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Oauth from "../components/Oauth";
const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate("/sign-in")
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input type="text" placeholder="username" className="border p-3 rounded-lg" name="username" onChange={handleChange} />
        <input type="email" placeholder="email" className="border p-3 rounded-lg" name="email" onChange={handleChange} />
        <input type="password" placeholder="password" className="border p-3 rounded-lg" name="password" onChange={handleChange} />
        <button 
        disabled={loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading...": "Sign Up"}
          </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      <Oauth/>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link className="text-blue-700" to="/sign-in">Sign In</Link>
      </div>     
    </div>
  )
}

export default SignUp;