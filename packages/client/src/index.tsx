import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import * as serviceWorker from './serviceWorker'

import './assets/scss/style.scss'
import config from './config'
import { persistor, store } from './redux'
import React from 'react'

const container = document.getElementById('root')
if (container) {
    const root = createRoot(container)
    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter basename={config.basename}>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
} else {
    console.error('Root element with id "root" not found.')
}
serviceWorker.unregister()
