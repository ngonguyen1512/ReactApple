import authReducer from "./authReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import appReducer from './appReducer';
import menuReducer from './menuReducer';
import accountReducer from "./accountReducer";
import functionReducer from "./functionReducer";
import permissionReducer from "./permissionReducer";
import providerReducer from "./providerReducer"
import invoiceReducer from "./invoiceReducer";
import likeReducer from "./likeReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import transferReducer from "./transferReducer";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    product: productReducer,
    app: appReducer,
    menu: menuReducer,
    transfer: transferReducer,
    account: accountReducer,
    function: functionReducer,
    permission: permissionReducer,
    provider: providerReducer,
    invoice: invoiceReducer,
    like: likeReducer,
})

export default rootReducer;