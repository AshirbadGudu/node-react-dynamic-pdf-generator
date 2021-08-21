import axios from "axios";
import { saveAs } from "file-saver";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState({
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0,
  });
  const createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", data)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h4>Create Node JS Powered Dynamic PDF</h4>
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Receipt ID"
          value={data.receiptId}
          onChange={(e) => setData({ ...data, receiptId: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price 1"
          value={data.price1}
          onChange={(e) => setData({ ...data, price1: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price 2"
          value={data.price2}
          onChange={(e) => setData({ ...data, price2: e.target.value })}
        />
        <button onClick={createAndDownloadPdf}>Download PDF</button>
      </header>
    </div>
  );
}

export default App;
