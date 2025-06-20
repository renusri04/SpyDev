import React from 'react';
const Home = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* Video Section */}
      <div className="md:w-1/2 w-full h-64 md:h-auto relative overflow-hidden">
        <video
          src="/hello.mp4"
          autoPlay
          muted
          loop
          className="object-cover w-full h-full"
        />
        {/* Optional overlay if you want slight dark shade */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center text-center p-8 bg-slate-50">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Smart Inventory & Sales Analytics for Small Businesses
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Track sales, monitor inventory, get stock alerts, and understand customer trends — all in one custom-built dashboard, designed for small businesses without third-party fees or tools.
          </p>
          
        </div>
      </div>

    </div>
  );
};

export default Home;