import React from 'react';
import { render, screen } from '@testing-library/react';
import PostDetails from './PostDetails';

const postMock = {
  title: 'Test Post',
  ups: 123,
  num_comments: 10,
  permalink: '/r/test/comments/1',
  preview: {
    images: [
      {
        source: {
          url: 'https://via.placeholder.com/150'
        }
      }
    ]
  }
};

describe('PostDetails', () => {
  it('renders post details correctly', async () => {
    render(<PostDetails post={postMock} onClose={() => {}} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });
});
