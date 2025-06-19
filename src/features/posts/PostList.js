import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostDetails from './PostDetails'; // new component
import './PostList.css';

function PostList() {
  const { posts, isLoading, error } = useSelector((state) => state.posts);
  const [selectedPost, setSelectedPost] = useState(null);

  if (isLoading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <>
      <div className="post-list">
        {posts.map((post) => (
          <div
            className="post-card"
            key={post.id}
            onClick={() => setSelectedPost(post)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{post.title}</h3>
            {post.preview?.images?.[0]?.source?.url && (
              <img
                src={post.preview.images[0].source.url.replace(/&amp;/g, '&')}
                alt=""
              />
            )}
            <p className="meta">r/{post.subreddit} • 👍 {post.ups}</p>
          </div>
        ))}
      </div>

      {selectedPost && (
        <PostDetails post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
}

export default PostList;
