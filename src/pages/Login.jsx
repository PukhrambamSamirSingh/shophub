import { useReducer, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { INITIAL_STATE, loginReducer } from "../reducer/loginReducer"
import { apiRequests } from "../utils/apiRequests"

const Login = () => {
    const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE)
    const [signing, setSigning] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSigning(true)
        try {
            const res = await apiRequests.post("/auth/login", {
                ...state
            })
            dispatch({ type: "CHANGE_INPUT", payload: res.data })
            if (res.status === 200) {
                localStorage.setItem("User", JSON.stringify(res.data))
                navigate("/")
            }
            setSigning(false)
        } catch (error) {
            setSigning(false)
            dispatch({ type: "SET_ERROR", payload: { error: error.message } });
        }

    }
    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value }
        })
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center px-4 bg-orange-50">
            <div className="w-full sm:w-4/6 lg:w-3/6 xl:w-2/6 border flex flex-col gap-6 p-4">
                <h1 className="text-xl font-semibold">
                    Sign In to ShopHub
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
                        <div className="w-full flex justify-between">
                            <label htmlFor="password">PASSWORD</label>
                            <Link className="text-blue-500" to="/forgot">Forgot password?</Link>
                        </div>
                        <input className="outline-none border border-gray-500 rounded-md bg-transparent p-2" type="password" name="password" id="password" placeholder="Enter your password" onChange={handleChange} required />
                    </div>
                    <button className="bg-orange-500 p-2 text-white flex justify-center items-center rounded-md">{signing ? <img className="w-6 h-6 object-contain" src="https://i.gifer.com/ZZ5H.gif" alt="" /> : "Login"}</button>
                </form>
                <div className="flex gap-1">
                    <span>{"Don't"} have an Account?</span>
                    <Link to="/register" className="text-blue-500">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
