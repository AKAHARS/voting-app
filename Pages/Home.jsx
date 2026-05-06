import React from "react"
import {  Vote } from 'lucide-react';
import Poll from '../Components/Card/Poll'
import Voting from '../assets/Voting.png'
import { useNavigate } from "react-router-dom"; 

export default function Home() {



    const navigate = useNavigate();

    const handleRegister = () => {
  navigate("/login");
};
    

    return (
        <>
        <div>
            <div className=" flex items-center justify-center gap-2 mt-10 mb-10 ">
                <h3 className="text-3xl font-bold text-slate-600">Empowering Trust in Every Vote</h3>
            </div>
            <div className="flex flex-col items-center mt-10">
                <h3 className="text-2xl text-slate-900 font-semibold ">Experience fair, transparent, and technology-driven elections — safely and securely.</h3>

                <div className="flex justify-center gap-14 mt-9">
                <span className="flex gap-4 bg-slate-600 text-white rounded-2xl p-2 hover:scale-105 transition-transform duration-200 ease-in-out   ">
                <button 
                onClick={handleRegister}
                >
                    Register to Vote 
                </button>

                <Vote size={20} className="mt-1" />
                </span>

                <div className="hover:scale-105 transition-transform duration-200 ease-in-out   ">
                    <button 
                className="bg-slate-600 text-white rounded-2xl p-2    "
                onClick={() => navigate('/create-election')}
                >
                    Create an Election 
                </button>
            
                </div>
                
            </div>
                <img className="w-1/2 max-w-xl rounded-2xl shadow-md mb-10 mt-10" src= {Voting} alt="Voting Image" />
            </div>
            
            <div>
                <Poll/>
            </div>
        </div>
        </>
    )
}