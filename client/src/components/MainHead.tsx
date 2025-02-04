import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  typingSpeed: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, typingSpeed }) => {
  const [displayedText, setDisplayedText] = useState<string>(''); // Explicitly setting the type for useState

  useEffect(() => {
    let index = 0;
    const timeoutId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(timeoutId);
      }
    }, typingSpeed);

    return () => clearInterval(timeoutId);
  }, [text, typingSpeed]);

  return <span>{displayedText}</span>;
};

export default TypingAnimation;
