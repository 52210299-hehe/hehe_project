import React from 'react'

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200  flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl text-center border-t-8 border-purple-700 border-b-8 border-b-purple-700">
        <h1 className="text-5xl font-bold text-purple-900 mb-6">About hehe travels 2</h1>
        <p className="text-2xl text-gray-700 mb-8">
          hehe travles 2 is your simple flight management platform.<br />
          Book, manage, and explore flights easily.
        </p>
        <div className="flex flex-col gap-6">
          <div className='bg-purple-200 rounded-lg p-6'>
            <span className="text-4xl">✈️</span>
            <h2 className="text-xl font-bold text-purple-800 mt-2 mb-1">Easy Booking</h2>
            <p className="text-base text-gray-700">Quickly find and register flights with a few clicks.</p>
          </div>
          <div className = 'bg-purple-200 rounded-lg p-6'>
            <span className="text-4xl">🛠️</span>
            <h2 className="text-xl font-bold text-purple-800 mt-2 mb-1">Manage Flights</h2>
            <p className="text-base text-gray-700">Create, edit, or delete flights anytime.</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-lg">
          &copy; {new Date().getFullYear()} hehe travles 2. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default About
