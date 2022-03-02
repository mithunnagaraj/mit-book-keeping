import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    userToken: {},
    isSignedIn: false,
}
const userSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isSignedIn = true;
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
        },
        clearUser: (state,action) => {
            state.user = {};
        },
        setIsSignedIn(state,action) {
            state.isSignedIn = action.payload
        }
    }
})


export const {setUser, setUserToken, clearUser, setIsSignedIn} = userSlice.actions;

export default userSlice.reducer;