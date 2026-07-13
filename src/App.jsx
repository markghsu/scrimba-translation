import './App.css'
import Parrot from './assets/parrot.png'

function App() {

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
        <form className="translation-form" id="translation-form">
          <label className="input-label" htmlFor="translation-input">Text to translate 👇</label>
          <textarea id="translation-input" name="translation-input" rows="4" defaultValue="How are you?" />
          <fieldset id="language-radio">
            <legend className="input-label">Select language 👇</legend>
            <label>
                <input type="radio" name="language" value="french"/>
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
      </main>
    </>
  )
}

export default App
