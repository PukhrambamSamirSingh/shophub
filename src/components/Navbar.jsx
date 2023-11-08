import { SiShopee } from "react-icons/si"
import { FaShoppingBag } from "react-icons/fa"
import { GiHamburgerMenu } from "react-icons/gi"
import { Link } from "react-router-dom"
import { GiCrossedSabres } from "react-icons/gi"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import Theme from "./Theme"

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const { user } = useContext(UserContext)

    return (
        <div className="w-full p-6 flex justify-between items-center z-50">
            <Link to="/" className="flex gap-2 items-center">
                <div className="w-12 h-12 flex justify-center items-center text-white rounded-full bg-black">
                    <SiShopee className="text-xl" />
                </div>
                <h2 className="font-bold text-xl">Shophub</h2>
            </Link>
            <ul className="hidden lg:flex justify-between items-center gap-6">
                <li className="text-xl font-semibold">
                    <Link to="/">Home</Link>
                </li>
                <li className="text-xl font-semibold">
                    <Link to="/shop">Shop</Link>
                </li>
                <li className="text-xl font-semibold">
                    <Link to="/blog">Blog</Link>
                </li>
                <li className="text-xl font-semibold">
                    <Link to="/contact">Contact</Link>
                </li>
                <li className="text-xl font-semibold">
                    <Link to="/login">Login</Link>
                </li>
                <li className="text-xl font-semibold">
                    <Link to="/register">SignUp</Link>
                </li>
                {user && (
                    <li className="text-xl font-semibold">
                        <Link to="/account">My Account</Link>
                    </li>
                )}
                {user?.isAdmin && (
                    <li className="text-xl font-semibold">
                        <Link to="/add">Add Item</Link>
                    </li>
                )}
            </ul>
            <div className="flex gap-2">
                <Theme />
                <Link to="/cart">
                    <FaShoppingBag className="text-xl" />
                </Link>
            </div>
            <div className="relative block lg:hidden">
                <GiHamburgerMenu onClick={() => setToggle(true)} />
                {toggle && (
                    <div className="w-full fixed top-0 bg-gray-900/50 right-0 animate__animated animate__bounceInRight flex justify-between h-screen z-10">
                        <div className="p-2">
                            <GiCrossedSabres onClick={() => setToggle(false)} />
                        </div>
                        <div className="bg-orange-500 w-2/3 h-full flex justify-center items-center text-center">
                            <ul className="flex flex-col justify-between items-center gap-6">
                                <li className="text-xl font-semibold">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="text-xl font-semibold">
                                    <Link to="/shop">Shop</Link>
                                </li>
                                <li className="text-xl font-semibold">
                                    <Link to="/blog">Blog</Link>
                                </li>
                                <li className="text-xl font-semibold">
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li className="text-xl font-semibold">
                                    <Link to="/login">Login</Link>
                                </li>
                                {user?.isAdmin && (
                                    <li className="text-xl font-semibold">
                                        <Link to="/add">Add Item</Link>
                                    </li>
                                )}
                                <li className="text-xl font-semibold">
                                    <Link to="/register">SignUp</Link>
                                </li>
                                <li className="text-xl font-semibold">
                                    <Link to="/account">My Account</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
