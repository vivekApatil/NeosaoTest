import React, { useState, useEffect } from "react";
import AddTodos from "./AddTodos";
import EditTodos from "./EditTodos";

const updateLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function Mainpage() {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTaskStatus, setEditTaskStatus] = useState("");


//   console.log("toDoTasks",toDoTasks)

  const fetchTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setToDoTasks(storedTasks.filter((task) => task.status === "toDo"));
    setInProgressTasks(
      storedTasks.filter((task) => task.status === "inProgress")
    );
    setCompletedTasks(
      storedTasks.filter((task) => task.status === "completed")
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title); 
    setEditDescription(task.description);
    setEditTaskStatus(task.status);
  };

  const handleUpdateTask = () => {
    if (editingTask) {
      const updatedTasks = JSON.parse(localStorage.getItem("tasks"));
      const taskIndex = updatedTasks.findIndex(
        (task) => task.id === editingTask
      );
      if (taskIndex !== -1) {
        updatedTasks[taskIndex].title = editTitle;
        updatedTasks[taskIndex].description = editDescription;
        updatedTasks[taskIndex].status = editTaskStatus;
        updateLocalStorage(updatedTasks);
        fetchTasks();
        setEditingTask(null);
        setEditTitle("");
        setEditDescription("");
      }
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = JSON.parse(localStorage.getItem("tasks")).filter(
      (task) => task.id !== taskId
    );
    updateLocalStorage(updatedTasks);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 cursor-default">My Kanbans</h1>

      
      <EditTodos
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        handleUpdateTask={handleUpdateTask}
        setEditTaskStatus={setEditTaskStatus}
        editTaskStatus={editTaskStatus}
      />

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-blue-100 rounded-lg shadow-lg p-4 border border-gray-600">
          <h2 className="text-xl font-semibold mb-4 text-center bg-blue-500 text-white py-2 rounded-t-lg">
            To Do
          </h2>
          <div className="flex items-center justify-end space-x-4 w-full">
            <AddTodos fetchTasks={fetchTasks} />
          </div>
          <div className="min-h-[200px] max-h-[460px] overflow-y-auto p-2">
            {toDoTasks.length > 0 ? (
              toDoTasks.reverse().map((task) => (
                <div key={task.id} className="bg-blue-200 p-5 mb-2 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{task.title}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="min-h-[100px] max-h-[160px] overflow-y-auto scrollbar-thin">
                  <p className="text-gray-600">{task.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No tasks available</p>
            )}
          </div>
        </div>

        
        <div className="bg-yellow-100 rounded-lg shadow-lg p-4 border border-gray-600">
          <h2 className="text-xl font-semibold mb-4 text-center bg-yellow-500 text-white py-2 rounded-t-lg">
            In Progress
          </h2>
          <div className="min-h-[200px] max-h-[460px] overflow-y-auto p-2 mt-14">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((task) => (
                <div key={task.id} className="bg-blue-200 p-2 mb-2 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{task.title}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="min-h-[100px] max-h-[160px] overflow-y-auto scrollbar-hide scrollbar-thin">
                  <p className="text-gray-600">{task.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No tasks available</p>
            )}
          </div>
        </div>

        
        <div className="bg-green-100 rounded-lg shadow-lg p-4 border border-gray-600">
          <h2 className="text-xl font-semibold mb-4 text-center bg-green-500 text-white py-2 rounded-t-lg">
            Completed
          </h2>
          <div className="min-h-[200px] max-h-[460px] overflow-y-auto p-2 mt-14">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <div key={task.id} className="bg-blue-200 p-2 mb-2 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{task.title}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="min-h-[100px] max-h-[160px] overflow-y-auto scrollbar-hide scrollbar-thin">
                  <p className="text-gray-600">{task.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No tasks available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
