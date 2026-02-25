import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AppRoutes.jsx"
import { Provider } from "react-redux"
import { store } from "./redux/app/store.js"

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} future={{
        v7_startTransition: true,
      }} />
    </Provider>
  )
}

export default App
