import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import * as serviceWorker from './serviceWorker'

import './assets/scss/style.scss'
import config from './config'
import { persistor, store } from './redux'

const container = document.getElementById('root')
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

serviceWorker.unregister()
