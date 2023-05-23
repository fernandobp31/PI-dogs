import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducer/index";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //esta linea es solo para conectar la extension redux devtools (recordar instalarla)

//Aquí cree mi global state store
const store= createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) //este es mi traductor
);

export default store;
