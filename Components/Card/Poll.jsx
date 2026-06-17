import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

function PollCard({ poll, onVote }) {
  const total = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);
  const hasVoted = poll.votedIndex !== null && poll.votedIndex !== undefined;
  const showBars = hasVoted;
  const canVote = !hasVoted;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-4">
      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center flex-shrink-0">
          {poll.name?.[0]?.toUpperCase() ?? "E"}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{poll.name}</p>
          <p className="text-xs text-slate-400">
            📅 {poll.createdAt?.toDate?.().toLocaleDateString() ?? "—"}
          </p>
        </div>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
          ● Open
        </span>
      </div>

      
      <div className="space-y-2 mt-4">
        {poll.options.map((option, i) => {
          const votes = option.votes || 0;
          const pct = total ? Math.round((votes / total) * 100) : 0;
          const isVoted = poll.votedIndex === i;

          return (
            <div
              key={i}
              onClick={() => canVote && onVote(poll.id, i)}
              className={`${canVote ? "cursor-pointer hover:bg-slate-50" : "cursor-default"} rounded-xl p-2 transition-colors`}
            >
              <div className="flex justify-between text-xs mb-1">
                <span className={`font-medium ${isVoted ? "text-green-600" : "text-slate-700"}`}>
                  {typeof option === "string" ? option : option.name}
                  {isVoted && " ✓"}
                </span>
                {showBars && <span className="text-slate-400">{pct}%</span>}
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                {showBars && (
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isVoted ? "bg-green-500" : "bg-blue-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
        <span>{total} votes</span>
        {hasVoted ? (
          <span className="text-green-600 font-medium">✓ Voted</span>
        ) : (
          <span className="text-blue-500 font-medium">Click an option to vote</span>
        )}
      </div>
    </div>
  );
}

function Poll() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch elections from Firestore
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const snapshot = await getDocs(collection(db, "elections"));
        const data = snapshot.docs.map((docSnap) => {
          const d = docSnap.data();
          // Normalize options: support both string[] and {name, votes}[]
          const options = (d.options || []).map((o) =>
            typeof o === "string" ? { name: o, votes: 0 } : o
          );
          return {
            id: docSnap.id,
            ...d,
            options,
            votedIndex: null,
          };
        });
        setPolls(data);
      } catch (err) {
        console.error("Failed to fetch elections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleVote = async (pollId, optionIdx) => {
    // Optimistic UI update
    setPolls((prev) =>
      prev.map((p) => {
        if (p.id !== pollId || p.votedIndex !== null) return p;
        const updatedOptions = p.options.map((o, i) =>
          i === optionIdx ? { ...o, votes: (o.votes || 0) + 1 } : o
        );
        return { ...p, options: updatedOptions, votedIndex: optionIdx };
      })
    );

    // Persist vote to Firestore
    try {
      const pollRef = doc(db, "elections", pollId);
      const pollSnap = await getDoc(pollRef);
      const current = pollSnap.data();

      const updatedOptions = (current.options || []).map((o, i) => {
        const base = typeof o === "string" ? { name: o, votes: 0 } : o;
        return i === optionIdx ? { ...base, votes: (base.votes || 0) + 1 } : base;
      });

      await updateDoc(pollRef, { options: updatedOptions });
    } catch (err) {
      console.error("Failed to save vote:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-slate-400 text-sm">
        Loading elections...
      </div>
    );
  }

  if (polls.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-2xl max-w-xl mx-auto">
        No elections yet. <span className="text-slate-400">Create one!</span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 pb-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-slate-700">📊 Elections</h2>
        <span className="text-xs bg-blue-100 text-slate-700 px-3 py-1 rounded-full font-medium">
          {polls.length} total
        </span>
      </div>

      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} onVote={handleVote} />
      ))}
    </div>
  );
}

export default Poll;