import { Link } from "react-router-dom"
import CartCard from "../components/CartCard"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/Loading"
import { getCartItemsAsync } from "../slices/cartSlice"

const Cart = () => {
    const { err } = useContext(UserContext)
    const { loading, items, error } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCartItemsAsync())
    }, [dispatch])
    if (err) {
        return (
            <div className="w-full flex flex-col gap-4 justify-center items-center" style={{
                height: "calc(100vh - 120px)"
            }}>
                <h1 className="text-xl xxs:text-3xl font-bold">{err.response.data}</h1>
                <img className="w-80 h-80 object-contain" src="https://www.aitag.in/skin/front/assets/img/bg/signin.png" alt="" />
                <h3 className="text-xl">
                    <Link className="underline text-blue-500" to="/login">
                        Sign In
                    </Link>
                    to access your cart items
                </h3>
            </div>
        )
    }

    if (loading) {
        return (
            <Loading />
        )
    }
    if (error) {
        return (
            <div className="w-full h-full flex flex-col gap-4 justify-center items-center" style={{
                height: "calc(100vh - 120px)"
            }}>
                <h1 className="text-xl xxs:text-3xl font-bold">{error}</h1>
                <img className="w-80 h-80 object-contain" src="https://www.aitag.in/skin/front/assets/img/bg/signin.png" alt="" />
                <h3 className="text-xl">
                    <Link className="underline text-blue-500" to="/login">
                        Sign In
                    </Link>
                    to access your cart items
                </h3>
            </div>
        )
    }
    const totalPrice = items && items?.reduce((prevVal, cartItem) => {
        return prevVal + (cartItem?.quantity * cartItem?.price)
    }, 0)

    return (
        <div className="w-full flex flex-col md:flex-row gap-8 md:pt-6 pb-6" style={{
            minHeight: "calc(100vh - 60px)"
        }}>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                {items.length === 0 && (
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold text-center">Your cart is empty!<br />Add some items to your cart</h1>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png" alt="" />
                    </div>
                )}
                {items && items.map((item => (
                    <CartCard key={item._id} item={item} />
                )))}
            </div>
            <div className="w-full md:w-1/2 flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">Total Price</h1>
                    <span className="font-semibold">${totalPrice}</span>
                </div>
                <div className="pt-6">
                    <Link className="px-6 py-2 rounded-md bg-orange-500 text-white" to="/checkout">Checkout</Link>
                </div>
            </div>
        </div>
    )
}

export default Cart
