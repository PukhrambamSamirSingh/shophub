import { useContext, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { UserContext } from "../context/UserContext"
import { apiRequests } from "../utils/apiRequests"
import { Link, useNavigate } from "react-router-dom"

const Account = () => {
    const { user, err } = useContext(UserContext)
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [desc, setDesc] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdating(true)
        try {
            const res = await apiRequests.put("/user/setdesc", { desc })
            setDesc(res.data)
            setUpdating(false)
        } catch (error) {
            setUpdating(false)
            throw new Error(error)
        }
    }
    if (err) {
        return (
            <div className="w-full h-full flex flex-col gap-4 justify-center items-center" style={{
                height: "calc(100vh - 120px)"
            }}>
                <h1 className="text-xl xxs:text-3xl font-bold">{err.response.data}</h1>
                <img className="w-80 h-80 object-contain" src="https://www.aitag.in/skin/front/assets/img/bg/signin.png" alt="" />
                <h3 className="text-xl">
                    <Link className="underline text-blue-500" to="/login">
                        Sign In
                    </Link>
                    to access your profile
                </h3>
            </div>
        )
    }
    const logout = async () => {
        try {
            const res = await apiRequests.post("/auth/logout")
            if (res.status === 200) {
                localStorage.removeItem("User")
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
            <div className="w-full sm:w-4/6">
                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2 font-bold text-3xl lg:text-4xl">
                        <h1>Welcome {user && user.name}</h1>
                    </div>
                </div>
                {user && (
                    <div className="w-full flex flex-col gap-6">
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-2xl">Joined On</h1>
                            <span>{new Date(user && user.createdAt).toDateString()}</span>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-2xl">Bio</h1>
                            {!user.desc ? (
                                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                    <textarea className="w-full bg-transparent outline-none p-2 border border-gray-500 rounded-md" name="desc" id="desc" placeholder="Write about yourself" cols="30" rows="6" onChange={(e) => setDesc(e.target.value)} />
                                    <button type="submit" className="bg-orange-500 px-4 py-2 rounded-lg max-w-max">
                                        {updating ? "Updating..." : "Update"}
                                    </button>
                                </form>
                            ) : (
                                <>
                                    {!toggle && (
                                        <div className="flex gap-2 items-end">
                                            <p>{user && user.desc}</p>
                                            <FaEdit className="text-3xl cursor-pointer" onClick={() => setToggle(true)} />
                                        </div>
                                    )}
                                    {toggle && (
                                        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                            <textarea className="w-full bg-transparent outline-none p-2 border border-gray-500 rounded-md" name="desc" id="desc" placeholder="Write about yourself" cols="30" rows="6" onChange={(e) => setDesc(e.target.value)} />
                                            <div className="flex justify-between">
                                                <button type="submit" className="bg-orange-500 px-4 py-2 rounded-lg max-w-max">
                                                    {updating ? "Updating..." : "Update"}
                                                </button>
                                                <RxCross2 className="text-2xl cursor-pointer" onClick={() => setToggle(false)} />
                                            </div>
                                        </form>
                                    )}
                                </>
                            )}
                            <div className="pt-2 w-full">
                                <button onClick={logout} className="w-full text-white p-2 border rounded-md bg-orange-500">Logout</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Account
