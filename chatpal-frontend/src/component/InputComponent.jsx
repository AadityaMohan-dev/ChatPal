import React, { useState } from 'react';

function InputComponent({ onSendMessage }) {
  const [question, setQuestion] = useState('');

  const handleSend = () => {
    if (question.trim()) {
        onSendMessage(question);
      
      setQuestion('');
    }
  };
  console.log(question)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='flex justify-center w-full p-4 text-zinc-600'>
      <input
        type='text'
        placeholder='Ask your question here...'
        className='w-full max-w-lg h-12 px-4 text-zinc-600 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-zinc-500'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className='ml-2 px-6 h-12 bg-zinc-800 text-white rounded-lg hover:bg-zinc-900 transition'
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default InputComponent;
