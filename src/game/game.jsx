import React from 'react';
import './about.css'
export function About() {
  return (
  <main>
    <div class = "flex-row">
      <div id="picture" class="picture-box"><img width="400px" src="einstein.jpg" alt="random" style="margin-right: 60px" /></div>
      <div class = "flex-column">
      <h3>Q: Who was the first President of the United States?</h3>
      <h2>A:</h2>
      <h2>B:</h2>
      <h2>C:</h2>
      <h2>D:</h2>
      </div>
    </div>
    
    <h3>16 (timer)</h3>
    <a href="scores.html">
         <button type="button" class="btn btn-light">End game</button>
    </a>
  </main>
  );
}