import itemsData from '../data/products.json';


const initialState = {
    counter: 0,
    itemsData: itemsData,
    cart: {},
}

const reducer = (state = initialState, action) => {
    if (action.type === 'INCREMENT') {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if (action.type === 'ITEM_INCREASE') {
        console.log(action.item.title);
        console.log(state);
        console.log(itemsData.findIndex(result => result.title === action.item.title));
        const indexFound = state.itemsData.findIndex(result => result.title === action.item.title);
        let newArray = [...state.itemsData];
        newArray[indexFound] = { ...newArray[indexFound], quantity: newArray[indexFound].quantity + 1 };
        return {
            ...state,
            itemsData: newArray,
            cart: { ...state.cart, [action.item.title]: newArray[indexFound] },
        }

    }
    if (action.type === 'ITEM_DECREASE') {
        console.log(action.item.title);
        console.log(state);
        console.log(itemsData.findIndex(result => result.title === action.item.title));
        const indexFound = state.itemsData.findIndex(result => result.title === action.item.title);
        let newArray = [...state.itemsData];
        newArray[indexFound] = { ...newArray[indexFound], quantity: newArray[indexFound].quantity - 1 };
        return {
            ...state,
            itemsData: newArray,
            cart: { ...state.cart, [action.item.title]: newArray[indexFound] },
        }
    }
    return state;
};

export default reducer;
