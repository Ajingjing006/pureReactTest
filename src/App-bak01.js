import "./App.css";
import TodoList from "./todolist";
import { colorContext, ageContext } from "./context";

function App() {
  return (
    <colorContext.Provider value="red">
      <ageContext.Provider value="200">
        <TodoList></TodoList>
      </ageContext.Provider>
    </colorContext.Provider>
  );
}

export default App;
