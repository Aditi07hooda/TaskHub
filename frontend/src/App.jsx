import React from 'react';
import './App.css'
import Routing from './Routing'
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Routing/>
      </div>
    </RecoilRoot>
  )
}

export default App
