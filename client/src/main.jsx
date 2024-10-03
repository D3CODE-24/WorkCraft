import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
//store
import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import {Toaster} from './components/ui/sonner'
// store to persit
const persistedStore = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <PersistGate loading={<div>Loading...</div>} persistor={persistedStore}>
          <App />
          <Toaster/>
        </PersistGate>
      </Router>
    </React.StrictMode>
  </Provider>
);
