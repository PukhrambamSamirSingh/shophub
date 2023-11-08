import { useContext, useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import Size from "../components/Size"
import Color from "../components/Color"
import { addToCartAsync } from "../slices/cartSlice"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { fetchItemsAsync } from "../slices/itemSlice"

const Shop = () => {
    const { user } = useContext(UserContext)
    const { items, loading } = useSelector(state => state.item)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectSize, setSelectSize] = useState(0)
    const [selectColor, setSelectColor] = useState("")
    const [selectImg, setSelectImg] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchItemsAsync())
    }, [dispatch])
    const navigate = useNavigate()
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

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? prevIndex : prevIndex + 1
        )
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? prevIndex : prevIndex - 1
        )
    }

    return (
        <div className="w-full h-full">
            <div className="w-full rounded-3xl">
                <div className="p-10 flex flex-col sm:flex-row gap-6 justify-between items-center bg-orange-500">
                    <span>Home / Product Details</span>
                    <h1>Product Details</h1>
                    <div className='flex items-center gap-2'>
                        <div className="w-12 h-12 flex justify-center items-center shadow-2xl rounded-full bg-white" onClick={handlePrevious}>
                            <IoIosArrowBack disabled={currentIndex === 0} className='text-gray-700 text-3xl cursor-pointer' />
                        </div>
                        <div className="w-12 h-12 flex justify-center items-center shadow-2xl rounded-full bg-white" onClick={handleNext}>
                            <IoIosArrowForward disabled={currentIndex === items.length - 1} className='text-gray-700 text-3xl cursor-pointer' />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center pt-6">
                    {loading ? <h1 className="text-xl font-semibold">Loading...</h1> : items && items.map((item, index) => (
                        <div key={item._id} className={`w-full md:w-3/5 lg:w-5/6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center xl:justify-between gap-6 ${index !== currentIndex ? 'hidden' : ''} shadow-2xl rounded-3xl p-4 relative dark:bg-gray-900 bg-orange-100`}>
                            <div className="flex flex-col justify-between gap-6">
                                <h1 className="text-3xl text-blue-800 font-semibold">{item.title}</h1>
                                <h3 className="text-blue-600">{item.desc}</h3>
                                <div className="flex flex-wrap justify-between gap-4">
                                    {item.images.map((image, i) => (
                                        <img className={selectImg === i ? "w-24 h-24 rounded-xl object-contain border-2 border-gray-700 p-2 cursor-pointer" : "w-24 h-24 rounded-xl object-contain p-2 border border-gray-500 cursor-pointer"} key={i} src={image} alt="" onClick={() => setSelectImg(i)} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center gap-10 items-center w-80 h-80 border-4 rounded-full border-orange-200 p-4 relative">
                                <img className="w-4/5 h-4/5 object-contain" src={item.images[selectImg]} alt="" />
                                <h3 className="text-2xl text-blue-800 absolute bottom-5">${item.price.toFixed(2)}</h3>
                            </div>
                            <div className="flex flex-col gap-6 justify-between font-bold">
                                <div>
                                    <h3>Reviews</h3>
                                    <span>{item.reviews}(60)</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3>Select Color:</h3>
                                    <Color colors={item.colors} selectColor={selectColor} setSelectColor={setSelectColor} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3>Select Size:</h3>
                                    <Size sizes={item.sizes} selectSize={selectSize} setSelectSize={setSelectSize} />
                                </div>
                                <div>
                                    <button disabled={!selectSize || !selectColor} onClick={() => handleCart({ userId: user?._id, itemId: item?._id, size: selectSize, color: selectColor, price: item.price })} className="px-12 py-3 border-2 border-gray-500 rounded-lg">Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Shop
