import React from 'react'
import { useState } from 'react';

function Poll() {

    const [pollDate, setPollDate] = useState();
    const [pollCreator, setPollCreator] = useState("username");
  return (
    <div>
        {/* space for storing poll data */}

        <div>
            <h3>vote is created by {pollCreator}</h3>
            <h3>vote is created on {pollDate}</h3>
            <h3>voting percentage is: {/* voting percentage value here */}</h3>
        </div>
    </div>
  )
}

export default Poll