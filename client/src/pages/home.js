import { useContext, useEffect } from 'react';
import ChatList from '../components/chat/chat-list';
import ChatForm from '../components/chat/chat-form';
import Loader from '../components/loader/loader';
import useChat from '../hooks/useChat';
import { ChatContext } from '../components/chat/chat-provider';

function Home() {
  const { user } = useContext(ChatContext);
  const { fetchModelAndChat } = useChat();

  useEffect(() => {
    if (user !== '') {
      fetchModelAndChat();
    }
  }, [user]);

  return (
    <>
      <ChatForm />
      <Loader />
      <ChatList />
    </>
  );
}

export default Home;
