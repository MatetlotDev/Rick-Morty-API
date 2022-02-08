import React from 'react';

import { useSelector } from 'react-redux';

export default function CharacterInfo() {

    const character = useSelector(store => store.character)

  return (
    <div>
        <img src={character.image} alt="" />
    </div>
  );
}
