import React,{useReducer} from 'react'
import { act } from 'react-dom/test-utils';
import CartContext from './cart-context'


const defaultCartState={
    items:[],
    totalAmount:0
};

const reducer=(state,action)=>{
    if (action.type === 'ADD') {
        const updatedTotalAmount =
          state.totalAmount + action.item.price * action.item.amount;
    
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
    
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(action.item);
        }
    
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }

    if(action.type==='REMOVE'){
    
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
          );
          const existingItem = state.items[existingCartItemIndex];
          const updatedTotalAmount = state.totalAmount - existingItem.price;
          let updatedItems;
          if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
          } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
          }
      
          return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
}


const CartProvider = (props) => {

    const [state,dispatch]=useReducer(reducer,defaultCartState)

    const addItemCartHandler = (item) => {
        dispatch({type:'ADD',item:item})
    }

    const removeItemCartHandler = (id) => {
        dispatch({type:'REMOVE',id:id})
    }

    const cartContext = {
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemCartHandler,
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider