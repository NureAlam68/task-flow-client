import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ClipboardList, Clock, CheckCircle2, PlusCircle } from 'lucide-react';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('To-Do');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    setTitle('');
    setDescription('');
    setCategory('To-Do');

    const newTask = {
      title,
      description,
      timestamp: new Date().toISOString(),
      category
    };
    console.log(newTask);
    axios.post('http://localhost:5000/tasks', newTask)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Task added successfully!",
            icon: "success",
            draggable: true
          });
        }
      });
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'To-Do':
        return <ClipboardList className="w-5 h-5" />;
      case 'In Progress':
        return <Clock className="w-5 h-5" />;
      case 'Done':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <ClipboardList className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-xl mx-auto md:mt-20">
      <div className="bg-indigo-950 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90 transform transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center justify-center mb-8">
          <PlusCircle className="w-8 h-8 text-indigo-600 mr-3" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create New Task
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              maxLength={50}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 shadow-sm"
              required
            />
            <p className="text-xs text-gray-400 mt-1 flex justify-between">
              <span>Be clear and specific</span>
              <span>{50 - title.length} characters remaining</span>
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about this task..."
              maxLength={200}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 shadow-sm resize-none"
            />
            <p className="text-xs text-gray-400 mt-1 flex justify-between">
              <span>Optional but recommended</span>
              <span>{200 - description.length} characters remaining</span>
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none bg-white pr-10 shadow-sm"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                {getCategoryIcon(category)}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create Task</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;