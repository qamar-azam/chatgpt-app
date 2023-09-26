import { useContext } from 'react';
import { ChatContext } from './chat-provider';
import useChat from '../../hooks/useChat';
import Chat from './chat';

function ChatList() {
  const { chat } = useContext(ChatContext);
  const { deleteChat } = useChat();

  return (
    <div className='text-white text-left mt-8'>
      {chat.list.length > 0 && (
        <Chat chats={chat.list} deleteChat={deleteChat} />
      )}
    </div>
  );
}

export default ChatList;
