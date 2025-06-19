import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsBySubreddit, searchPosts } from '../features/posts/postsSlice';
import PostList from '../features/posts/PostList';
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const [selectedSubreddit, setSelectedSubreddit] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsBySubreddit(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
    dispatch(searchPosts({ subreddit: selectedSubreddit, term: searchTerm }));
  };

  return (
    
    <div className="home-page">
      <header className="app-header">
      <img src="/logo.png" alt="Libreddit Lite" className="logo-image" />

  <h1 className="logo-text">Libreddit Lite</h1>
</header>
    <div className="search-filter-wrapper">
  <form className="search-bar" onSubmit={handleSearch}>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search posts..."
    />
    <button type="submit">Search</button>
  </form>

  <div className="filter-buttons">
    {['popular', 'news', 'gaming', 'funny', 'technology'].map((sub) => (
      <button
        key={sub}
        onClick={() => {
          setSelectedSubreddit(sub);
          setSearchTerm('');
        }}
        className={selectedSubreddit === sub ? 'active' : ''}
      >
        r/{sub}
      </button>
    ))}
  </div>
</div>


      <PostList posts={posts} />
    </div>
  );
}

export default HomePage;