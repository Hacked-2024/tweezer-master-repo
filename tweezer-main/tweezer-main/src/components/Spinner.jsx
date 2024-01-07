import "./Spinner.css"

const Spinner = ({ isLoading }) => {
    var visibility
    if (!isLoading) {
        visibility = "hidden"
    } else {
        visibility = "visible"
    }

    return (
        <div class="lds-ellipsis" style={{visibility: visibility}}><div></div><div></div><div></div><div></div></div>
    )
}

export default Spinner