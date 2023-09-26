import { useContext, useState } from 'react';
import { ChatContext } from './chat-provider';
import useChat from '../../hooks/useChat';

function ChatForm() {
  const defaultModel = 'text-davinci-003';
  const [search, setSearch] = useState('');
  const [model, setModel] = useState(defaultModel);
  const { chat, user } = useContext(ChatContext);
  const { searchResult } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    searchResult(model, search, user);
  };

  return (
    <form className='mt-16 lg:flex' onSubmit={handleSubmit}>
      <input
        type='text'
        value={search}
        placeholder='Search...'
        className='rounded w-full lg:w-2/3 h-12 px-4 border-0 outline-0 mb-2'
        onChange={(e) => setSearch(e.target.value)}
      />

      {chat.models.length > 0 && (
        <select
          className='lg:ml-2 mb-2 w-full lg:w-auto h-12  px-4 rounded'
          defaultValue={defaultModel}
          name='model'
          onChange={(e) => setModel(e.target.value)}
        >
          {chat.models.map((model) => (
            <option key={model.id}>{model.id}</option>
          ))}
        </select>
      )}

      <button className='text-white bg-blue-600 px-4 py-3 ml-2 h-12 rounded'>
        Submit
      </button>
    </form>
  );
}

export default ChatForm;
