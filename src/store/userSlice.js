import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        id: "",
        token: "",
        email: "",
        fullName: "",
        phoneNO: "",
        userType: "",
        isAdmin:""
    },
    reducers: {
        login: (state, action)=>{
            state.loggedIn = true
            state.id = action.payload.id
            state.token = action.payload.token
            state.userType = action.payload.userType
            state.isAdmin = action.payload.isAdmin
        },
        signup: (state) =>{
            state.loggedIn= false
            state.id = ""
        },
        logout: (state) =>{
            state.loggedIn= false
            state.id= ""
            state.token= ""
            state.email= ""
            state.fullName= ""
            state.phoneNO= ""
            state.userType= ""
            localStorage.clear()
            sessionStorage.clear()
        },
        creator: (state, action)=>{
            state.isCreator = action.payload.isCreator
        }
    }   
})

export const userActions = userSlice.actions;
export default userSlice.reducer;