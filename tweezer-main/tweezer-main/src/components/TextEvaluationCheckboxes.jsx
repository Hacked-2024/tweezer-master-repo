import OutputSelector from "./OutputSelector"

import "./TextEvaluationCheckboxes.css"

const TextEvaluationCheckboxes = ({ currentlyChecked, setCurrentlyChecked}) => {
    return (
        <div id="evaluation-checkbox-container">
            <h2>Scan for:</h2>
            <div className="evaluation-checkbox-row">
                <OutputSelector setCurrentlyChecked={setCurrentlyChecked} currentlyChecked={currentlyChecked} text={"Harassment"} id={"1"}/>
                <OutputSelector setCurrentlyChecked={setCurrentlyChecked} currentlyChecked={currentlyChecked} text={"Self Harm"} id={"2"}/>
                <OutputSelector setCurrentlyChecked={setCurrentlyChecked} currentlyChecked={currentlyChecked} text={"Hate"} id={"3"}/>
                <OutputSelector setCurrentlyChecked={setCurrentlyChecked} currentlyChecked={currentlyChecked} text={"Sexual Content"} id={"4"}/>
            </div>
            <div className="evaluation-checkbox-row">
                <OutputSelector setCurrentlyChecked={setCurrentlyChecked} currentlyChecked={currentlyChecked} text={"Violence"} id={"5"}/>
                <OutputSelector setCurrentlyChecked={setCurrentlyChecked} currentlyChecked={currentlyChecked} text={"Misinformation"} id={"6"}/>
                <OutputSelector setCurrentlyChecked={setCurrentlyChecked} currentlyChecked={currentlyChecked} text={"Offensiveness"} id={"7"}/>
            </div>
            
        </div>
    )
}

export default TextEvaluationCheckboxes