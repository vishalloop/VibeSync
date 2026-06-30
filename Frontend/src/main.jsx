import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.jsx'
import store from './app/app.store.js'
import {Provider} from "react-redux"
import AuthInitializer from './features/auth/components/AuthInitializer.jsx'


createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
        <AuthInitializer>
            <App />
        </AuthInitializer>
    </Provider>
)
