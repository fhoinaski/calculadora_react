import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={appRouter}/>
)
