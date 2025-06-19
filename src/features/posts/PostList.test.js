import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PostList from './PostList';

const mockStore = configureStore([]);

describe('PostList', () => {
  it('shows loading when isLoading is true', () => {
    const store = mockStore({
      posts: { posts: [], isLoading: true, error: null }
    });

    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('displays posts', () => {
    const store = mockStore({
      posts: {
        isLoading: false,
        error: null,
        posts: [
          { id: '1', title: 'Test Post', subreddit: 'test', ups: 100 }
        ]
      }
    });

    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );

    expect(screen.getByText(/Test Post/i)).toBeInTheDocument();
  });
});
