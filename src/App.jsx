import { useEffect, useState } from "react";
import "./App.css";
import TaskCreator from "./components/TaskCreator";
import TaskTable from "./components/TaskTable";
import VisibilityControl from "./components/VisibilityControl";
import Container from "./components/Container";

function App() {
  const [taskItems, setTaskItems] = useState(() => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  });
  const [showCompleted, setshowCompleted] = useState(false);

  const createNewTask = (taskName) => {
    if (!taskItems.find((task) => task.name === taskName))
      setTaskItems([...taskItems, { name: taskName, done: false }]);
  };

  const toggleTask = (task) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setshowCompleted(false);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  /*useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTaskItems();
    }
  }, []);*/

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />

        <VisibilityControl
          isChecked={showCompleted}
          setshowCompleted={(checked) => setshowCompleted(checked)}
          cleanTasks={cleanTasks}
        />

        {showCompleted === true && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
    </main>
  );
}

export default App;
