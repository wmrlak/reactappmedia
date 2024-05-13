import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker";


//Only for DEVELOPMENT purposes:
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};


const albumsApi = createApi({

    //The API needs to store a ton of state related to data, request status, errors.
    //This creates a new slice in the store that contains all this data. the property in the
    //store (the key) is called 'albums' in this case.
    reducerPath: 'albums',

    //RTK Query uses fetch() to make HTTP requests and get the data, not axios,
    //fetchBaseQuery() function is a configuration function. It is used to make a pre-configured version of fetch.
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),

    //endPoints() tells RTK Query explicitly how we want to make the requests to get all the data.
    //A builder.query() is an operation to read data, a builder.mutation() is an operation
    //to mutate data on the JSON server. Builder can be used to create queries or mutations.
    endpoints(builder) {
        return {

            //Mutation to delete an album from the slice
            removeAlbum: builder.mutation({

                invalidatesTags: (result, error, album) => {
                    return [{type: 'Album', id: album.id}];
                },

                //creates a DELETE request of the form http://localhost:3005/albums/album.id
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    };
                }
            }),

            //Mutation to add a new album to the slice
            addAlbum: builder.mutation({

                invalidatesTags: (result, error, user) => {
                    return [{type: 'UsersAlbums', id: user.id}];
                },

                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    };
                }
            }),

            //Query to get the all the albums given a user id.
            //The provided tags are fine tuned to match user's id so we don't do fetch requests
            //for other users when data is required to be fetched for one user only.
            //The following endpoint is used to create a GET request of the form:
            //http://localhost:3005/albums?userId=user.id to get all the albums for a particular user.
            fetchAlbums: builder.query({

                //result has the data when we do the fetch operation (i.e. the whole list of albums), we can create tags based
                //on the album id and user id. These tags are used by other endpoints later on to perform tag invalidation
                //and re-do the fetch request for displaying up-to-date data on the screen. Here we provide tags for the
                //albums that get invalidated when an album is deleted (used in the removeAlbum mutation)
                // for a specific user and a tag that is invalidated when an album is created for a specific user (used in addAlbum mutation)
                providesTags: (result, error, user) => {
                    const tags = result.map(album => {
                        return {type: 'Album', id: album.id}
                    });

                    tags.push({type: 'UsersAlbums', id: user.id});
                    return tags;
                },

                query: (user) => {
                    return {
                        url: '/albums', //path of the request
                        params: {userId: user.id}, //query string of the request
                        method: 'GET',      //type of the HTTP method
                    };
                },
            })
        };
    }

});


export const {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} = albumsApi;
export {albumsApi};