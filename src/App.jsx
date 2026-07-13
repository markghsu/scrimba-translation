import './App.css'
import Parrot from './assets/parrot.png'
import { useState } from "react"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [translatedText, setTranslatedText] = useState("")
  const [submittedTranslation, setSubmittedTranslation] = useState("")

  async function handleSubmit(formData) {
    const data = Object.fromEntries(formData)
    console.log(data)
    // API CALL HERE
    setIsLoading(true)
    setSubmittedTranslation(data["translation-input"])
    try {
      const response = await fetch('')
      const res = await response.json()
      setTranslatedText()
    } 
    catch (err) {
      console.error(err)
    }
    finally {
      setIsLoading(false)
    }
  }

  function restart () {
    setTranslatedText("")
    setSubmittedTranslation("")
  }

  return (
    <>
      <header className="header">
        <img src={Parrot}
          alt="PollyGlot Parrot" 
          title="PollyGlot logo" 
          className="logo" />
        <div className="title-container">
          <h1 className="title">PollyGlot</h1>
          <p className="subtitle">Perfect Translation Every Time</p>
        </div>
      </header>
      <main>
        { isLoading ? <h2>Loading...</h2> :
          translatedText === "" ?
          <form className="translation-form" id="translation-form" action={handleSubmit}>
            <label className="input-label" htmlFor="translation-input">Text to translate 👇</label>
            <textarea id="translation-input" name="translation-input" rows="4" required={true} defaultValue="How are you?" />
            <fieldset id="language-radio">
              <legend className="input-label">Select language 👇</legend>
              <label>
                  <input type="radio" name="language" value="french" required={true} />
                  French 🇫🇷
              </label>
              <label>
                  <input type="radio" name="language" value="spanish"/> 
                  Spanish 🇪🇸
              </label>
                <label>
                  <input type="radio" name="language" value="japanese"/>
                  Japanese 🇯🇵
              </label>
            </fieldset>
            <button className="submit-btn">Translate</button>
          </form>
          :
          <div className="translation-form" id="result">
            <label className="input-label" htmlFor="translation-input">Original Text 👇</label>
            <textarea name="translation-input" rows="4" readOnly={true} value={submittedTranslation} />
            <label className="input-label" htmlFor="translation-output">Your Translation 👇</label>
            <textarea name="translation-output" rows="4" readOnly={true} value={translatedText} />
            <button className="submit-btn" onClick={restart}>Start Over</button>
          </div>
        }
      </main>
    </>
  )
}

export default App
