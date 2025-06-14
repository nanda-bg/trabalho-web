import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { watchUserSagas } from "./sagas/UserSaga";
import userSlice from "./slices/UserSlice";
import { watchLoginSagas } from "./sagas/LoginSaga";
import { watchSignUpSagas } from "./sagas/SignUpSaga";
import loginSlice from "./slices/LoginSlice";
import signUpSlice from "./slices/SignUpSlice";
import { watchAuthSagas } from "./sagas/AuthSaga";
import authSlice from "./slices/Auth";
import bookSlice from "./slices/BooksSlice";
import { combineReducers } from "redux";
import { watchBooksSagas } from "./sagas/BooksSaga";
import { watchReviewsSagas } from "./sagas/ReviewsSaga";
import reviewSlice from "./slices/ReviewsSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import bookDetailsSlice from "./slices/BookDetailsSlice";
import { watchBookDetailsSagas } from "./sagas/BookDetailsSaga";
import bookByGenreSlice from "./slices/BookByGenreSlice";
import { watchBooksByGenreSagas } from "./sagas/BookByGenreSaga";

function* rootSaga() {
  yield all([
    watchUserSagas(),
    watchLoginSagas(),
    watchSignUpSagas(),
    watchAuthSagas(),
    watchBooksSagas(),
    watchReviewsSagas(),
    watchBookDetailsSagas(),
    watchBooksByGenreSagas(),
  ]);
}

const persistConfig = {
  key: "root",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  loginSlice: loginSlice.reducer,
  signUpSlice: signUpSlice.reducer,
  authSlice: authSlice.reducer,
  bookSlice: bookSlice.reducer,
  reviewSlice: reviewSlice.reducer,
  bookDetailsSlice: bookDetailsSlice.reducer,
  bookByGenreSlice: bookByGenreSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
