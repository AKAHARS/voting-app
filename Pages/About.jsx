import React from 'react';
import { Vote, Shield, Users, BarChart3, CheckCircle, Lock } from 'lucide-react';


export default function About(){
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Transparent",
      description: "Advanced encryption and blockchain technology ensure every vote is secure and verifiable"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Friendly",
      description: "Intuitive interface designed for voters of all technical backgrounds"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-time Results",
      description: "Track voting progress and view results instantly with live analytics"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Privacy Protected",
      description: "Your vote remains anonymous while maintaining complete accountability"
    }
  ];

  const stats = [
    { number: "500K+", label: "Active Users" },
    { number: "2M+", label: "Votes Cast" },
    { number: "99.9%", label: "Uptime" },
    { number: "100%", label: "Secure" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-slate-600 to-slate-900 p-4 rounded-2xl shadow-lg">
              <Vote className="w-12 h-12 text-white" />  
              {/* here i will add a vote logo */}
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-purple-400">Voting Master</span> {/*  a bit confused , should i use purple here */}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing democracy through secure, transparent, and accessible digital voting. 
            Empowering communities to make their voices heard with confidence and ease.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-purple-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div> 
        {/* this is new way of doing things and i can standout with them */}

        <div className="bg-white rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            We believe that every voice matters. Voting Master was created to eliminate barriers in the voting process, 
            making it accessible, secure, and trustworthy for everyone. Whether it's elections, organizational decisions, 
            or community polls, we provide the technology that makes democratic participation seamless and reliable.
          </p>
        </div>

        {/* here i will write Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose Voting Master</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-slate-100 to-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section , i could have add a form here */}
        <div className="bg-gradient-to-r from-slate-600 to-purple-600 rounded-2xl shadow-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-blue-100">
                We maintain the highest standards of honesty and ethical behavior in every aspect of our platform
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-blue-100">
                Everyone deserves equal access to democratic processes, regardless of technical expertise
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-blue-100">
                We continuously evolve our technology to meet the changing needs of modern democracy
              </p>
            </div>
          </div>
        </div>

        {/* last description ,will do more */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of organizations trusting Voting Master for their democratic processes</p>
          <div className="flex justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Create an Election
            </button>
            <button className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-blue-600 transition-all duration-300 hover:shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
