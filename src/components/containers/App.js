import React from 'react';
import VideoPlayer from './VideoPlayer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nopage from './Nopage';

// importing created styled-component
import GlobalStyle from '../styles/GlobalStyle';

const App = () => {
  return (
    <BrowserRouter basename='react_videoplayer'>
      <Routes>
        <Route path='/' element={<VideoPlayer />} />
        <Route path='/:activeVideo' element={<VideoPlayer />} />
        <Route path='*' element={<Nopage />} />
      </Routes>
      {/* styled-component */}
      <GlobalStyle />
    </BrowserRouter>
  )
}

export default App;