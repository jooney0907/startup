// src/about/About.jsx
import React from 'react';
import './about.css';

export function About() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [quote, setQuote] = React.useState('Loading inspirational quote...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('Unknown');

  React.useEffect(() => {
    setImageUrl('/placeholder.png');
    setQuote('Words are cheap. Show me the code.');
    setQuoteAuthor('Linus Torvalds');
  }, []);

  return (
    <main className='container-fluid bg-secondary text-center py-5'>
      <div className='about-wrapper'>
        <div id='picture' className='picture-box'>
          <img src={imageUrl} alt='random inspiration' />
        </div>

        <p className='about-description'>
          Simon is the iconic memory game that challenges you to watch, listen, and repeat. In
          this reimagined React version the classic experience is wrapped in modern web
          technology, paving the way for competitive play, score tracking, and real-time updates.
        </p>

        <div id='quote' className='quote-box bg-light text-dark'>
          <p className='quote'>{quote}</p>
          <p className='author'>— {quoteAuthor}</p>
        </div>
      </div>
    </main>
  );
}
