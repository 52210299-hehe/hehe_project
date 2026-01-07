import React, { useState, } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Username: "",
    Password: "",
    FullName: "",
    Email: "",
    Phone: "",
    RoleID: "2",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.Username.trim() || !form.Password.trim() || !form.Email.trim() || !form.FullName.trim()) {
      toast.error("Please fill Username, Password, Full name and Email.");
      return false;
    }
   
    if (form.Password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
   
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post("https://travel-backend-iw4y.onrender.com/api/SignUp", form);
      toast.success("Account created successfully. Please log in.");
      navigate("/login");
      setForm({
        Username: "",
        Password: "",
        FullName: "",
        Email: "",
        Phone: "",
        RoleID: "2",
      });
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-900 mb-4 text-center">Create Account</h1>

      <form
        className="bg-white rounded-xl shadow-lg flex flex-col w-full max-w-xl mx-auto p-6 gap-4 mb-8"
        onSubmit={handleSubmit}
      >
        { <div className="text-center text-sm text-red-600"></div>}

        <input
          name="Username"
          value={form.Username}
          onChange={handleChange}
          className="border border-purple-300 rounded-lg p-3 text-lg"
          required
          placeholder="Username"
        />

        <input
          name="Password"
          value={form.Password}
          onChange={handleChange}
          type="password"
          className="border border-purple-300 rounded-lg p-3 text-lg"
          required
          placeholder="Password (min 6 chars)"
        />

        <input
          name="FullName"
          value={form.FullName}
          onChange={handleChange}
          className="border border-purple-300 rounded-lg p-3 text-lg"
          required
          placeholder="Full name"
        />

        <input
          name="Email"
          value={form.Email}
          onChange={handleChange}
          type="email"
          className="border border-purple-300 rounded-lg p-3 text-lg"
          required
          placeholder="Email"
        />

        <input
          name="Phone"
          value={form.Phone}
          onChange={handleChange}
          className="border border-purple-300 rounded-lg p-3 text-lg"
          placeholder="Phone (optional)"
        />

        <input
          name="RoleID"
          value={form.RoleID}
          onChange={handleChange}
          type="hidden"
        />

        <button
          className="bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-900 transition-colors w-40 mx-auto disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;