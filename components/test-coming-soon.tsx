import Image from 'next/image';
import React from 'react'

const ComingSoon = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="rounded-xl shadow-md bg-[#fbe7dd] p-6">
        <span className="text-sm font-medium bg-white rounded-full px-3 py-1 mb-3 inline-block">
          Coming Soon
        </span>
        <h3 className="text-xl font-bold mb-2">
          Book tests and view results directly in the MyDébbo app
        </h3>
        <Image
          src="/img/app-preview.png"
          alt="App Preview"
          width={300}
          height={180}
        />
      </div>

      <div className="rounded-xl shadow-md bg-white p-6">
        <h3 className="text-xl font-bold mb-3">Access Your Test Results</h3>
        <p className="text-sm text-gray-600 mb-4">
          Log in to our secure patient portal to view your results anytime,
          anywhere.
        </p>
        <button className="bg-[#fc7e5e] text-white rounded-full px-4 py-2 text-sm font-medium">
          Login Now
        </button>
      </div>
    </div>
  );
}

export default ComingSoon