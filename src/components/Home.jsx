import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-[#0f172a] overflow-hidden">
      {/* Video Section */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full">
        <video
          src="/hello.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center text-center p-8">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Smart Inventory & Sales Analytics for Small Businesses
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Track sales, monitor inventory, get stock alerts, and understand customer trends — all in one custom-built dashboard, designed for small businesses without third-party fees or tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
