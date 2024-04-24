import {combineReducers} from "redux";

import productReducer from "./slices/products/productSlice";
import orderReducer from "./slices/orders/orderSlice";
import userReducer from "./slices/users/userSlice";
import adminReducer from "./slices/admin/adminSlice";
import customerReducer from "./slices/customer/customerSlice";
import enquiryReducer from "./slices/enquiry/enquirySlice";
import subscriberReducer from "./slices/subscribers/subscriberSlice";
import promoCodeReducer from "./slices/promocodes/promocodeSlice";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
	product: productReducer,
	order: orderReducer,
	user: userReducer,
	admin: adminReducer,
	customer: customerReducer,
	enquiry: enquiryReducer,
	subscriber: subscriberReducer,
	promocode: promoCodeReducer,
});

export default rootReducer;
