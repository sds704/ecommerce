import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
console.log(initialState)


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        deleteFromCart(state, action) {
            return state.filter(item => item._id != action.payload._id);
        },
        incrementQuantity: (state, action) => {
            state = state.map(item => {
                if (item._id === action.payload) {
                    item.quantity++;
                }
                return item;
            });
        },
        decrementQuantity: (state, action) => {
            state = state.map(item => {
                if (item.quantity > 1) {
                    if (item._id === action.payload) {
                        item.quantity--;
                    }
                }
                return item;

            })
        },
        // updateSize: (state, action) => {
        //     const { id, size } = action.payload;
        //     const item = state.find(item => item.id === id);
        //     if (item) {
        //         item.size = size;
        //     }
            
        // },
        emptyCart(state) {
            localStorage.removeItem("cart")
            state = [];
            return state;
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, emptyCart, updateSize } = cartSlice.actions

export default cartSlice.reducer