import "./App.css";

import { useSelector, useDispatch } from "react-redux";

import { addItem, deleteItem, checkItem } from "./features/List";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const ItemList = useSelector((state) => state.list.value);

  const [item, setItem] = useState("");

  return (
    <div className="App">
      <h1>TODO Widget</h1>
      <form      ///adding items
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addItem({
              id:
                ItemList.length === 0
                  ? 0
                  : ItemList[ItemList.length - 1].id + 1,
              todo: item,
              checked: false,
            })
          );
          setItem("");
          
         
        }}
      >
        <input className="addItems" required value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        ></input>
        <button type="submit">Add</button>
      </form>

      {ItemList    ///returning todo items
        ? ItemList.map((element) => {
            return (
              <div className="items" key={element.id}>
                <input className="checkbox"   ///checkbox
                  type="checkbox"
                  checked={element.checked}
                  
                  onClick={() => {
                    dispatch(
                      checkItem({
                        id: element.id,
                        todo: element.todo,
                        checked: !element.checked,
                      })
                    );
                    console.log(element);
                  }}
                ></input>
                <h4 className={element.checked ? "completed" : "uncompleted"}>{element.todo} </h4>

                <button className="btn"   //delete button
                  onClick={() => {
                    dispatch(deleteItem({ id: element.id }));
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;
