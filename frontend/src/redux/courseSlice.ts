import { createSlice } from "@reduxjs/toolkit";

const courseSlice=createSlice({
    name:'course',
    initialState:{
        allcourses:[],
        userenrolledcourses:[]
    },
    reducers:{
        setallcourses:(state,action)=>{
            state.allcourses=action.payload;
        },
        setuserenrolledcourses:(state,action)=>{
            state.userenrolledcourses=action.payload;
        }
    }
})

export const {setallcourses,setuserenrolledcourses}=courseSlice.actions;
export default courseSlice.reducer;