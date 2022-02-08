
import Homepage from './Homepage';
import CharacterInfo from './CharacterInfo';

import { Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import character from '../reducers/character.reducer';

const store = createStore(combineReducers({character}));

function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/characterInfo" element={<CharacterInfo />} />
      </Routes>
    </Provider>
  );

}

export default App;
