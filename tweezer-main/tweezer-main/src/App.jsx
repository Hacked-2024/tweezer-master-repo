import './App.css'

import ImageUploadForm from './components/ImageUploadForm'
import APIOutput from './components/APIOutput'
import TextEvaluationCheckboxes from './components/TextEvaluationCheckboxes';
import Spinner from './components/Spinner';

import { useState } from "react";

const App = () => {
  const [currentlyChecked, setCurrentlyChecked] = useState([])
  const [formattedJsonString, setFormattedJsonString] = useState(null);
  const [formattedImageJsonString, setFormattedImageJsonString] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="parent-container">
      <h1>Tweezer</h1>
      <h3>API for detecting hate speech, misinformation, and harmful content</h3>
      <TextEvaluationCheckboxes currentlyChecked={currentlyChecked} setCurrentlyChecked={setCurrentlyChecked}/> 
      <div className="upload-config-container">
        <ImageUploadForm
        currentlyChecked={currentlyChecked} 
        setFormattedJsonString={setFormattedJsonString} 
        setFormattedImageJsonString={setFormattedImageJsonString}
        setIsLoading={setIsLoading}/>
        <Spinner isLoading={isLoading}/>
        <APIOutput formattedJsonString={formattedJsonString} formattedImageJsonString={formattedImageJsonString}/>
      </div>   
    </div>
  )
}

export default App

