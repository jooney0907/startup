import React from 'react';
import { NavLink } from 'react-router-dom';

export function Authenticated({ userName, onLogout }) {
  return (
    <div className='card bg-dark text-light shadow-lg p-4 mt-4'>
      <p className='lead mb-4'>Welcome back, {userName || 'Player'}!</p>
      <div className='d-grid gap-2'>
        <NavLink to='/play' className='btn btn-success'>
          Jump back into the game
        </NavLink>
        <button className='btn btn-outline-light' onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}
