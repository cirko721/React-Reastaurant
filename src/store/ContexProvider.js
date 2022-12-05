import {useReducer} from "react"
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  itemsAmount: 0,
};
const cartReducer = (state, action) => {
  if(action.type === "ADD") {
    const updatedItemsAmount = state.itemsAmount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingItem = state.items[existingItemIndex];

    let updatedItems;

    if(existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      itemsAmount: updatedItemsAmount,
    }
  }

  if(action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const updatedItemsAmount = state.itemsAmount - existingItem.price;
    let updatedItems;

    if(existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updateItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updateItem;
    }
    return {
      items: updatedItems,
      itemsAmount: updatedItemsAmount,
    }
  }
  return defaultCartState
};

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState)

  const addItemHandler = (item) => {
    dispatchAction({type: "ADD", item: item})
  };

  const removeItemHandler = (id) => {
    dispatchAction({type: "REMOVE", id: id})
  };
  const cartContext = {
    items: cartState.items,
    itemsAmount: cartState.itemsAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
