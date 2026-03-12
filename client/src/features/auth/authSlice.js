import  { createSlice} from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")) 
    : null;

const initialState = {
    user: userFromStorage,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;

            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },

        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout : (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { loginStart, loginSuccess, loginFail, logout } =
authSlice.actions;

export default authSlice.reducer;