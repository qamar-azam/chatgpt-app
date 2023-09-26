import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [cookie, removeCookie] = useCookies([]);

  const Logout = () => {
    removeCookie('token');
    navigate('/signin');
  };

  return (
    <div className='flex'>
      <div className='flex-1'>
        <h1 className='text-6xl text-white my-8'>ChatGPT</h1>
      </div>
      <div className='flex-1 text-right'>
        {cookie.token !== 'undefined' ? (
          <button
            className='text-white bg-blue-600 px-5 py-2  h-12 rounded mt-10'
            onClick={Logout}
          >
            Log out
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
