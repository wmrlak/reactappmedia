import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "../thunks/fetchUsers";

const usersSlice = createSlice(
    {
        name: 'users',
        initialState: {
            data: [],            //state for data
            isLoading: false,    //state for data loading
            error: null         //state for error message
        },
        reducers: {},
        extraReducers(builder) {
            //watch for additional action types
            builder.addCase(fetchUsers.pending, (state, action) => {
                state.isLoading = true;
            });
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            });
            builder.addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
        }
    });

export const usersReducer = usersSlice.reducer;