import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [budget, setBudget] = useState(
    localStorage.getItem("budget") || ""
  );

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  const addExpense = () => {
    if (!expenseName || !expenseAmount) return;

    setExpenses([
      ...expenses,
      {
        name: expenseName,
        amount: Number(expenseAmount),
      },
    ]);

    setExpenseName("");
    setExpenseAmount("");
  };

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const remaining =
    (Number(budget) || 0) - totalExpenses;

  return (
    <div className="container">

      <h1>Budget Tracker</h1>

      <div className="card">
        <input
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        />
      </div>

      <div className="card">

        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) =>
            setExpenseName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) =>
            setExpenseAmount(e.target.value)
          }
        />

        <button onClick={addExpense}>
          Add Expense
        </button>

      </div>

      <div className="summary">

        <h3>Budget: ₹{budget || 0}</h3>

        <h3>Spent: ₹{totalExpenses}</h3>

        <h3>Remaining: ₹{remaining}</h3>

      </div>

      <div className="expenses">

        <h2>Expense List</h2>

        {expenses.map((expense, index) => (
          <div
            className="expense-item"
            key={index}
          >
            <span>{expense.name}</span>
            <span>₹{expense.amount}</span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;