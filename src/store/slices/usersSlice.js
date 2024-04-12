import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "../thunks/fetchUsers";
import {addUser} from "../thunks/addUser";

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
        }
    });

export const usersReducer = usersSlice.reducer;