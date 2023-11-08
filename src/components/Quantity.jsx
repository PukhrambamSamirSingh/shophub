import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import PropTypes from "prop-types"

const Quantity = ({ handleIncrement, handleDecrement, quantity }) => {
    return (
        <>
            <div className="flex items-center gap-2">
                <AiFillMinusCircle className="text-xl cursor-pointer" onClick={handleDecrement} />
                <span>{quantity}</span>
                <AiFillPlusCircle className="text-xl cursor-pointer" onClick={handleIncrement} />
            </div>
        </>
    )
}

export default Quantity
Quantity.propTypes = {
    handleIncrement: PropTypes.func,
    handleDecrement: PropTypes.func,
    quantity: PropTypes.number
}
