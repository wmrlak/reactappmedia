import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "../thunks/fetchUsers";
import {addUser} from "../thunks/addUser";
import {removeUser} from "../thunks/removeUser";

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

            //**actions types coming from fetchUsers thunk**/
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

            //**actions types coming from addUser thunk**/
            builder.addCase(addUser.pending, (state, action) => {
                state.isLoading = true;
            });
            builder.addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
            });
            builder.addCase(addUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });

            //**actions types coming from removeUser thunk**/
            builder.addCase(removeUser.pending, (state, action) => {
                state.isLoading = true;
            });
            builder.addCase(removeUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data.filter((user) => {
                   return user.id !== action.payload.id
                });
            });
            builder.addCase(removeUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
        }
    });

export const usersReducer = usersSlice.reducer;