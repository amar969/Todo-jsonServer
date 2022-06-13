import React from "react";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export const Todo = () => {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const getTodos = () => {
    setLoading(true);
    fetch(`http://localhost:3000/todo?_page=${page}&_limit=3`)
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
        console.log(res);
      })
      .catch((err) => {
        setError(true);
        setTodos([]);
      })
      .finally(() => {
        setLoading(false);
      });

    // X-Total-Count
    fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`) // 2
      .then((res) => {
        let total = res.headers.get("X-Total-Count");
        setTotal(+total); // this way you can set total state
        console.log(res.headers.get("X-Total-Count"))
        return res.json();
      });
  };
  React.useEffect(() => {
    getTodos();
  }, [page]);

  const addTodo = (inputValue) => {
    const payload = {
      title: inputValue,
      status: false,
    };
    setLoading(true);
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setError(false);
        return getTodos(res);
      })

      .catch((err) => {
        setError(true);
      })

      .finally(() => {
        setLoading(false);
      });
    setTodos([...inputValue, payload]);
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>Error</h1>
  ) : (
    <>
      <h1> To do with JSON server</h1>
      <TodoInput addTodo={addTodo} />
      <br />
      <TodoList key={todos.id} todos={todos} />
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
};
