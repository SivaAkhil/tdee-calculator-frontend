import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./calorycalculator.css";

const CaloryCalculator = (props) => {
  const [contents, setContents] = useState([]);
  const [total, setTotal] = useState(0);
  const [calorie, setCalorie] = useState("");
  const [item, setItem] = useState("");

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < contents.length; i++) {
      total = total + contents[i].number;
    }

    setTotal(total);
  }, [contents]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const newContent = [...contents];
    newContent.push({ id: uuid(), name: item, number: Number(calorie) });
    setCalorie("");
    setItem("");
    setContents(newContent);
  };

  const handleRemove = (id) => {
    const newContent = contents.filter((c) => {
      return c.id !== id;
    });

    setContents(newContent);
  };

  const handleItem = (e) => {
    setItem(e.target.value);
  };

  const handleCalorie = (e) => {
    setCalorie(e.target.value);
  };

  return (
    <div>
      <h2>Calorie Calculator:</h2>
      <p>Total Calories: {total}</p>
      <p>Add Item</p>
      <form onSubmit={handleAddItem} className="calorie-form-container">
        <div>
          <label htmlFor="item">Item: </label>
          <input name="item" type="text" value={item} onChange={handleItem} />
        </div>
        <div>
          <label htmlFor="calories">Calories: </label>
          <input
            type="number"
            name="calories"
            value={calorie}
            onChange={handleCalorie}
          />
        </div>
        <button>Add</button>
      </form>
      {/*  */}
      <table className="table-container">
        <tbody>
          <tr className="row-container">
            <th>Item</th>
            <th>Calories</th>
          </tr>
          {contents.map((c) => {
            return (
              <tr key={c.id} className="row-container">
                <td>{c.name}</td>
                <td>{c.number}</td>
                <button onClick={() => handleRemove(c.id)}>Remove</button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CaloryCalculator;
