import React from 'react';
import { delay } from './delay';

export const SimonButton = React.forwardRef(function SimonButton({ button, onClick }, ref) {
  const [active, setActive] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    async press(duration = 500) {
      setActive(true);
      if (button.tone?.play) {
        try {
          button.tone.play(duration / 1000);
        } catch (err) {
          console.debug('Tone playback skipped', err);
        }
      }
      await delay(duration);
      setActive(false);
      await delay(50);
    },
  }));

  return (
    <button
      type='button'
      className={`simon-button ${button.className} ${active ? 'active' : ''}`}
      onClick={() => onClick(button.position)}
      aria-label={`Simon button ${button.position + 1}`}
    />
  );
});
