import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import api from "./service/api";
import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [address, setAdress] = useState({});

  async function handleSearch() {
    if (!input) return alert("Informe um CEP");
    try {
      const response = await api.get(`${input}/json`);
      setAdress(response.data);
      setInput("");
    } catch (erro) {
      alert("CEP não encontrado");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerAction">
        <TextField
          className="textInput"
          id="outlined-basic"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          label="Insira o CEP"
          variant="outlined"
        />
        <Button
          className="btnBuscar"
          onClick={handleSearch}
          variant="contained"
        >
          Buscar
        </Button>
        {Object.keys(address).length > 0 && (
          <Card className="cardResult" variant="outlined">
            <h2>CEP: {address.cep}</h2>
            <span className="txtAddr">{address.logradouro}</span>
            <span className="txtAddr">{address.bairro}</span>
            <span className="txtAddr">
              {address.localidade}/{address.uf}
            </span>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
