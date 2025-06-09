import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { watchUserSagas } from "./sagas/UserSaga";
import userSlice from "./slices/UserSlice";
import { watchLoginSagas } from "./sagas/LoginSaga";
import { watchSignUpSagas } from "./sagas/SignUpSaga";
import loginSlice from "./slices/LoginSlice";
import signUpSlice from "./slices/SignUpSlice";
import { watchAuthSagas } from "./sagas/TokenSaga";
import authSlice from "./slices/Auth";
import bookSlice from "./slices/BooksSlice";
import { watchBooksSagas } from "./sagas/BooksSaga";
import { watchReviewsSagas } from "./sagas/ReviewsSaga";
import reviewSlice from "./slices/ReviewsSlice";

function* rootSaga() {
  yield all([
    watchUserSagas(),
    watchLoginSagas(),
    watchSignUpSagas(),
    watchAuthSagas(),
    watchBooksSagas(),
    watchReviewsSagas(),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    loginSlice: loginSlice.reducer,
    signUpSlice: signUpSlice.reducer,
    authSlice: authSlice.reducer,
    bookSlice: bookSlice.reducer,
    reviewSlice: reviewSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
