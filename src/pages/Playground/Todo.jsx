// import { useEffect, useState } from "react";
// import "./todo.css";

// export default function Todo(saveRecipe) {
//   const [todos, setTodos] = useState([]);
//   const [todo, setTodo] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");


//   useEffect(() => {
//     const json = localStorage.getItem("todos");
//     const loadedTodos = JSON.parse(json);
//     if (loadedTodos) {
//       setTodos(loadedTodos);
//     }
//   }, []);

//   useEffect(() => {
//     const json = JSON.stringify(todos);
//     localStorage.setItem("todos", json);
//   }, [todos]);

//   function handleSubmit(e) {
//     e.preventDefault();

//     const newRecipe = {
//       id: new Date().getTime(),
//       todo: todo,
//     };
//     setTodos([...todos].concat(newRecipe));
//     setTodo("");
//   }

//   async function handleFirestoreSubmit(event) {
//     event.preventDefault();
//     const formData = {
//       // create a new objebt to hold the value from states / input fields
//       todo: todo,
//     };

//       console.log("formData:", formData);

//     const validForm = formData.todo.trim() !== "";

//     if (validForm) {
//       // if all fields/ properties are filled, then call saveRecipe
//       saveRecipe(formData);
//     } else {
//       // if not, set errorMessage state.
//       setErrorMessage("Please, fill in all fields.");
//     }
//   }

//   function deleteTodo(id) {
//     let updatedTodos = [...todos].filter((todo) => todo.id !== id);
//     setTodos(updatedTodos);
//   }

//   return (
//     <div id="todo-list">
//       <h1>Todo List</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           onChange={(e) => setTodo(e.target.value)}
//           value={todo}
//         />
//         <button type="submit">Add Todo</button>
//       </form>
//       {todos.map((todo) => (
//         <div key={todo.id} className="todo">
//           <div className="todo-text">
//             <div>{todo.todo}</div>
//           </div>
//           <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//         </div>
//       ))}
//       <p className="text-error">{errorMessage}</p>
//       <button onClick={handleFirestoreSubmit}>Save recipe</button>
//     </div>
//   );
// }
