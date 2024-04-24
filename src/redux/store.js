import {configureStore} from "@reduxjs/toolkit";
import {useDispatch as useAppDispatch, useSelector as useAppSelector} from "react-redux";
import rootReducer from "./rootReducer";

// ----------------------------------------------------------------------

const store = configureStore({
	reducer: rootReducer,
	devTools: true,
});

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export {store, useSelector, useDispatch};
