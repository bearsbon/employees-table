import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  filteredEmployees: [],
  filters: [],
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
  reducers: {
    filterEmployees(state, action) {
      if (action.payload) {
        state.filteredEmployees = state.employees;
        action.payload.forEach((item) => {
          const filtered = state.employees.filter((el) => el.companyId == item);
          state.filteredEmployees.concat(filtered);
        });
      } else {
        state.filteredEmployees = state.employees;
      }
    },
    addEmployee: (state, action) => {
      state.employees.push({
        ...action.payload,
        id: String(Math.random() + state.employees.length + 1),
      });
    },
    deleteEmployee: (state, action) => {
      action.payload.forEach((item) => {
        state.filteredEmployees = state.filteredEmployees.filter(
          (el) => el.id !== item
        );
        state.employees = state.employees.filter((el) => el.id !== item);
      });
    },
    setFilters: (state, action) => {
      state.filters = [...action.payload];
      if (state.filters.length === 0) {
        state.filteredEmployees = state.employees;
        return;
      }
      state.filteredEmployees = state.employees.filter((el) =>
        state.filters.includes(el.companyId)
      );
    },
    clearFilters: (state) => {
      state.filters = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.pending, (state) => {
      state.isLoading = true;
      state.employees = [];
    });
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees = action.payload;
      state.filteredEmployees = state.employees;
    });
    builder.addCase(fetchAllEmployees.rejected, (state) => {
      state.isLoading = false;
      state.employees = [];
      state.error = "Ошибка при попытке получить всех сотрудников";
    });
  },
});

export const {
  filterEmployees,
  addEmployee,
  deleteEmployee,
  setFilters,
  clearFilters,
} = employeeSlice.actions;
export default employeeSlice.reducer;
