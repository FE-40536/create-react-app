import models from '@/models'
import history from '@/utils/history'
import {init} from '@rematch/core'
import 'lib-flexible'
import React from 'react'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import {routerMiddleware, routerReducer} from 'react-router-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import Navigator from './container/Navigator'
import './index.less'
import * as serviceWorker from './serviceWorker'

const middlewares = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
}

const store = init({
    models,
    redux: {
        reducers: {
            routing: routerReducer
        },
        middlewares
    }
})

document.documentElement.style.height = `${window.innerHeight}px`
const rootEl = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Navigator history={history} />
        </Router>
    </Provider>,
    rootEl
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
