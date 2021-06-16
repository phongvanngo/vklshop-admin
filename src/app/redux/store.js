import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/counterSlice";
import loadingReducer from "./loadingSlice";
import adminAuthReducer from "./adminAuthSlice";
import userAuthReducer from "./userAuthSlice";
import commonReducer from "./commonSlice";
import dialogReducer from "./dialogSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import variantReducer from "./variantSlice";
import cardTypeReducer from "./cardTypeSlice";
import shippingMethodReducer from "./shippingMethodSlice";
import discountCodeReducer from "./discountCodeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loading: loadingReducer,
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer,
    common: commonReducer,
    dialog: dialogReducer,

    category: categoryReducer,
    product: productReducer,
    variant: variantReducer,
    cardType: cardTypeReducer,
    shippingMethod: shippingMethodReducer,
    discountCode: discountCodeReducer,
  },
});
