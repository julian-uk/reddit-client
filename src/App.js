import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/r/:subreddit" element={<HomePage />} />
        <Route path="/r/:subreddit/post/:postId" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
