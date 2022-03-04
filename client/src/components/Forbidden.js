import React from 'react';

export default class Forbidden extends React.PureComponent {
  render() {
    return (
      <main>
        <div className='wrap'>
          <h2>Forbidden</h2>
          <p>Uh oh! You can't access this page.</p>
        </div>
      </main>
    );
  }
};