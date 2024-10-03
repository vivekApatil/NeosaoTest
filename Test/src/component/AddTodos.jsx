import React, { useState } from "react";

function AddTodos({ fetchTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("toDo");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("toDo");
  };

  const addTask = () => {
    if (taskTitle && taskDescription) {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        status: taskStatus,
        id: Date.now(),
      };

      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = [...storedTasks, newTask];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      fetchTasks();

      closeModal();
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="text-white bg-blue-400 w-9 h-9 flex items-center justify-center rounded-full mb-2"
      >
        <span className="text-xl">+</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Add Task
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">Task Title</label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter task title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Task Description</label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter task description"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Task Status</label>
              <select
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="toDo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={addTask}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
              >
                Add Task
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTodos;
