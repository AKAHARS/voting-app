
import { useState } from "react";

import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    if (!email.includes("@")) {
      alert("Enter valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be 6+ characters");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup Success");
  };

  const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Success");
    navigate("/VoteCompo");
  } catch (error) {
    alert(error.message);
  }
};

  return (
  <div className="flex justify-center items-center min-h-screen bg-slate-100">
    <div className="bg-white shadow-xl rounded-2xl p-8 w-96">

      <h1 className="text-3xl font-bold text-center text-slate-700 mb-6">
        Login Page
      </h1>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value.trim())}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value.trim())}
        className="w-full border p-3 rounded-lg mb-6"
      />

      <div className="flex gap-4">

        <button
          onClick={signup}
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
        >
          Signup
        </button>

        <button
          onClick={login}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>

      </div>
    </div>
  </div>
);
}