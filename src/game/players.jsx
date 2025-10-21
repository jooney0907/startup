import React from 'react';
import { GameEvent, GameNotifier } from './gameNotifier';

export function Players() {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    function handleGameEvent(event) {
      setEvents((existing) => {
        const newEvents = [event, ...existing];
        return newEvents.slice(0, 10);
      });
    }

    GameNotifier.addHandler(handleGameEvent);
    return () => GameNotifier.removeHandler(handleGameEvent);
  }, []);

  return (
    <section className='players-panel card bg-dark text-light shadow-sm p-4 h-100'>
      <h2 className='h4 mb-3'>Global activity</h2>
      <ul className='list-unstyled mb-0 players-events'>
        {events.length === 0 && <li className='text-muted'>No activity yet. Be the first to play!</li>}
        {events.map((event, index) => (
          <li key={index} className='mb-2'>
            <span className='badge bg-info text-dark me-2'>{event.value?.name ?? event.from}</span>
            {renderMessage(event)}
          </li>
        ))}
      </ul>
    </section>
  );
}

function renderMessage(event) {
  switch (event.type) {
    case GameEvent.Start:
      return ' started a new game';
    case GameEvent.End:
      return ` scored ${event.value?.score ?? 0} on ${event.value?.date ?? ''}`;
    default:
      return ` ${event.value ?? 'sent a message'}`;
  }
}
