import  { createSlice} from "@reduxjs/toolkit";

const userFormStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")) 
    : null;

const initialState = {
    user: userFormStorage,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout : (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { loginStart, loginSuccess, loginFail, logout } =
authSlice.actions;

export default authSlice.reducer;