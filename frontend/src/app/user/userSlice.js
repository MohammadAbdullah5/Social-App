import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const localUser = JSON.parse(localStorage.getItem('user'));

export const signin = createAsyncThunk('/auth/signin', async (user, thunkAPI) => {
  try {
    const res = await userService.signin(user);
    return res;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchUser = createAsyncThunk(
  'users/getUser',
  async ({userId}, thunkAPI) => {
    try {
      return await userService.read(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
        error.toString(); // Getting the error message
      return thunkAPI.rejectWithValue(message); // Returning the error message
    }
  }
);

export const signup = createAsyncThunk(
  '/api/users',
  async (user, thunkAPI) => {
    // user is the user data
    try {
      return await userService.create(user); // Calling the register function from authService.js
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
        error.toString(); // Getting the error message
      return thunkAPI.rejectWithValue(message); // Returning the error message
    }
  }
);


export const signout = createAsyncThunk(
  '/signout',
  async (user, thunkAPI) => {
    // user is the user data
    try {
      return await userService.signout(); // Calling the register function from authService.js
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
        error.toString(); // Getting the error message
      return thunkAPI.rejectWithValue(message); // Returning the error message
    }
  }
);

export const list = createAsyncThunk(
  'users/list',
  async (signal, thunkAPI) => {
    // user is the user data
    try {
      return await userService.list(signal); // Calling the register function from authService.js
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
        error.toString(); // Getting the error message
      return thunkAPI.rejectWithValue(message); // Returning the error message
    }
  }
);  

export const getPfPic = createAsyncThunk(
  'users/getPfPic',
  async ({pic}, thunkAPI) => {
    try {
      return await userService.getPfPic(pic);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
        error.toString(); // Getting the error message
      return thunkAPI.rejectWithValue(message); // Returning the error message
    }
  })

export const update = createAsyncThunk(
  'users/update',
  async ({ params, credentials, user }, thunkAPI) => {
    try {
      const res = await userService.update(params, credentials, user);
      return res;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
        error.toString(); // Getting the error message
      return thunkAPI.rejectWithValue(message); // Returning the error message
    }
  }
);

export const remove = createAsyncThunk('users/delete', async ({params, credentials}, thunkAPI) => {
  try {
    return await userService.remove(params, credentials);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


const initialState = {
  user: localUser ? localUser : null,
  loading: false,
  error: false,
  isSuccess: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.error = false;
      state.message = "";
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => { // 1 sign up
      state.loading = true;
    }).addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    }).addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    }).addCase(update.pending, (state) => { // 2 update
      state.loading = true;
      state.isSuccess = false;
    }).addCase(update.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
      state.isSuccess = true;
    }).addCase(update.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }).addCase(fetchUser.pending, (state) => { // 3. fetch user
      state.loading = true;
    }).addCase(fetchUser.fulfilled, (state, action) => {
      state.user.user.user = action.payload;
      state.loading = false;
      state.error = false;
    }).addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }).addCase(remove.fulfilled, (state) => { // 4. remove
      state.user = null;
      state.loading = false;
      state.error = false;
    }).addCase(remove.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }).addCase(remove.pending, (state) => {
      state.loading = true;
    }).addCase(signout.fulfilled, (state) => { // 5. signout
      state.user = null;
      state.loading = false;
      state.error = false;
    }).addCase(signout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }).addCase(signout.pending, (state) => {
      state.loading = true;
    }).addCase(signin.pending, (state) => { // 6. signin
      state.loading = true;
    }).addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    }).addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }).addCase(list.pending, (state) => { // 7. list
      state.loading = true;
    }).addCase(list.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = false;
    }).addCase(list.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }).addCase(getPfPic.fulfilled, (state, action) => { // 8. get profile picture
      state.user.user.profilePicture = action.payload;
      state.loading = false;
      state.error = false;
    })
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;