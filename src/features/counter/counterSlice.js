import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  value: 0,
  status: 'idle', // Estado de la petición (idle, loading, failed)
  error: null, // Para manejar errores
};

// Acción asincrónica para incrementar el contador de forma asincrónica
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    try {
      const response = await fetchCount(amount);
      return response.data || 0; // Aseguramos que siempre haya un valor
    } catch (error) {
      throw new Error('Failed to fetch count: ' + error.message); // Mejor manejo de errores
    }
  }
);

// Slice del contador
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload; // Para manejar los errores desde fuera del slice
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Limpiar cualquier error previo
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Guardar el mensaje de error en el estado
        console.error('Error fetching count:', action.error.message); // Depuración
      });
  },
});

// Acción para seleccionar el contador
export const { increment, decrement, incrementByAmount, setError } = counterSlice.actions;

// Selector para obtener el valor del contador
export const selectCount = (state) => state.counter.value;

// Lógica para incrementar solo si el valor actual es impar
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
