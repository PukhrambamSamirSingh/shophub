import PropTypes from 'prop-types'

const Color = ({ colors, selectColor, setSelectColor }) => {
    const handleSelectColor = (color) => {
        setSelectColor(color)
    }

    return (
        <div className="flex items-center gap-2">
            {colors.map(color => (
                <button className={selectColor === color ? "w-7 h-7 rounded-full border-2 border-gray-600" : "w-6 h-6 rounded-full"} onClick={() => handleSelectColor(color)} key={color} style={{ backgroundColor: `${color}` }}>
                </button>
            ))}
        </div>
    )
}

export default Color
Color.propTypes = {
    colors: PropTypes.array.isRequired,
    selectColor: PropTypes.string,
    setSelectColor: PropTypes.func.isRequired
}
