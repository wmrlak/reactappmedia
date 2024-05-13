
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {faker} from '@faker-js/faker';  //allows randomly generated data

const addUser = createAsyncThunk('users/add', async () => {
    const response = await axios.post('http://localhost:3005/users', {

        //body of the request, use faker to create a random name
        //the id of the user is created automatically by JSON server (look at db.json file).
        name: faker.name.fullName(),
    });

    //whatever is returned here is the payload of a 'fulfilled' action object that is used in the reducer
    return response.data;
});

export {addUser};

