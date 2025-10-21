import React from 'react';

export function MessageDialog({ message, onDismiss }) {
  return (
    <div className='alert alert-danger mt-4 d-flex justify-content-between align-items-center' role='alert'>
      <span>{message}</span>
      <button type='button' className='btn-close' aria-label='Close' onClick={onDismiss} />
    </div>
  );
}
