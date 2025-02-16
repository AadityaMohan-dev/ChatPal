import React from 'react';

function Loader() {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
    </div>
  );
}

export default Loader;
