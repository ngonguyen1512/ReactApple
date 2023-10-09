import authReducer from "./authReducer";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import appReducer from './appReducer';
import menuReducer from './menuReducer';
import accountReducer from "./accountReducer";
import functionReducer from "./functionReducer";
import permissionReducer from "./permissionReducer";
import providerReducer from "./providerReducer"
import admitReducer from "./admitReducer";
import invoiceReducer from "./invoiceReducer";
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
    admit: admitReducer,
    invoice: invoiceReducer,
})

export default rootReducer;