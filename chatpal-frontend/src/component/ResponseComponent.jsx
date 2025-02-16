import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub-style formatting like tables and lists

function ResponseComponent({ response , question }) {
  return (
    <div>
        <span className='text-2xl text-[#F5CB5C] capitalize'>{question}</span>
      <p className='pt-5'><ReactMarkdown remarkPlugins={[remarkGfm]}>{response || 'No response yet'}</ReactMarkdown></p>
    </div>
  )
}

export default ResponseComponent


