import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import Routess from './Routess'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <Routess />
    </Provider>
  </StrictMode>,
)
