import React from "react";
import "./styles/App.css";
import { useGetAllContactQuery } from "../redux/baseAPI";

function App() {
  const { data, isLoading, error } = useGetAllContactQuery();
  console.log(`🚀 ~ file: App.js:7 ~ App ~ error::`, error)

  return (
    <>
      <div className="App">Hello</div>
      {
        error ? (
          <div>error...</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : data ? data.contacts?.map((item, index) => (
          <div key={index}>
            {item.name}
          </div>
        )): null
      }
    </>
  );
}

export default App;
