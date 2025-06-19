import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('HomePage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      posts: {
        posts: [],
        isLoading: false,
        error: null
      }
    });
  });

  it('renders search bar and filter buttons', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Search posts...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('r/popular')).toBeInTheDocument();
  });

  it('dispatches searchPosts when search is submitted', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(input, { target: { value: 'react' } });

    fireEvent.click(screen.getByText('Search'));

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
  });
});
