import React from 'react';

export default class UnhandledError extends React.PureComponent {
  render() {
    return (
      <main>
        <div className='wrap'>
          <h2>Error</h2>
          <p>Sorry! We just encountered an unexpected error.</p>
        </div>
      </main>
    );
  }
};