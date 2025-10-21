import React from 'react';
import './game.css';
import { Players } from './players';
import { SimonGame } from './simonGame';

export function Play({ userName }) {
  return (
    <main className='play-view container-fluid bg-secondary text-light py-5'>
      <div className='play-layout container'>
        <Players userName={userName} />
        <SimonGame userName={userName} />
      </div>
    </main>
  );
}
