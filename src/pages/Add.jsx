import { useContext, useReducer, useState } from "react"
import { apiRequests } from "../utils/apiRequests"
import upload from "../utils/upload"
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { initialState, itemReducer } from "../reducer/itemReducer"

const Add = () => {
    const { err } = useContext(UserContext)
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const [images, setImages] = useState([]);
    const [state, dispatch] = useReducer(itemReducer, initialState)
    const [loading, setLoading] = useState(false)
    if (err) {
        return (
            <div className="w-full h-full flex flex-col gap-4 justify-center items-center" style={{
                height: "calc(100vh - 120px)"
            }}>
                <h1 className="text-xl xxs:text-3xl font-bold">{err.response.data}</h1>
                <img className="w-80 h-80 object-contain" src="https://www.aitag.in/skin/front/assets/img/bg/signin.png" alt="" />
            </div>
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await apiRequests.post("/item/create", {
                ...state
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: res.data
            })
            if (res.status === 200) {
                navigate("/shop")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value }
        })
    }
    const handleUpload = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const images = await Promise.all(
                [...files].map(async file => {
                    const url = await upload(file)
                    return url
                })
            )
            dispatch({
                type: "SET_IMAGES",
                payload: { images }
            })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;

        // Display image previews
        const imagePreviews = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const imageUrl = URL.createObjectURL(file);
            imagePreviews.push(imageUrl);
        }

        setFiles(selectedFiles);
        setImages(imagePreviews);
    };

    const handleColor = (e) => {
        e.preventDefault()
        dispatch({
            type: "ADD_COLOR",
            payload: e.target[0].value
        })
        e.target[0].value = ""
    }
    const handleSize = (e) => {
        e.preventDefault()
        dispatch({
            type: "ADD_SIZE",
            payload: Number(e.target[0].value)
        })
        e.target[0].value = ""
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 pb-6">
            <div className="flex gap-2 font-bold text-3xl lg:text-4xl">
                <h1>Add</h1>
                <h1 className="text-orange-500">Item</h1>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="images">Add Images</label>
                        <input name="images" id="images" className="" type="file" multiple onChange={handleFileChange} />
                        <div className="flex flex-wrap gap-4">
                            {images.map((imageUrl, index) => (
                                <img className="w-48 h-28 object-cover" key={index} src={imageUrl} alt={`Image ${index}`} />
                            ))}
                        </div>
                        <button onClick={handleUpload} className="bg-orange-500 p-2 rounded-md">{loading ? "Uploading" : "Upload"}</button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title">Title</label>
                        <input name="title" id="title" className="p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item name" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="desc">Description</label>
                        <textarea cols="30" rows="6" name="desc" id="desc" className="p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item description" onChange={handleChange} />
                    </div>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="price">Price</label>
                        <input name="price" id="price" className="p-2 bg-transparent outline-none border rounded-md" type="number" placeholder="Enter item price" onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="colors">Add Colors</label>
                        <form onSubmit={handleColor} className="w-full flex gap-2">
                            <input name="colors" id="colors" className="w-4/6 p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item colors" />
                            <button type="submit" className="px-6 py-2 bg-orange-500 rounded-md">add</button>
                        </form>
                        <div className="flex gap-2">
                            {state?.colors?.map(color => (
                                <button key={color} className="bg-orange-500 rounded-md px-4 py-2 flex gap-2 items-center">
                                    {color}
                                    <RxCross2 className="text-xl" onClick={() =>
                                        dispatch({
                                            type: "REMOVE_COLOR",
                                            payload: color
                                        })
                                    } />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="sizes">Add Sizes</label>
                        <form onSubmit={handleSize} className="w-full flex gap-2">
                            <input name="sizes" id="sizes" className="w-4/6 p-2 bg-transparent outline-none border rounded-md" type="text" placeholder="Enter item sizes" />
                            <button type="submit" className="px-6 py-2 bg-orange-500 rounded-md">add</button>
                        </form>
                        <div className="flex gap-2">
                            {state?.sizes?.map(size => (
                                <button key={size} className="bg-orange-500 rounded-md px-4 py-2 flex gap-2 items-center">
                                    {size}
                                    <RxCross2 className="text-xl" onClick={() =>
                                        dispatch({
                                            type: "REMOVE_SIZE",
                                            payload: size
                                        })
                                    } />
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="bg-orange-500 p-2 text-white flex justify-center items-center rounded-md">{loading ? <img className="w-6 h-6 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" /> : "Create"}</button>
                </div>
            </div>
        </div>
    )
}

export default Add
