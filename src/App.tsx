import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";

const Cell = ({
  name,
  onChange,
}: {
  name: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <input name={name.toString()} type="text" onChange={onChange}></input>;
};

function App() {
  const ROWS = 6;
  const COLS = 7;
  const [data, setData] = useState<{ [key: string]: string[] | null } | null>(
    null
  );
  const abc = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    if (!data) {
      const initialObject: { [key: string]: string[] | null } = {};
      for (let i = 0; i < ROWS; i++) {
        initialObject[abc[i]] = Array.from({ length: ROWS }, () => "");
      }
      setData(initialObject);
    }
  }, [abc, data]);

  const cellOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const rowIndex = Math.floor(Number(name) / ROWS);
    const colIndex = Number(name) % ROWS;
    const rowLetter = abc[colIndex];

    if (data && data[rowLetter]) {
      const dataCopy = { ...data };
      if (
        dataCopy[rowLetter] &&
        typeof value === "string" &&
        value.length > 0
      ) {
        dataCopy[rowLetter][rowIndex] = value.trim();
      }
      setData(dataCopy);
    }
  };

  return (
    <>
      <h1>Excel-style component 💚</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <div style={{ height: `${500 / COLS}px` }}></div>
          {Array.from({ length: COLS }, (_, i) => {
            return (
              <div
                style={{
                  height: `${500 / COLS}px`,
                  verticalAlign: "middle",
                  display: "flex",
                  justifyContent: "center",
                  padding: "0 15px",
                }}
                key={`${i + 1}_col`}
              >
                <h3>{i + 1}</h3>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 0",
            }}
          >
            {Array.from({ length: ROWS }, (_, i) => {
              return (
                <div style={{ width: `174px` }} key={`${abc[i]}_row`}>
                  <h3>{abc[i].toUpperCase()}</h3>
                </div>
              );
            })}
          </div>
          <div
            style={{
              minWidth: "800px",
              minHeight: "500px",
              display: "grid",
              gridTemplateColumns: `repeat(${ROWS}, 1fr)`,
            }}
          >
            {Array.from({ length: ROWS * COLS }, (_, i) => {
              return <Cell key={i} onChange={cellOnChange} name={i} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
