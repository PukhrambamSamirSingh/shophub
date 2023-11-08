import { LiaExpandArrowsAltSolid } from "react-icons/lia"
import { FaShoppingBag } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import { fetchItemsAsync } from "../slices/itemSlice"
import { addToCartAsync } from "../slices/cartSlice"
import { UserContext } from "../context/UserContext"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
    const { user, err } = useContext(UserContext)
    const { items, loading } = useSelector(state => state.item)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchItemsAsync())
    }, [dispatch])

    const handleCart = ({ userId, itemId, size, color, price }) => {
        dispatch(addToCartAsync({
            userId,
            itemId,
            size,
            color,
            price
        })).then(() => {
            navigate("/cart")
        }).catch((err) => {
            throw new Error(err)
        })
    }
    if (err) {
        return (
            <div className="w-full flex flex-col gap-4 justify-center items-center">
                <h1 className="text-xl">Test User(Email: johndoe@gmail.com, Password: JohnDoe)</h1>
                <h1 className="text-xl xxs:text-3xl font-bold">{err.response.data}</h1>
                <img className="w-80 h-80 object-contain" src="https://www.aitag.in/skin/front/assets/img/bg/signin.png" alt="" />
                <div className="text-2xl flex gap-1">
                    <h1></h1>
                    <Link className="underline text-blue-500" to="/login">
                        Sign In
                    </Link>
                    <h1>to access items</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            <div className="w-full rounded-3xl">
                <div className="w-full">
                    <div className="w-full flex justify-between p-10 bg-orange-500">
                        <span>Home / Shop</span>
                        <h1>Shop</h1>
                        <div>
                            Some Details
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center sm:px-10 xl:px-40 pt-4">
                        {loading ? <h1 className="text-xl font-semibold">Loading...</h1> : items && items.map((item) => (
                            <div key={item._id} className="w-full h-full dark:bg-gray-900 bg-orange-300 shadow-2xl p-4 flex flex-col items-center gap-6 rounded-3xl">
                                <div className="w-full flex justify-between">
                                    <Link to="/shop" className="w-10 h-10 flex justify-center items-center rounded-full border">
                                        <LiaExpandArrowsAltSolid className="text-xl" />
                                    </Link>
                                    <div className="w-10 flex justify-center items-center rounded-full border">
                                        <FaShoppingBag className="text-xl cursor-pointer" onClick={() => handleCart({ userId: user?._id, itemId: item?._id, size: item.sizes[0], color: item.colors[0], price: item.price })} />
                                    </div>
                                </div>
                                <div className="hidden sm:flex w-5/6 h-24 rounded-3xl dark:bg-gray-700 bg-orange-700 mb-20">
                                    <img className="mt-12 w-full h-full -rotate-45 object-contain sm:object-cover" src={item.images[0]} alt="" />
                                </div>
                                <div className="flex sm:hidden w-5/6 h-32 rounded-3xl dark:bg-gray-700 bg-orange-700 relative mb-28">
                                    <img className="mt-12 w-full h-40 -rotate-45 object-contain absolute top-0" src={item.images[0]} alt="" />
                                </div>
                                <div className="text-center flex flex-col gap-4 text-blue-800">
                                    <h2 className="text-2xl">{item.title}</h2>
                                    <h3 className="text-xl font-semibold">${item.price}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h1 className="text-center mt-10 mb-10 text-2xl font-bold">Related Poducts</h1>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center sm:px-10 xl:px-40 pt-4">
                        {loading ? <h1 className="text-xl font-semibold">Loading...</h1> : items && items.map((item) => (
                            <div key={item._id} className="w-full h-full dark:bg-gray-900 bg-orange-300 shadow-2xl p-4 flex flex-col items-center gap-6 rounded-3xl">
                                <div className="w-full flex justify-between">
                                    <Link to="/shop" className="w-10 h-10 flex justify-center items-center rounded-full border">
                                        <LiaExpandArrowsAltSolid className="text-xl" />
                                    </Link>
                                    <div className="w-10 flex justify-center items-center rounded-full border">
                                        <FaShoppingBag className="text-xl cursor-pointer" onClick={() => handleCart({ userId: user?._id, itemId: item?._id, size: item.sizes[0], color: item.colors[0], price: item.price })} />
                                    </div>
                                </div>
                                <div className="hidden sm:flex w-5/6 h-24 rounded-3xl dark:bg-gray-700 bg-orange-700 mb-20">
                                    <img className="mt-12 w-full h-full -rotate-45 object-contain sm:object-cover" src={item.images[0]} alt="" />
                                </div>
                                <div className="flex sm:hidden w-5/6 h-32 rounded-3xl dark:bg-gray-700 bg-orange-700 relative mb-28">
                                    <img className="mt-12 w-full h-40 -rotate-45 object-contain absolute top-0" src={item.images[0]} alt="" />
                                </div>
                                <div className="text-center flex flex-col gap-4 text-blue-800">
                                    <h2 className="text-2xl">{item.title}</h2>
                                    <h3 className="text-xl font-semibold">${item.price}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
