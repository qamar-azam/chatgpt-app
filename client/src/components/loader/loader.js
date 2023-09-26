import { useContext } from 'react';
import { ChatContext } from '../chat/chat-provider';
import LoadingGIF from './loader.gif';

function Loading() {
  const {
    chat: { loading }
  } = useContext(ChatContext);

  if (!loading) {
    return null;
  }
  return (
    <div className='mt-8'>
      <img
        src={LoadingGIF}
        alt='loading...'
        className='m-auto w-[300px] mb-[-50px] mt-[-85px]'
      />
    </div>
  );
}

export default Loading;
