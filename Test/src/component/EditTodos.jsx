import React from 'react'

function EditTodos({ isOpen, onClose, editTitle, editTaskStatus, setEditTitle, editDescription, setEditDescription, setEditTaskStatus, handleUpdateTask }) {
  
    if (!isOpen) return null;
    // console.log("")

    return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg m-3 w-full">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      <div className="mb-4">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Edit task title"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Edit task description"
        />
      </div>
      <div className="mb-4">
              <label className="block text-gray-700">Task Status</label>
              <select
                value={editTaskStatus}
                onChange={(e) => setEditTaskStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="toDo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleUpdateTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Task
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default EditTodos
