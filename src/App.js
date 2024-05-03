import "./styles.css";
import { Text } from "react-native";
import { useEffect, useState } from "react";

const defaultItems = [
  {
    title: "",
  },
];

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  console.log("Items updated", items);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    console.log("Getting data ...");
    const result = await fetch(
      "https://jsonplaceholder.typicode.com/todos?limit=20"
    );

    const json = await result.json();
    const jsonSlice = json.slice(0, 20);
    console.log("Json slice", jsonSlice);
    setItems([...jsonSlice]);
  }

  function onComplete(index) {
    console.debug("Completing item", index);
    setItems((prevItems) =>
      prevItems.map((v, i) => {
        if (i === index) {
          v.isComplete = true;
        }
        return v;
      })
    );
  }

  function onRemoveItem(index) {
    console.debug("Removing item", index);
    setItems((prevItems) => [...prevItems.filter((v, i) => i != index)]);
  }

  function onAddItem(value) {
    console.log("Adding new item", value);
    if (!value.length) return;
    setItems((prevItems) => [...prevItems, { title: value }]);
    setNewItem("");
  }

  return (
    <>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Todos ...</h2>
        <div>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  textDecoration: item.isComplete ? "strikethrough" : "normal",
                }}
              >
                {item.title}
                <input type="checkbox" click={onComplete(index)} />
              </label>
              <button onClick={onRemoveItem(index)}>Remove</button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={() => onAddItem(newItem)}>Add New</button>
        </div>
      </div>
    </>
  );
}
