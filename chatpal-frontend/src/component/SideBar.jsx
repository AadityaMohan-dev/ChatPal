import React from 'react';

function SideBar() {
  return (
    <div className='w-full md:w-72 h-full text-white flex flex-col justify-between p-6'>
      <div>
        <h1 className='text-3xl md:text-5xl text-[#F5CB5C] font-semibold text-center md:text-left'>ChatPal</h1>
        <p className='text-lg md:text-2xl py-16 text-center md:text-left'>
          ChatPal is an AI-powered Q&A tool 
        </p>
        <p className='text-sm md:text-lg text-center md:text-left'>
          You can ask any question on this platform it is designed to provide accurate and quick answers to your queries. This tool utilizes Gemini AI (Gemini-1.5-Flash) to generate responses efficiently.
        </p>
      </div>
      <p className='text-center text-sm md:text-sm py-4'>
        © Created with ❤️ by Aaditya Mohan
      </p>
    </div>
  );
}

export default SideBar;
