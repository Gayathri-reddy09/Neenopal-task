import React, { useState } from 'react';
import Card from './Card';

const Update = () => {
  const [cards, setCards] = useState([]);

  const handleEdit = (id, newData) => {
    setCards(prevCards => {
      return prevCards.map(card => {
        if (card.id === id) {
          return { ...card, ...newData };
        }
        return card;
      });
    });
  };

  const handleDelete = (id) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  return (
    <div>
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          name={card.name}
          email={card.email}
          phone={card.phone}
          website={card.website}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Update;