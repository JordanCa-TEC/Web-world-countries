import React from 'react';
import '../styles/main.scss';

const GiferEmbed = () => {
  return (
    <div className='gifanimated'>
      <iframe
        src="https://gifer.com/embed/2rRT"
        width="800px"
        height="600px"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GiferEmbed;
