import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

export default function Results() {
  const [election, setElection] = useState(null);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    fetchElection();
    fetchVotes();
  }, []);

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

  if (!election) {
    return <h1 className="text-center mt-10">Loading Results...</h1>;
  }

  const totalVotes = Object.values(counts).reduce(
    (sum, num) => sum + num,
    0
  );

  const winner =
    Object.keys(counts).length > 0
      ? Object.keys(counts).reduce((a, b) =>
          counts[a] > counts[b] ? a : b
        )
      : "";

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        {election.name} Results
      </h1>

      {election.options.map((option, index) => {
        const votes = counts[option] || 0;
        const percent = totalVotes
          ? ((votes / totalVotes) * 100).toFixed(1)
          : 0;

        return (
          <div key={index} className="mb-6">
            <div className="flex justify-between mb-1">
              <span>{option}</span>
              <span>{votes} votes ({percent}%)</span>
            </div>

            <div className="w-full bg-gray-300 rounded-full h-5">
              <div
                className="bg-blue-500 h-5 rounded-full"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}

      <h2 className="text-center mt-8 text-xl font-semibold">
        Total Votes: {totalVotes}
      </h2>

      {winner && (
        <h2 className="text-center mt-4 text-green-600 text-2xl font-bold">
          🏆 {winner} is Leading
        </h2>
      )}
    </div>
  );
}