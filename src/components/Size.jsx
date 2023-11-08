import PropTypes from "prop-types"

const Size = ({ sizes, selectSize, setSelectSize }) => {
    const handleSelectSize = (size) => {
        setSelectSize(size)
    }

    return (
        <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
                <button className={selectSize === size ? "border-2 w-20 h-10 rounded-lg border-gray-600 bg-orange-500" : "border w-20 h-10 rounded-lg border-gray-500"} key={size} onClick={() => handleSelectSize(size)}>{size}</button>
            ))}
        </div>
    )
}

export default Size
Size.propTypes = {
    sizes: PropTypes.array.isRequired,
    selectSize: PropTypes.number,
    setSelectSize: PropTypes.func.isRequired
}
