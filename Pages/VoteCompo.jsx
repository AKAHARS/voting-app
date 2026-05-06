import { useEffect, useState } from "react";
import { db, auth } from "../firebase";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

export default function VoteCompo() {

  const [election, setElection] = useState(null);
  const [results, setResults] = useState({});

  // Load election + results
  useEffect(() => {
    fetchElection();
    fetchResults();
  }, []);

  // Fetch election data
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

  // Fetch live results
  const fetchResults = async () => {
    const snapshot = await getDocs(collection(db, "votes"));

    let counts = {};

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (counts[data.vote]) {
        counts[data.vote]++;
      } else {
        counts[data.vote] = 1;
      }
    });

    setResults(counts);
  };

  // Vote function
  const voteNow = async (option) => {
    try {

      const user = auth.currentUser;

      console.log("User:", user);
      console.log("Option:", option);
      console.log("Election:", election);

      if (!user) {
        alert("Please login first");
        return;
      }

      if (!election) {
        alert("Election not loaded yet");
        return;
      }

      const voteRef = doc(db, "votes", user.uid);

      const snap = await getDoc(voteRef);

      if (snap.exists()) {
        alert("You already voted");
        return;
      }

      // Save vote
      await setDoc(voteRef, {
        email: user.email,
        vote: option,
        electionId: election.id
      });

      alert("Vote Submitted Successfully");

      // Refresh results
      await fetchResults();

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Loading screen
  if (!election) {
    return (
      <h1 className="text-center mt-10">
        Loading Election...
      </h1>
    );
  }

  return (
    <div className="p-8 text-center">

      {/* Election Name */}
      <h1 className="text-3xl font-bold mb-8">
        {election.name}
      </h1>

      {/* Vote Buttons */}
      <div className="flex flex-col gap-4 max-w-md mx-auto">

        {election.options.map((option, index) => (
          <button
            key={index}
            onClick={() => voteNow(option)}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Vote for {option}
          </button>
        ))}

      </div>

      {/* Live Results */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Live Results
        </h2>

        {Object.entries(results).map(([candidate, count]) => (
          <div
            key={candidate}
            className="text-lg mb-2"
          >
            {candidate}: {count} votes
          </div>
        ))}

      </div>

    </div>
  );
}