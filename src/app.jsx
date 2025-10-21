import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { About } from './about/about';
import { Play } from './game/play';
import { Login } from './login/login';
import { AuthState } from './login/authState';
import { Scores } from './scores/scores';

export default function App() {
  const [authState, setAuthState] = React.useState(AuthState.Unknown);
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
      setAuthState(AuthState.Authenticated);
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, []);

  function handleAuthChange(nextUserName, nextAuthState) {
    setUserName(nextUserName);
    setAuthState(nextAuthState);

    if (nextAuthState === AuthState.Authenticated) {
      localStorage.setItem('userName', nextUserName);
    } else if (nextAuthState === AuthState.Unauthenticated) {
      localStorage.removeItem('userName');
    }
  }

  return (
    <BrowserRouter>
      <div className='body bg-dark text-light d-flex flex-column min-vh-100'>
        <header className='container py-3'>
          <div className='d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3'>
            <h1 className='m-0'>Simon React</h1>
            <menu className='navbar-nav flex-row gap-3'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/about'>
                  About
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/play'>
                    Play
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/scores'>
                    Scores
                  </NavLink>
                </li>
              )}
            </menu>
          </div>
          <hr />
        </header>

        <div className='flex-grow-1'>
          <Routes>
            <Route
              path='/'
              element={<Login userName={userName} authState={authState} onAuthChange={handleAuthChange} />}
            />
            <Route path='/about' element={<About />} />
            <Route
              path='/play'
              element={
                authState === AuthState.Authenticated ? (
                  <Play userName={userName} />
                ) : (
                  <Navigate to='/' replace />
                )
              }
            />
            <Route
              path='/scores'
              element={
                authState === AuthState.Authenticated ? (
                  <Scores />
                ) : (
                  <Navigate to='/' replace />
                )
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>

        <footer className='container py-4 mt-auto'>
          <hr className='border-secondary' />
          <div className='d-flex justify-content-end'>
            <a className='text-reset' href='https://github.com/jooney0907/startup'>
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <section className='container-fluid bg-secondary text-center py-5'>
      404: Return to sender. Address unknown.
    </section>
  );
}
