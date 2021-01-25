import { CART_ADD_ITEM, CART_DROP_ITEM, CART_RESET } from '../constants/cartConstant';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find(cart => cart.product === item.product);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(cartItem =>
						cartItem.product === existItem.product ? item : cartItem
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CART_DROP_ITEM:
			return {
				cartItems: state.cartItems.filter(cartItem => cartItem.product !== action.payload),
			};
		case CART_RESET:
			return {
				cartItems: [],
			};

		default:
			return state;
	}
};
