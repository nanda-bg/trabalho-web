import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { watchUserSagas } from "./sagas/UserSaga";
import { watchLoginSagas } from "./sagas/LoginSaga";
import { watchSignUpSagas } from "./sagas/SignUpSaga";
import { watchAuthSagas } from "./sagas/AuthSaga";
import { watchBooksSagas } from "./sagas/BooksSaga";
import { watchReadingListSagas } from "./sagas/ReadingListSaga";
import { watchReviewsSagas } from "./sagas/ReviewsSaga";
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
import storageSession from "redux-persist/lib/storage/session";
import { watchBookDetailsSagas } from "./sagas/BookDetailsSaga";
import { watchBooksByGenreSagas } from "./sagas/BookByGenreSaga";
import { watchReviewsByUserSagas } from "./sagas/ReviewsByUserSaga";
import { appReducer } from "./rootReducer";
import { watchFavoriteBooksSagas } from "./sagas/FavoriteBooksSaga";
import { watchCreateBookSagas } from "./sagas/CreateBookSaga";
import { watchReviewsFeedSagas } from "./sagas/ReviewsFeedSaga";

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
    watchReviewsByUserSagas(),
    watchFavoriteBooksSagas(),
    watchReadingListSagas(),
    watchCreateBookSagas(),
    watchReviewsFeedSagas(),
  ]);
}

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, appReducer);

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
