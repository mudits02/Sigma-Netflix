import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
     name: "user",
     initialState: null,
     reducers: {
        addUser: (state , action) => {
            return action.payload; //This basically fills the state
        }, 

        removeUser: (state , payload) => {
            return null;
        }
     }
})

export const {addUser , removeUser} = userSlice.actions;

export default userSlice.reducer;
