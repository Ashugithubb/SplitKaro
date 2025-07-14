import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface userState{
    email:string,
}
const initialState :userState={
    email:"",
}
const UserSlice = createSlice({
    name:"Authuser",
    initialState,
    reducers:{
        setUser:(state,action : PayloadAction<userState>)=>{
            state.email=action.payload.email;
        }
    }
})
export const {setUser}  = UserSlice.actions;
export default UserSlice.reducer