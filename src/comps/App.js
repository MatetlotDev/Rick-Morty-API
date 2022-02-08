
import Homepage from './Homepage';
import CharacterInfo from './MoreInfoPage';

import { Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import character from '../reducers/character.reducer';
import moreInfo from '../reducers/moreInfo.reducer'

const store = createStore(combineReducers({character, moreInfo}));

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
