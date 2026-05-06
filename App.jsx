import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import VoteCompo from "./Pages/VoteCompo";
import PollPage from "./Pages/PollPage";
import Login from "./Login";
import { Vote } from "lucide-react";
import Results from "./Pages/Results";

import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    alert("Logged Out");
  };

  return (
    <div>
      <div className="flex justify-between items-center px-6 py-4 bg-slate-800 text-white shadow-lg">

        <h1 className="text-2xl font-bold">Voting-Master</h1>

        <nav className="flex gap-5 items-center">
          <Link to="/results">Results</Link>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          <Link to="/VoteCompo">
            <Vote size={22} />
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-1 rounded-lg"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">
                {user.email}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 px-4 py-1 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/results" element={<Results />} />

        <Route
          path="/VoteCompo"
          element={user ? <VoteCompo /> : <Navigate to="/login" />}
        />

        <Route path="/create-election" element={<PollPage />} />
      </Routes>
    </div>
  );
}