import { useContext } from 'react';
import { API_CONFIG } from '../config';
import { ChatContext } from '../components/chat/chat-provider';

function useChat() {
  const { chat, setChat, user } = useContext(ChatContext);

  const fetchModelAndChat = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/${user}`);
      const data = await response.json();
      setChat({ list: data.chats, models: data.models.data, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  const searchResult = async (model, search) => {
    try {
      setChat({ ...chat, loading: true });
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/search`, {
        ...API_CONFIG,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: search, model: model, user })
      });

      const data = await response.json();
      setChat({ ...chat, list: data.data, loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteChat = async (id) => {
    try {
      setChat({ ...chat, loading: true });
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/delete/${id}`,
        { method: 'DELETE' }
      );
      const data = await response.json();

      if (data.success) {
        let deleteChat = chat.list.filter((chat) => chat._id !== id);
        setChat({ ...chat, list: deleteChat, loading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    searchResult,
    deleteChat,
    fetchModelAndChat
  };
}

export default useChat;
