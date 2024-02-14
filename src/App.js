import React from 'react';
import Card from './Card';
import './App.css';
import cardData from './cardData.json';
import Update from './Update';
const App = () => {
  return (
    <div className="container">
      {cardData.map(card => (
        <Card key={card.id} {...card} />
      ))}
      <Update />
    </div>
  );
};

export default App;