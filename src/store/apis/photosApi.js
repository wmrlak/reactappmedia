import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker";


const photosApi = createApi({

    reducerPath: 'photos',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),

    endpoints(builder) {
        return {

            //Creates a GET request of the form
            //http://localhost:3005/photos?albumIdId=album.id to get all the photos for an album. ?albumIdId=album.id
            //is the query string
            fetchPhotos: builder.query({

                providesTags: (result, error, album) => {
                    const tags = result.map(photo => {
                        return {type: 'Photo', id: photo.id};
                    });
                    tags.push({type: 'AlbumPhoto', id: album.id});
                    return tags;
                },

                query: (album) => {
                    return {
                        url: '/photos',
                        params: {albumId: album.id}, //query string
                        method: 'GET'
                    };
                }
            }),

            addPhoto: builder.mutation({

                invalidatesTags: (result, error, album) => {
                    return [{type: 'AlbumPhoto', id: album.id}];
                },

                query: (album) => {
                    return {
                        url: '/photos',
                        body: {albumId: album.id, url: faker.image.abstract(150, 150, true)}, //true for taking back a random photo
                        method: 'POST'
                    };
                }
            }),

            removePhoto: builder.mutation({

                invalidatesTags: (result, error, photo) => {
                    return [{type: 'Photo', id: photo.id}];
                },

                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE'
                    };
                }
            })
        };
    }
});

export const {useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation} = photosApi;
export {photosApi};