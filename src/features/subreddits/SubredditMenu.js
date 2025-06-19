import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubredditMenu.css';

const popularSubs = ['popular', 'news', 'sports', 'funny', 'gaming', 'pics', 'aww'];

function SubredditMenu() {
  const navigate = useNavigate();

  return (
    <div className="subreddit-menu">
      {popularSubs.map((sub) => (
        <button key={sub} onClick={() => navigate(`/r/${sub}`)}>
          r/{sub}
        </button>
      ))}
    </div>
  );
}

export default SubredditMenu;
