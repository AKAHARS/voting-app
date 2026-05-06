import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function PollPage() {
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [options, setOptions] = useState("");

  const handleCreateElection = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "elections"), {
        name: name,
        options: options.split(",").map((item) => item.trim()),
        createdAt: new Date()
      });

      setIsSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md bg-slate-700 p-8 rounded-2xl shadow-2xl">

        <h1 className="text-2xl font-bold text-white mb-6">
          Create New Election
        </h1>

        <form
          onSubmit={handleCreateElection}
          className="flex flex-col space-y-5"
        >

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Election Name
            </label>

            <input
              type="text"
              placeholder="Enter Election Name"
              className="w-full p-3 rounded-lg border border-slate-500 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Election Options
            </label>

            <input
              type="text"
              placeholder="Enter Options (comma separated)"
              className="w-full p-3 rounded-lg border border-slate-500 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Create Election
          </button>

        </form>

        {isSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
            Election created successfully!
          </div>
        )}

      </div>
    </div>
  );
}

export default PollPage;