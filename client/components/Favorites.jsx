import React from 'react';
import { useSelector } from 'react-redux';
import Favorite from './Favorite'

const Favorites = () => {
  const favorites = useSelector((state) => state.main.favorites);

  return (
    <div>
      {favorites.length !== 0 && (
        <ul>
          {favorites.map((favorite) => (
            <li className="py-1" key={favorite.id}><Favorite item={favorite}/></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
