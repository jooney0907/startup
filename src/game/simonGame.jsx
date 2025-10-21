import React from 'react';
import { delay } from './delay';
import { GameEvent, GameNotifier } from './gameNotifier';
import { SimonButton } from './simonButton';

const buttonConfig = [
  { position: 0, className: 'green', frequency: 415.3 },
  { position: 1, className: 'red', frequency: 311.1 },
  { position: 2, className: 'yellow', frequency: 252.0 },
  { position: 3, className: 'blue', frequency: 209.3 },
];

let audioContext;
function getAudioContext() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  if (!audioContext) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (Ctor) {
      audioContext = new Ctor();
    }
  }

  return audioContext;
}

function createTone(frequency) {
  return {
    async play(durationSeconds = 0.35) {
      const ctx = getAudioContext();
      if (!ctx) {
        return;
      }

      if (ctx.state === 'suspended') {
        try {
          await ctx.resume();
        } catch (err) {
          console.debug('Unable to resume audio context', err);
          return;
        }
      }

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
      oscillator.start(now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);
      oscillator.stop(now + durationSeconds);
    },
  };
}

const mistakeTone = createTone(110);

export function SimonGame({ userName }) {
  const buttons = React.useMemo(
    () =>
      buttonConfig.map((config) => ({
        ...config,
        ref: React.createRef(),
        tone: createTone(config.frequency),
      })),
    []
  );

  const buttonsMap = React.useMemo(() => new Map(buttons.map((button) => [button.position, button])), [buttons]);

  const [sequence, setSequence] = React.useState([]);
  const [allowPlayer, setAllowPlayer] = React.useState(false);
  const [playbackPos, setPlaybackPos] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [status, setStatus] = React.useState('Press start to play!');

  const resetGame = React.useCallback(() => {
    setAllowPlayer(false);
    setSequence([]);
    setPlaybackPos(0);
    setScore(0);
    setStatus('Press start to play!');
  }, []);

  const playSequence = React.useCallback(
    async (sequenceToPlay) => {
      if (!sequenceToPlay.length) {
        return;
      }

      setAllowPlayer(false);
      setStatus('Watch the sequence');
      for (const step of sequenceToPlay) {
        const button = buttonsMap.get(step.position);
        if (button?.ref.current) {
          await button.ref.current.press();
        }
        await delay(150);
      }
      setStatus('Your turn');
      setAllowPlayer(true);
    },
    [buttonsMap]
  );

  const increaseSequence = React.useCallback(
    async (currentSequence) => {
      const nextSequence = [...currentSequence, getRandomStep()];
      setSequence(nextSequence);
      setPlaybackPos(0);
      setScore(nextSequence.length - 1);
      await delay(400);
      await playSequence(nextSequence);
    },
    [playSequence]
  );

  const buttonDance = React.useCallback(
    async () => {
      setAllowPlayer(false);
      setStatus('Tough break! Watch and try again.');
      for (let i = 0; i < 2; i++) {
        for (const button of buttons) {
          if (button.ref.current) {
            await button.ref.current.press(200);
          }
        }
      }
      await delay(500);
      resetGame();
    },
    [buttons, resetGame]
  );

  const saveScore = React.useCallback(
    (currentScore) => {
      const entry = {
        name: userName || 'anonymous',
        score: currentScore,
        date: new Date().toLocaleDateString(),
      };

      const existing = JSON.parse(localStorage.getItem('scores') ?? '[]');
      existing.push(entry);
      existing.sort((a, b) => b.score - a.score);
      localStorage.setItem('scores', JSON.stringify(existing.slice(0, 10)));

      GameNotifier.broadcastEvent(entry.name, GameEvent.End, entry);
    },
    [userName]
  );

  const handleMistake = React.useCallback(
    async (currentScore) => {
      await mistakeTone.play(0.75);
      saveScore(currentScore);
      await buttonDance();
    },
    [buttonDance, saveScore]
  );

  const onButtonPressed = React.useCallback(
    async (buttonPosition) => {
      if (!allowPlayer) {
        return;
      }

      const button = buttonsMap.get(buttonPosition);
      if (!button?.ref.current) {
        return;
      }

      const currentSequence = sequence;
      if (!currentSequence.length) {
        setAllowPlayer(true);
        return;
      }

      setAllowPlayer(false);
      await button.ref.current.press();

      if (currentSequence[playbackPos].position === buttonPosition) {
        if (playbackPos + 1 === currentSequence.length) {
          await increaseSequence(currentSequence);
        } else {
          setPlaybackPos((pos) => pos + 1);
          setAllowPlayer(true);
          setStatus('Keep going...');
        }
      } else {
        await handleMistake(Math.max(0, currentSequence.length - 1));
      }
    },
    [allowPlayer, buttonsMap, increaseSequence, playbackPos, sequence, handleMistake]
  );

  const startGame = React.useCallback(
    async () => {
      const firstSequence = [getRandomStep()];
      setSequence(firstSequence);
      setPlaybackPos(0);
      setScore(0);
      setStatus('Get ready...');
      await delay(300);
      await playSequence(firstSequence);
      GameNotifier.broadcastEvent(userName || 'Player', GameEvent.Start, { name: userName || 'Player' });
    },
    [playSequence, userName]
  );

  return (
    <section className='simon-game card bg-dark text-light shadow-lg p-4'>
      <header className='mb-4'>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='h4 mb-0'>Simon</h2>
          <div className='badge bg-primary fs-6'>Round: {score}</div>
        </div>
        <p className='text-muted mb-0 mt-2'>{status}</p>
      </header>

      <div className='simon-board'>
        {buttons.map((button) => (
          <SimonButton key={button.position} button={button} ref={button.ref} onClick={onButtonPressed} />
        ))}
      </div>

      <footer className='mt-4 d-grid gap-2'>
        <button
          type='button'
          className='btn btn-success'
          onClick={() => {
            if (sequence.length) {
              resetGame();
            }
            startGame();
          }}
          disabled={!allowPlayer && sequence.length > 0}
        >
          {sequence.length ? 'Restart' : 'Start'}
        </button>
      </footer>
    </section>
  );
}

function getRandomStep() {
  const position = Math.floor(Math.random() * buttonConfig.length);
  return { position };
}
