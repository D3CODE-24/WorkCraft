import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import slices
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";
import productSlice from "./features-mp/productSlice";
import userSlice from "./features-mp/userSlice";
import appApi from "./services-mp/appApi";

// Combine reducers
const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice,
    user: userSlice,
    products: productSlice,
    [appApi.reducerPath]: appApi.reducer, // Include the appApi reducer
});

// Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [appApi.reducerPath], // Exclude API state from persistence if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(appApi.middleware), // Add appApi middleware
});

export default store;
export const persistor = persistStore(store);
