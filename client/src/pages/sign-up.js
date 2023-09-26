import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          navigate('/');
        }
        setErrorMsg(res.message);
      });
  };
  return (
    <div className='mt-16 text-center'>
      <h1 className='text-white mb-10'>Sign Up</h1>

      {errorMsg && <p className='text-red'>{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='hidden'>Email</label>
          <input
            type='email'
            className='rounded px-3 py-4 w-[360px]'
            placeholder='Email address...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-3'>
          <label className='hidden'>Password</label>
          <input
            type='password'
            className='rounded px-3 py-4 w-[360px]'
            placeholder='Password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type='submit'
            className='text-white bg-blue-600 px-5 py-4 w-[360px] rounded hover:bg-blue-700'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
