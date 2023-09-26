import { marked } from 'marked';

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(window.navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
};

function Chat({ chats, deleteChat }) {
  return (
    <div className='rounded border text-black h-[600px] bg-white overflow-auto'>
      {chats.map((chat, index) => (
        <div
          key={chat._id}
          className={'border-b border-black/10 even:bg-gray-50 p-6 pb-0'}
        >
          <div className='flex'>
            <div className='flex-1 text-xs mb-3'>{formatDate(chat.date)}</div>
            <div
              className='flex-1 text-sm text-right '
              onClick={() => deleteChat(chat._id)}
            >
              x
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: marked(chat.text) }}></div>
        </div>
      ))}
    </div>
  );
}

export default Chat;
