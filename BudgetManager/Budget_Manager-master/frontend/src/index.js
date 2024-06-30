import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { Global_style } from './styles/global_style'
import { GlobalProvider } from './context/globalContext';

const root =  ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Global_style/>
        <GlobalProvider>
            <App/>
        </GlobalProvider>        
    </React.StrictMode>
)