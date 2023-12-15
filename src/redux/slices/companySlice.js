import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  isLoading: null,
  error: null,
};

export const fetchAllCompanies = createAsyncThunk(
  "api/fetchAllCompanies",
  async (params) => {
    try {
      const response = await fetch(
        "https://mocki.io/v1/8d06291c-b1b7-454c-857b-71884fb0d0f0",
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

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.companies.push({
        ...action.payload,
        id: String(Math.random() + state.companies.length + 1),
      });
    },
    deleteCompany: (state, action) => {
      action.payload.forEach((item) => {
        state.companies = state.companies.filter((el) => el.id !== item);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCompanies.pending, (state) => {
      state.isLoading = true;
      state.companies = [];
    });
    builder.addCase(fetchAllCompanies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companies = action.payload;
    });
    builder.addCase(fetchAllCompanies.rejected, (state) => {
      state.isLoading = false;
      state.companies = [];
      state.error = "Ошибка при попытке получить все компании";
    });
  },
});

export const { addCompany, deleteCompany } = companySlice.actions;
export default companySlice.reducer;
