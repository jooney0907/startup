import React from 'react';

export function Unauthenticated({ userName, onLogin, onError }) {
  const [loginUserName, setLoginUserName] = React.useState(userName ?? '');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    setLoginUserName(userName ?? '');
  }, [userName]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!loginUserName.trim() || !password.trim()) {
      onError?.('Please provide both a username and password.');
      return;
    }

    onLogin(loginUserName.trim());
    setPassword('');
  }

  return (
    <form className='card bg-dark text-light shadow-lg p-4 mt-4 text-start' onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='userName' className='form-label'>
          Username
        </label>
        <input
          id='userName'
          className='form-control'
          value={loginUserName}
          onChange={(event) => setLoginUserName(event.target.value)}
          autoComplete='username'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input
          id='password'
          type='password'
          className='form-control'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete='current-password'
        />
      </div>

      <div className='d-grid gap-2'>
        <button type='submit' className='btn btn-primary'>
          Log in
        </button>
      </div>
    </form>
  );
}
