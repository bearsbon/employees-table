import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  isLoading: null,
  error: null,
};

export const fetchAllEmployees = createAsyncThunk(
  "api/fetchAllEmployees",
  async (params) => {
    try {
      const response = await fetch(
        "https://mocki.io/v1/0347c93c-76f0-4377-8f51-363017937f62",
        params
      );

      if (!response.ok) {
        throw new Error("Server error.");
      }

      const data = response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.pending, (state) => {
      state.isLoading = true;
      state.employees = [];
    });
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees = action.payload;
    });
    builder.addCase(fetchAllEmployees.rejected, (state) => {
      state.isLoading = false;
      state.employees = [];
      state.error = "Ошибка при попытке получить всех сотрудников";
    });
  },
});

export default employeeSlice.reducer;
