import React, { useEffect, useState } from 'react';
import CommentList from '../comments/CommentList';
import './PostDetails.css';

function PostDetails({ post, onClose }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      const res = await fetch(`https://www.reddit.com${post.permalink}.json`);
      const json = await res.json();
      const commentData = json[1]?.data?.children.map((c) => c.data) || [];
      setComments(commentData);
      setLoading(false);
    };

    loadComments();
  }, [post]);

  return (
    <div className="post-modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">✖</button>
        <h2>{post.title}</h2>

        {post.preview?.images?.[0]?.source?.url && (
          <img
            src={post.preview.images[0].source.url.replace(/&amp;/g, '&')}
            alt=""
          />
        )}

        <p className="post-meta">👍 {post.ups} • 💬 {post.num_comments}</p>

        <h4>Comments</h4>
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length > 0 ? (
          <ul className="comment-list">
            {comments.map((c) => (
              <li key={c.id}>
                <strong>{c.author}</strong>: {c.body}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
