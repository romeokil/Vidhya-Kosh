import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    // active user eslie likhe taaki pata chale ki user,instructor,admin kon hai 
    initialState:{
        activeUser:null
    },
    reducers:{
        login:(state,action)=>{
            state.activeUser=action.payload;
        },
        logout:(state,action)=>{
            state.activeUser=null;
        },
        update:(state,action)=>{
            state.activeUser=action.payload;
        }
    }
})

export const {login,logout,update}=authSlice.actions;
export default authSlice.reducer;