import { RxCross2 } from "react-icons/rx"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { decreaseQuantityAsync, deleteCartItemAsync, getCartItemsAsync, increaseQuantityAsync } from "../slices/cartSlice"
import Quantity from "./Quantity"
import { Link } from "react-router-dom"

const CartCard = ({ item }) => {
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteCartItemAsync(item?._id))
            .then(() => {
                dispatch(getCartItemsAsync())
            }).catch((error) => {
                console.log("Error in deleting item", error)
            })
    }
    const handleIncrement = () => {
        dispatch(increaseQuantityAsync(item._id))
            .then(() => {
                dispatch(getCartItemsAsync())
            }).catch((error) => {
                console.log("Error in increasing quantity", error)
            })
    }
    const handleDecrement = () => {
        dispatch(decreaseQuantityAsync(item._id))
            .then(() => {
                dispatch(getCartItemsAsync())
            }).catch((error) => {
                console.log("Error in decreasing quantity", error)
            })
    }
    return (
        <div className="flex flex-col xs:flex-row shadow-2xl p-2">
            <div className="w-full xs:w-1/3 h-32">
                <Link to={`/${item.itemId.title}`}>
                    {item.itemId.images && item.itemId.images.length > 0 && (
                        <img className="w-full h-full object-contain" src={item.itemId.images[0]} alt="" />
                    )}
                </Link>
            </div>
            <div className="w-full xs:w-2/3 p-2 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between">
                        <h3 className="font-semibold">{item?.itemId?.title}</h3>
                        <RxCross2 onClick={handleDelete} className="text-2xl cursor-pointer" />
                    </div>
                    <p className="text-sm text-gray-500">{item?.itemId?.desc?.substring(0, 55)}...</p>
                    <div className="flex gap-1">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">Size:</p>
                            <span>{item?.size},</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">Color:</p>
                            <span>{item?.color}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <h1 className="text-orange-500 font-bold text-xl">₹{item?.price}</h1>
                    <Quantity handleIncrement={handleIncrement} handleDecrement={handleDecrement} quantity={item.quantity} />
                </div>
            </div>
        </div>
    )
}

export default CartCard
CartCard.propTypes = {
    item: PropTypes.object.isRequired
}