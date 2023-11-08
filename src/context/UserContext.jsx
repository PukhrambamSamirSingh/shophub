import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { apiRequests } from "../utils/apiRequests"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(null)
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await apiRequests.get("/user/get")
                setUser(res.data)
            } catch (error) {
                console.log(error)
                setErr(error)
            }
        }
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, err }}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
}