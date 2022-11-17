import { applyMiddleware, createStore } from 'redux'

import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../../redux/reducer'
import sagas from '../../redux/saga'

// import sagas from './redux/saga';
// import rootReducer from './redux/reducer';

const loggerMiddleware = createLogger()

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware,loggerMiddleware))

sagaMiddleware.run(sagas)

export default store

