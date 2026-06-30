import {createBrowserRouter} from "react-router"
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import Dashboard from "../features/dashboard/Pages/Dashboard"
import Protected from "../features/auth/components/Protected"

export const routes = createBrowserRouter([
    {
        path : "/register",
        element : <Register/>,
    },
    {
        path : "/login",
        element : <Login/>,
    },
    {
        path : "/",
        element : <Protected><Dashboard/></Protected>
    }
])