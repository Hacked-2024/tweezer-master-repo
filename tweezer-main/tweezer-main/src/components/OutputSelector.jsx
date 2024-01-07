import './OutputSelector.css'

const OutputSelector = ({ text, id, currentlyChecked, setCurrentlyChecked }) => {
    const handleCheckbox = () => {
        if (currentlyChecked.includes(text)) {
            setCurrentlyChecked(
                currentlyChecked.filter((elem) => {
                    return elem !== text
                })
            )
        }  else {
            setCurrentlyChecked([
                ...currentlyChecked,
                text
            ])
        }        
    }
    return (
        <>
            <div className="box">
                <input id={id} type="checkbox" onChange={handleCheckbox}/>
                <span className="check"></span>
                <label htmlFor={id}>{text}</label>
            </div>
        </>
    )
}

export default OutputSelector