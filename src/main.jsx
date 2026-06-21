import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './componant/Home.jsx'
import About from './componant/About.jsx'
import Services from './componant/Services.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App></App>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/about",
          element: <About></About>,
        },
        {
          path: "/services",
          element: <Services></Services>,
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}></RouterProvider>
)
