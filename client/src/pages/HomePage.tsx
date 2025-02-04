import React from 'react';
import Headers from '../components/Headers.jsx';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>
        <Headers text="Hello, welcome to my site!" typingSpeed={150} />
      </h1>
      <h2>
        <Headers text="Here's what's new:" typingSpeed={300} />
      </h2>
    </div>
  );
};

export default HomePage;
