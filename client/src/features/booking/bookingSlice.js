import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProvider: null,
  bookingForm: {
    bookingDate: "",
    bookingTime: "",
    address: "",
    notes: "",
  },
  bookingId: null,
  amount: 0,
  paymentStatus: "pending",
  bookingStatus: "pending",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedProvider: (state, action) => {
      state.selectedProvider = action.payload;
      state.amount = action.payload?.price || 0;
    },

    setBookingForm: (state, action) => {
      state.bookingForm = {
        ...state.bookingForm,
        ...action.payload,
      };
    },

    setBookingId: (state, action) => {
      state.bookingId = action.payload;
    },

    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },

    setBookingStatus: (state, action) => {
      state.bookingStatus = action.payload;
    },

    clearBooking: (state) => {
      state.selectedProvider = null;
      state.bookingForm = {
        bookingDate: "",
        bookingTime: "",
        address: "",
        notes: "",
      };
      state.bookingId = null;
      state.amount = 0;
      state.paymentStatus = "pending";
      state.bookingStatus = "pending";
    },
  },
});

export const {
  setSelectedProvider,
  setBookingForm,
  setBookingId,
  setPaymentStatus,
  setBookingStatus,
  clearBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;