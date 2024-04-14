import React, { useState, useEffect } from 'react';

const ChangingWordSentence = () => {
  const words = ['innovate', 'craft', 'invent', 'build'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change word every second

    return () => clearInterval(interval);
  }, []); // Run only once on component mount

  return (
    <div className="text-lg font-bold">
      <span>{words[index]}</span> something amazing.
    </div>
  );
};

export default ChangingWordSentence;
