import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CommentList from '../features/comments/CommentList';
import './PostPage.css';

function PostPage() {
  const { subreddit, postId } = useParams();
  const location = useLocation();

  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!post);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!post) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const res = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
          const json = await res.json();
          const postData = json?.[0]?.data?.children?.[0]?.data;
          setPost(postData);
        } catch (err) {
          setError('Failed to load post.');
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [post, subreddit, postId]);

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!post) return <p className="status error">Post not found.</p>;

  return (
    <div className="post-container">
      <div className="post-card">
        <button onClick={() => window.history.back()} className="back-button">← Back</button>
        <h2>{post.title}</h2>

        {post.preview?.images?.[0]?.source?.url && (
          <img
            src={post.preview.images[0].source.url.replace(/&amp;/g, '&')}
            alt="Post visual"
          />
        )}

        <p className="post-meta">Posted in <strong>r/{subreddit}</strong></p>
        <p className="post-stats">👍 {post.ups} • 💬 {post.num_comments}</p>

        <CommentList permalink={post.permalink} />
      </div>
    </div>
  );
}

export default PostPage;