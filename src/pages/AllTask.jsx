import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Loader2, Pencil, Trash2, GripVertical } from 'lucide-react';

const AllTask = () => {
  const navigate = useNavigate();

  const { data: tasks = [], refetch, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/tasks");
      return res.data;
    },
  });

  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    setAllTask(tasks);
  }, [tasks]);

  const handleUpdate = (taskId) => {
    console.log(`Update task with ID: ${taskId}`);
    navigate(`/updateTask/${taskId}`);
  };

  const handleDelete = (taskId) => {
    console.log(`Delete task with ID: ${taskId}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/tasks/${taskId}`)
          .then((res) => {
            refetch();
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const tasksInColumn = allTask.filter(
        (task) => task.category === source.droppableId
      );
      const otherTasks = allTask.filter(
        (task) => task.category !== source.droppableId
      );
      const newTasksInColumn = Array.from(tasksInColumn);
      const [movedTask] = newTasksInColumn.splice(source.index, 1);
      newTasksInColumn.splice(destination.index, 0, movedTask);
      setAllTask([...otherTasks, ...newTasksInColumn]);
    } else {
      const sourceTasks = allTask.filter(
        (task) => task.category === source.droppableId
      );
      const destinationTasks = allTask.filter(
        (task) => task.category === destination.droppableId
      );
      const otherTasks = allTask.filter(
        (task) =>
          task.category !== source.droppableId &&
          task.category !== destination.droppableId
      );

      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.category = destination.droppableId;
      destinationTasks.splice(destination.index, 0, movedTask);

      setAllTask([...otherTasks, ...sourceTasks, ...destinationTasks]);

      try {
        await axios.put(`http://localhost:5000/tasks/${draggableId}`, {
          category: destination.droppableId,
        });
        refetch();
      } catch (error) {
        console.error("Error updating task category:", error);
      }
    }
  };

  const categories = [
    { 
      name: "To-Do", 
      bgClass: "bg-white", 
      headerClass: "border-l-4 border-r-4 border-red-400",
      count: allTask.filter(task => task.category === "To-Do").length 
    },
    { 
      name: "In Progress", 
      bgClass: "bg-white", 
      headerClass: "border-l-4 border-r-4 border-blue-400",
      count: allTask.filter(task => task.category === "In Progress").length 
    },
    { 
      name: "Done", 
      bgClass: "bg-white", 
      headerClass: "border-l-4 border-r-4 border-green-400",
      count: allTask.filter(task => task.category === "Done").length 
    },
  ];
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 md:mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
        <div className="text-sm text-gray-500">
          Total Tasks: {allTask.length}
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {categories.map((column) => (
            <Droppable key={column.name} droppableId={column.name}>
              {(provided) => (
                <div className="flex flex-col h-full">
                  <div className={`p-4 rounded-t-lg ${column.headerClass} bg-white shadow-sm`}>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-700">{column.name}</h2>
                      <span className="px-2 py-1 text-sm font-medium bg-gray-100 rounded-full">
                        {column.count}
                      </span>
                    </div>
                  </div>
                  
                  <div
                    className="flex-1 p-2 bg-indigo-950 rounded-b-lg min-h-screen"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {allTask
                      .filter((task) => task.category === column.name)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`rounded-lg shadow-sm p-4 mb-3 border border-gray-100 transition-all ${
                                snapshot.isDragging ? 'shadow-lg rotate-2' : ''
                              }min-h-[100px] h-auto overflow-hidden break-words`}
                            >
                              <div className="flex items-start gap-2">
                                <div
                                  {...provided.dragHandleProps}
                                  className="mt-1 cursor-move text-gray-400 hover:text-gray-600"
                                >
                                  <GripVertical className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium text-gray-200 mb-1">
                                    {task.title}
                                  </h3>
                                  <p className="text-sm text-gray-300 mb-3">
                                    {task.description}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleUpdate(task._id)}
                                      className="inline-flex items-center py-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                      <Pencil className="w-4 h-4 mr-1" />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDelete(task._id)}
                                      className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default AllTask;