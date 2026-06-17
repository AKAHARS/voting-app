import React from "react";
import { Vote, PlusCircle, ShieldCheck, BarChart2, Users } from "lucide-react";
import Poll from "../Components/Card/Poll";
import Voting from "../assets/Voting.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-10">
        <span className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-3">
          Secure Digital Voting
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight max-w-2xl">
          Empowering Trust in <span className="text-slate-400">Every Vote</span>
        </h1>

        <p className="mt-4 text-slate-500 text-base md:text-lg max-w-xl">
          Experience fair, transparent, and technology-driven elections —
          safely and securely.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-all duration-200"
          >
            <Vote size={18} />
            Register to Vote
          </button>

          <button
            onClick={() => navigate("/create-election")}
            className="flex items-center gap-2 border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-200"
          >
            <PlusCircle size={18} />
            Create an Election
          </button>
        </div>

        {/* Hero Image */}
        <div className="mt-12 w-full max-w-lg">
          <img
            src={Voting}
            alt="Voting Illustration"
            className="w-full rounded-3xl shadow-xl object-cover"
          />
        </div>
      </section>

      {/* ── Trust Stats ── */}
      <section className="bg-white border-y border-slate-100 py-8 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { icon: <Users size={22} className="text-slate-500" />, value: "10K+", label: "Registered Voters" },
            { icon: <BarChart2 size={22} className="text-green-500" />, value: "500+", label: "Elections Held" },
            { icon: <ShieldCheck size={22} className="text-purple-500" />, value: "100%", label: "Secure & Verified" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-1">
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live Elections / Poll ── */}
      <section className="px-6 py-12 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-slate-700">🗳️ Live Elections</h2>
          <button
            onClick={() => navigate("/create-election")}
            className="text-xs text-slate-600 font-medium hover:underline"
          >
            + New Election
          </button>
        </div>
        <p className="text-sm text-slate-400 mb-6">
          Cast your vote on active elections below.
        </p>
        <Poll />
      </section>

    </div>
  );
}