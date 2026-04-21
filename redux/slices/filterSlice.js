import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'All', // 'All', 'Todo', 'In Progress', 'Done'
  priority: 'All', // 'All', 'High', 'Medium', 'Low'
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.priority = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.status = 'All';
      state.priority = 'All';
      state.searchQuery = '';
    },
  },
});

export const { setStatusFilter, setPriorityFilter, setSearchQuery, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
