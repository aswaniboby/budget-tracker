import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!name || !amount) return;

    const newExpense = {
      name,
      amount: Number(amount),
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  };

  const totalSpent = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const remaining = budget - totalSpent;

  return (
    <div className="container">
      <h1>💰 Budget Tracker</h1>

      <div className="card">
        <input
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      <div className="card">
        <input
          type="text"
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="summary">
        <h3>Budget: ₹{budget || 0}</h3>
        <h3>Spent: ₹{totalSpent}</h3>
        <h3>Remaining: ₹{remaining || 0}</h3>
      </div>

      <div className="list">
        {expenses.map((e, i) => (
          <div key={i} className="item">
            <span>{e.name}</span>
            <span>₹{e.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}