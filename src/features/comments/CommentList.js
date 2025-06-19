import React, { useEffect, useState } from 'react';

function CommentList({ permalink }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.reddit.com${permalink}.json`)
      .then(res => res.json())
      .then(json => {
        const commentData = json[1].data.children.map(c => c.data);
        setComments(commentData);
        setLoading(false);
      });
  }, [permalink]);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>Comments</h4>
      {comments.map(comment => (
        <div key={comment.id} style={{ borderTop: '1px solid #ccc', padding: '0.5rem 0' }}>
          <p><strong>{comment.author}</strong>: {comment.body}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
