import { useState } from 'react';
import axios from 'axios';
import SideBar from './component/SideBar';
import InputComponent from './component/InputComponent';
import ResponseComponent from './component/ResponseComponent';
import Loader from './component/Loader';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  const handleSendMessage = async (message) => {
    setLoading(true);
    setQuestion(message)
    try {
      const res = await axios.post('http://localhost:8080/api/ask', { text: message });
      setResponse(res.data.response);
      console.log(res);
      
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error fetching response');
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen flex bg-zinc-600 text-white">
      <aside className="bg-zinc-800 text-white p-10 rounded-r-2xl">
        <SideBar />
      </aside>

      <div className="w-full flex flex-col">
        <div className="flex-1 flex flex-col items-center overflow-hidden">
          <h1 className="text-5xl pt-14 font-normal">Hi, Welcome to <span className='text-[#F5CB5C]'>ChatPal</span>.</h1>
          <div className="w-full flex-1 overflow-y-auto pb-10 mt-16 px-20">

            {loading ? <Loader /> : <ResponseComponent response={response} question={question} />}
          </div>
        </div>

        <div className="w-full">
          <InputComponent onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
