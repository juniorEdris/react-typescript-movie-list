import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface Count {
//     count: number;
// }

interface counterState  {
    count: number;
}
const initialState: counterState = {
    count: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      increment: (state, action:PayloadAction<number>) => {
          console.log({action});
        state.count += action.payload
      },
      decrement: (state, action:PayloadAction<number>) => {
          console.log({action});
        state.count -= action.payload
      },
      // Use the PayloadAction type to declare the contents of `action.payload`
      incrementByAmount: (state, action: PayloadAction<number>) => {
          console.log({action});
          
        state.count += action.payload
      }
    }
  })

  
export const { increment, decrement, incrementByAmount } = counterSlice.actions

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

export default store;

type RootState = ReturnType<typeof store.getState>;

export const selectCounter = (state:RootState) => state.counter.count