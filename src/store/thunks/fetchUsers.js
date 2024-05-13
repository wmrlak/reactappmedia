/**
 * Automatically dispatches actions to redux store during data loading.
 * Every one of these thunks provides an action type given the status of the http request
 * i.e. (fetchUsers.pending, fetchUsers.fulfilled, fetchUsers.rejected)
 */

import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');
    await pause(1000);
    return response.data;
});

//Only for DEVELOPMENT purposes:
const pause = (duration) => {
  return new Promise((resolve) => {
      setTimeout(resolve, duration);
  });
};

export {fetchUsers};
