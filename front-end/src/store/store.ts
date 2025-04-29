import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { watchUserSagas } from "./sagas/UserSaga";
import userSlice from "./slices/UserSlice";
import { watchLoginSagas } from "./sagas/LoginSaga";
import { watchSignUpSagas } from "./sagas/SignUpSaga";
import loginSlice from "./slices/LoginSlice";
import signUpSlice from "./slices/SignUpSlice";

function* rootSaga() {
  yield all([watchUserSagas(), watchLoginSagas(), watchSignUpSagas()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    loginSlice: loginSlice.reducer,
    signUpSlice: signUpSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
