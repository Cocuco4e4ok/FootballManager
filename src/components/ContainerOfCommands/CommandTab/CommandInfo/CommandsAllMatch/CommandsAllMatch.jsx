import React from 'react';
import { useParams } from 'react-router-dom';
// import
const CommandsAllMatch = () => {
  const { slug } = useParams();
  return (
    <div>
      <div>{slug}</div>

    </div>
  );
};
export default CommandsAllMatch;
