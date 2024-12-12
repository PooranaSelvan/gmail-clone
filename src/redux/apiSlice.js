import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
     name: "apiSlice",
     initialState: {
          open:false,
          emails:null
     },
     reducers:{
          setOpen:(state, action) => {
               state.open = action.payload;
          },
          setEmails:(state, action) => {
               // console.log("Action Payload (Emails):", action.payload);
               state.emails = action.payload;
          },
          setSelectedEmail:(state, action) => {
               state.setSelectedEmail = action.payload;
          },
          setSearchText:(state, action) => {
               state.searchText = action.payload;
          },
          setAuthUser:(state, action) => {
               state.authUser = action.payload;
          }
     }
});

export const { setOpen, setEmails, setSearchText, setSelectedEmail, setAuthUser } = apiSlice.actions;

export default apiSlice;