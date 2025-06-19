import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPostsBySubreddit = createAsyncThunk(
  'posts/fetchPostsBySubreddit',
  async (subreddit) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((child) => child.data);
  }
);

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async ({ subreddit, term }) => {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/search.json?q=${term}&restrict_sr=1`
    );
    const json = await response.json();
    return json.data.children.map((child) => child.data);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsBySubreddit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostsBySubreddit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsBySubreddit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(searchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;