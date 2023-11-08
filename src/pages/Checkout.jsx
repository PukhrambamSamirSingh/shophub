import { useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import { INITIAL_STATE, addressReducer } from "../reducer/addressReducer"
import { apiRequests } from "../utils/apiRequests"

const Checkout = () => {
    const [state, dispatch] = useReducer(addressReducer, INITIAL_STATE)
    const [address, setAddress] = useState(null)
    const [proceeding, setProceeding] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const getAddress = async () => {
                const res = await apiRequests.get("/address/get")
                setAddress(res.data)
            }
            getAddress()
        } catch (error) {
            throw new Error(error)
        }
    }, [])

    useEffect(() => {
        if (address) {
            dispatch({
                type: "CHANGE_INPUT",
                payload: {
                    name: "state",
                    value: address.state
                }
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: {
                    name: "street",
                    value: address.street
                }
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: {
                    name: "city",
                    value: address.city
                }
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: {
                    name: "country",
                    value: address.country
                }
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: {
                    name: "pinCode",
                    value: address.pinCode
                }
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: {
                    name: "houseNumber",
                    value: address.houseNumber
                }
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: {
                    name: "phone",
                    value: address.phone
                }
            })
        }
    }, [address])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setProceeding(true)
        try {
            const res = await apiRequests.post("/address/create", {
                ...state
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: res.data
            })
            if (res.status === 200) {
                navigate("/confirm")
            }
            setProceeding(false)
        } catch (error) {
            setProceeding(false)
            throw new Error(error)
        }
    }

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value }
        })
    }


    return (
        <div className="w-full flex flex-col justify-center gap-6 pb-6"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <div className="pt-4 flex gap-2 font-bold text-3xl lg:text-4xl">
                <h1>Delivery</h1>
                <h1 className="text-orange-500">Details</h1>
            </div>
            <form className="grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="phone">Phone Number</label>
                    <input name="phone" id="phone" value={state.phone} className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Your number here" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="city">Town/City</label>
                    <input name="city" id="city" value={state.city} className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Enter your city" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="pinCode">Pincode</label>
                    <input name="pinCode" id="pinCode" value={state.pinCode} className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Your pincode here" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="houseNumber">House Number</label>
                    <input name="houseNumber" id="houseNumber" value={state.houseNumber} className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="number" placeholder="Your house number here" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="street">Area, Street, Sector Or Village</label>
                    <input name="street" id="street" value={state.street} className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Enter your street or others" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="country">Country</label>
                    <select className="p-2 border outline-none border-gray-500 rounded-xl bg-transparent" name="country" id="country" value={state.country} onChange={handleChange}>
                        <option className="text-black" value="">Select a country</option>
                        <option className="text-black" value={"India"}>India</option>
                        <option className="text-black" value={"USA"}>USA</option>
                        <option className="text-black" value={"Bangladesh"}>Bangladesh</option>
                        <option className="text-black" value={"Indonesia"}>Indonesia</option>
                        <option className="text-black" value={"Singapore"}>Singapore</option>
                        <option className="text-black" value={"Taiwan"}>Taiwan</option>
                        <option className="text-black" value={"SriLanka"}>SriLanka</option>
                        <option className="text-black" value={"China"}>China</option>
                        <option className="text-black" value={"SouthKorea"}>SouthKorea</option>
                        <option className="text-black" value={"NorthKorea"}>NorthKorea</option>
                        <option className="text-black" value={"Japan"}>Japan</option>
                        <option className="text-black" value={"Australia"}>Auatralia</option>
                        <option className="text-black" value={"Dubai"}>Dubai</option>
                        <option className="text-black" value={"Germany"}>Germany</option>
                        <option className="text-black" value={"Russia"}>Russia</option>
                        <option className="text-black" value={"London"}>London</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="state">State</label>
                    <input name="state" id="state" value={state.state} className="outline-none border border-gray-500 rounded-xl p-2 bg-transparent" type="text" placeholder="Enter your state name" onChange={handleChange} />
                </div>
                <div className="w-full md:w-1/2 mt-1">
                    <button className="bg-orange-500 px-6 py-2 text-white flex justify-center items-center rounded-md">{proceeding ? <img className="w-6 h-6 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" /> : "Proceed"}</button>
                </div>
            </form>
        </div>
    )
}

export default Checkout
