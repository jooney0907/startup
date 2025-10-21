import React from 'react';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';
import { MessageDialog } from './messageDialog';

export function Login({ userName, authState, onAuthChange }) {
  const [message, setMessage] = React.useState('');

  return (
    <main className='container-fluid bg-secondary text-center py-5'>
      <div className='mx-auto' style={{ maxWidth: '420px' }}>
        {authState !== AuthState.Unknown && <h1>Welcome to Simon</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated
            userName={userName}
            onLogout={() => {
              setMessage('');
              onAuthChange('', AuthState.Unauthenticated);
            }}
          />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              setMessage('');
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
            onError={(errorMessage) => setMessage(errorMessage)}
          />
        )}
        {message && <MessageDialog message={message} onDismiss={() => setMessage('')} />}
      </div>
    </main>
  );
}
