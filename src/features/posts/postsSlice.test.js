import postsReducer, { fetchPostsBySubreddit } from './postsSlice';

describe('postsSlice reducer', () => {
  const initialState = {
    posts: [],
    isLoading: false,
    error: null
  };

  it('should handle initial state', () => {
    expect(postsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchPostsBySubreddit.pending', () => {
    const action = { type: fetchPostsBySubreddit.pending.type };
    const state = postsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchPostsBySubreddit.fulfilled', () => {
    const mockPosts = [{ id: '1', title: 'Hello' }];
    const action = { type: fetchPostsBySubreddit.fulfilled.type, payload: mockPosts };
    const state = postsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.posts).toEqual(mockPosts);
  });

  it('should handle fetchPostsBySubreddit.rejected', () => {
    const action = { type: fetchPostsBySubreddit.rejected.type, error: { message: 'Failed' } };
    const state = postsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Failed');
  });
});
