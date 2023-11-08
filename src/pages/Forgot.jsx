import { useReducer, useState } from "react"
import { initialState, resetPassword } from "../reducer/resetPassword"
import { apiRequests } from "../utils/apiRequests"
import { useNavigate } from "react-router-dom"

const Forgot = () => {
    const [state, dispatch] = useReducer(resetPassword, initialState)
    const [resetting, setResetting] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setResetting(true)
        try {
            const res = await apiRequests.put("/user/updatepassword", {
                ...state
            })
            dispatch({
                type: "CHANGE_INPUT",
                payload: res.data
            })
            if (res.status === 200) {
                navigate("/login")
            }
            setResetting(false)
        } catch (error) {
            setResetting(false)
            dispatch({
                type: "SET_ERROR",
                payload: { error: error.message }
            })
        }
    }
    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value }
        })
    }
    return (
        <div className="w-screen h-screen flex justify-center bg-orange-50 items-center px-4">
            <div className="w-full sm:w-4/6 lg:w-3/6 xl:w-2/6 border flex flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">
                    Resetting Password for FoodVista
                </h1>
                <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                    {state.err && (
                        <span className="text-red-500 italic">{state.err}</span>
                    )}
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email">EMAIL</label>
                        <input className="outline-none border border-gray-500 rounded-md bg-transparent p-2" type="email" name="email" id="email" placeholder="Enter your email" onChange={handleChange} required />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <label htmlFor="password">RESET PASSWORD</label>
                        <input className="outline-none border border-gray-500 rounded-md bg-transparent p-2" type="password" name="password" id="password" placeholder="Enter strong password" onChange={handleChange} required minLength={6} />
                    </div>
                    <button className="bg-orange-500 p-2 text-white flex justify-center items-center rounded-md">{resetting ? <img className="w-6 h-6 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" /> : "Reset"}</button>
                </form>
            </div>
        </div>
    )
}

export default Forgot
