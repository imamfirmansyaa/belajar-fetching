import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";

function App() {
  const [selected, setSelected] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [isShow, setIsShow] = useState(false)

  const getBerries = async () => {
    const datas = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await datas.json();
    var result = value.results.map(data => {
      return {
        label: data.name,
        value: data.name
      }
    })
    setSelected(result.sort((a, b) => a.label.localeCompare(b.label)))
  };

  useEffect(() => {
    getBerries();
  })

  const handleSubmit = () => {
    setIsShow(state => !state);
  }

  const handleChange = (value) => {
    setUserSelect(value);
  }

  return (
    <div className="App">
      <h1>{isShow ? userSelect : ""}</h1>
      <button onClick={() => handleSubmit()} disabled={!userSelect}>{isShow ? "Hide Data" : "Show Data"}</button>
      <br/>
      <br/>
      <Select options={selected} onChange={(e) => handleChange(e.value)}></Select>
    </div>
  );
}

export default App;
