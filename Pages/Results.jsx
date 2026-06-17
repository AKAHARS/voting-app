import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

export default function Results() {

  const [election, setElection] = useState(null);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    fetchElection();

    const unsub = fetchVotes();

    return () => unsub();
  }, []);

  // Fetch election
  const fetchElection = async () => {
    const snapshot = await getDocs(collection(db, "elections"));

    if (!snapshot.empty) {
      const firstElection = snapshot.docs[0];

      setElection({
        id: firstElection.id,
        ...firstElection.data()
      });
    }
  };

  // Live vote updates
  const fetchVotes = () => {
    const unsub = onSnapshot(collection(db, "votes"), (snapshot) => {

      let result = {};

      snapshot.forEach((doc) => {
        const data = doc.data();

        if (result[data.vote]) {
          result[data.vote]++;
        } else {
          result[data.vote] = 1;
        }
      });

      setCounts(result);
    });

    return unsub;
  };

  // Loading state
  if (!election) {
    return (
      <h1 className="text-center mt-10">
        Loading Results...
      </h1>
    );
  }

  // Total votes
  const totalVotes = Object.values(counts).reduce(
    (sum, num) => sum + num,
    0
  );

  // Winner
  const winner =
    Object.keys(counts).length > 0
      ? Object.keys(counts).reduce((a, b) =>
          counts[a] > counts[b] ? a : b
        )
      : "";

  return (
    <div className="p-8 max-w-xl mx-auto">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">
        {election.name} Results
      </h1>

      {/* Result Bars */}
      {election?.options?.map((option, index) => {

        const votes = counts[option] || 0;

        const percent = totalVotes
          ? ((votes / totalVotes) * 100).toFixed(1)
          : 0;

        return (
          <div key={index} className="mb-6">

            <div className="flex justify-between mb-1">
              <span>{option}</span>

              <span>
                {votes} votes ({percent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 rounded-full h-5">

              <div
                className="bg-blue-500 h-5 rounded-full"
                style={{ width: `${percent}%` }}
              ></div>

            </div>

          </div>
        );
      })}

      {/* Total Votes */}
      <h2 className="text-center mt-8 text-xl font-semibold">
        Total Votes: {totalVotes}
      </h2>

      {/* Winner */}
      {winner && (
        <h2 className="text-center mt-4 text-green-600 text-2xl font-bold">
          🏆 {winner} is Leading
        </h2>
      )}

    </div>
  );
}