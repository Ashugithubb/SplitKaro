import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface userState{
    email:string,
    isVerified:boolean
}
const initialState :userState={
    email:"",
    isVerified:false
}
const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action : PayloadAction<userState>)=>{
            state.email=action.payload.email;
            state.isVerified=action.payload.isVerified;
        }
    }
})
export const {setUser}  = UserSlice.actions;
export default UserSlice.reducer