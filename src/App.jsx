import "./App.css"
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Add from "./pages/Add";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { UserProvider } from "./context/UserContext";
import Checkout from "./pages/Checkout";
import Forgot from "./pages/Forgot";
import Blog from "./pages/Blog";
import Account from "./pages/Account";
import Contact from "./pages/Contact";

const queryClient = new QueryClient()

const App = () => {
    const Layout = () => {
        const [themeMode, setThemeMode] = useState("light")
        const darkTheme = () => {
            setThemeMode("dark")
        }
        const lightTheme = () => {
            setThemeMode("light")
        }
        useEffect(() => {
            document.querySelector("html").classList.remove("dark", "light")
            document.querySelector("html").classList.add(themeMode)
        }, [themeMode])

        return (
            <ThemeProvider value={{ darkTheme, lightTheme, themeMode }}>
                <UserProvider>
                    <div className="dark:bg-gray-800 dark:text-white bg-orange-100 w-full">
                        <QueryClientProvider client={queryClient}>
                            <Navbar />
                            <div className="w-full p-6" style={{
                                minHeight: "calc(100vh - 60px)"
                            }}>
                                <Outlet />
                            </div>
                            <Footer />
                        </QueryClientProvider>
                    </div>
                </UserProvider>
            </ThemeProvider>
        )
    }
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/shop",
                    element: <Shop />
                },
                {
                    path: "/add",
                    element: <Add />
                },
                {
                    path: "/cart",
                    element: <Cart />
                },
                {
                    path: "/checkout",
                    element: <Checkout />
                },
                {
                    path: "/blog",
                    element: <Blog />
                },
                {
                    path: "/account",
                    element: <Account />
                },
                {
                    path: "/contact",
                    element: <Contact />
                }
            ]
        },
        {
            path: "register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/forgot",
            element: <Forgot />
        }
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
