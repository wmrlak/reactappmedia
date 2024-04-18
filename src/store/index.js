
import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {usersReducer} from "./slices/usersSlice";
import {albumsApi} from "./apis/albumsApi";

/**
 * Data organization in redux store:
 * In this app, we are storing the data in normalized form. I.e. data are stored in individual arrays and connections
 * are made using primary keys. There is no array of big nested objects (denormalized form). The same normalized form
 * will be followed in the JSON server side.
 *
 * Options for Data fetching in Redux Toolkit:
 *
 * (A) Async Thunk Functions (This will be used to handle users' data).
 *
 * (B) Redux Toolkit Query (RTK Query) (This will be used to handle albums and photo data).
 */
export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer //look up the value of albumsApi.reducerPath key, here we declare the combined reducers
    },

    //This is a required part of the set-up process
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
    }
});

//this is used only to inspect the store. You will notice that RTKQ keeps track of the
//queries that have been made for the albums slice. Use store.getState() to inspect the store.
//The following is needed only for DEBUG
window.store = store;

//this is one time set-up to register listeners
setupListeners(store.dispatch);


//We use the store as our *CENTRAL* exporting point for everything
//related to redux (actions, async thunks, store, hooks provided by RTK Query)
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export {useFetchAlbumsQuery, useAddAlbumMutation} from './apis/albumsApi';