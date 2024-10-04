import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features-mp/productSlice";
import userSlice from "./features-mp/userSlice";
import appApi from "./services-mp/appApi";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

const reducer = combineReducers({
    user: userSlice,
    products: productSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: [appApi.reducerPath], // Only exclude the API state if needed
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appApi.middleware),
});

export default store;
