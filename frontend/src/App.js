import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

function App() {
  const makeApiRequest = () => {
    axios
      .get("/api/testwithcurrentuser")
      .then((response) => console.log(response));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello dev new</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={makeApiRequest}>Make api request</button>
      </header>
    </div>
  );
}

export default App;
