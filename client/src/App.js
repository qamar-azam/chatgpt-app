import { useEffect, useState } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Home from './pages/home';
import Header from './components/header/header';
import Signin from './pages/sign-in';
import Signup from './pages/sign-up';
import NotFound from './pages/not-found';
import ChatProvider from './components/chat/chat-provider';

function Layout() {
  return (
    <div className='bg-gray-700 min-h-screen px-4'>
      <div className='py-4 lg:w-2/3 m-auto'>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate('/signin');
      }
      const data = await fetch(`${process.env.REACT_APP_BACKEND}`, {
        method: 'POST',
        credentials: 'include'
      }).then((res) => res.json());

      const { status, user } = data;
      setUser(user);

      if (!status) {
        removeCookie('token');
        navigate('/signin');
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie, setUser]);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <ChatProvider user={user}>
              <Home />
            </ChatProvider>
          }
        />
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
