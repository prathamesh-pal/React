import { useState } from "react";
import "animate.css";
import "./App.css";
import {
  Badge,
  Card,
  Tag,
  Select,
  Modal,
  Form,
  Input,
  Button,
  Progress,
} from "antd";
import { Plus, CheckCircle, Clock3, Target } from "lucide-react";

function App() {
  const [open, setOpen] = useState(false);

  const [tasks, setTasks] = useState([
  {
    id: 1,
    title: "Build Daily Planner UI",
    description: "Refactor planner into a modern dashboard.",
    priority: "high",
    status: "pending",
  },
  {
    id: 2,
    title: "Study React Hooks",
    description: "Practice useState, useEffect, and custom hooks.",
    priority: "high",
    status: "completed",
  },
  {
    id: 3,
    title: "Prepare Internship Resume",
    description: "Update projects and technical skills section.",
    priority: "high",
    status: "pending",
  },
  {
    id: 4,
    title: "Complete Portfolio Website",
    description: "Add animations and project showcase section.",
    priority: "high",
    status: "pending",
  },
  {
    id: 5,
    title: "Solve LeetCode Problems",
    description: "Complete 3 medium difficulty questions.",
    priority: "medium",
    status: "pending",
  },
  {
    id: 6,
    title: "Read JavaScript Documentation",
    description: "Learn about async/await and promises.",
    priority: "medium",
    status: "completed",
  },
  {
    id: 7,
    title: "Watch System Design Video",
    description: "Understand scalability basics.",
    priority: "medium",
    status: "pending",
  },
  {
    id: 8,
    title: "Practice Tailwind CSS",
    description: "Create reusable UI components.",
    priority: "medium",
    status: "pending",
  },
  {
    id: 9,
    title: "Morning Workout",
    description: "30 minutes of cardio and stretching.",
    priority: "low",
    status: "completed",
  },
  {
    id: 10,
    title: "Read a Book",
    description: "Read 20 pages before bedtime.",
    priority: "low",
    status: "pending",
  },
  {
    id: 11,
    title: "Organize Workspace",
    description: "Clean desk and arrange study materials.",
    priority: "low",
    status: "pending",
  },
  {
    id: 12,
    title: "Plan Tomorrow",
    description: "Create a task list for the next day.",
    priority: "low",
    status: "pending",
  },
  {
    id: 13,
    title: "Review CS50 Notes",
    description: "Revise Flask and database concepts.",
    priority: "high",
    status: "pending",
  },
  {
    id: 14,
    title: "Push Code to GitHub",
    description: "Commit and document today's work.",
    priority: "medium",
    status: "completed",
  },
  {
    id: 15,
    title: "Drink More Water",
    description: "Track daily hydration goals.",
    priority: "low",
    status: "pending",
  },
]);

  const handleClose = () => {
    setOpen(false);
  };

  const createTask = (values) => {
    const newTask = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: "pending",
    };

    setTasks((prev) => [...prev, newTask]);
    setOpen(false);
  };

  const updateStatus = (id, value) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: value } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const highTasks = tasks.filter((task) => task.priority === "high");
  const mediumTasks = tasks.filter((task) => task.priority === "medium");
  const lowTasks = tasks.filter((task) => task.priority === "low");

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const productivity =
    tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

  const renderTaskCard = (task) => (
    <Card
      key={task.id}
      hoverable
      className="
        !rounded-2xl
        !border-gray-100
        !shadow-none
        hover:!shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        mb-4
      "
    >
      <Card.Meta
        title={
          <span className="text-gray-800 font-semibold">
            {task.title}
          </span>
        }
        description={
          <span className="text-gray-500">
            {task.description}
          </span>
        }
      />

      <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2">
          <Tag color={task.status === "completed" ? "green" : "gold"}>
            {task.status}
          </Tag>

          <Tag
            color="red"
            className="cursor-pointer"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </Tag>
        </div>

        <Select
          size="small"
          value={task.status}
          style={{ width: 130 }}
          onChange={(value) => updateStatus(task.id, value)}
          options={[
            {
              value: "pending",
              label: "Pending",
            },
            {
              value: "completed",
              label: "Completed",
            },
            {
              value: "cancelled",
              label: "Cancelled",
            },
          ]}
        />
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-white">
      {/* Navbar */}

      <nav className="fixed top-0 left-0 w-full h-[70px] bg-white/90 backdrop-blur-lg border-b border-gray-200 flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-lg">
            T
          </div>

          <div>
            <h1 className="font-bold text-xl text-gray-800">
              Tasky
            </h1>
            <p className="text-xs text-gray-500">
              Productivity Dashboard
            </p>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<Plus size={18} />}
          className="!rounded-xl"
          onClick={() => setOpen(true)}
        >
          Add Task
        </Button>
      </nav>

      {/* Dashboard */}

      <main className="pt-[90px] pb-8 px-4 md:px-6 lg:px-8">
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-12
          gap-6
          auto-rows-auto
        "
        >
          {/* Overview */}

          <Card
            className="
            lg:col-span-8
            !rounded-3xl
            !border-gray-100
            shadow-sm
          "
          >
            <h2 className="text-2xl font-bold text-gray-800">
              Today's Overview
            </h2>

            <p className="text-gray-500 mt-1">
              Track progress and stay focused on what matters.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 rounded-2xl p-5">
                <Target size={22} />
                <h3 className="text-3xl font-bold mt-3">
                  {tasks.length}
                </h3>
                <p className="text-gray-500">
                  Total Tasks
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <CheckCircle size={22} />
                <h3 className="text-3xl font-bold mt-3 text-green-600">
                  {completedTasks}
                </h3>
                <p className="text-gray-500">
                  Completed
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <Clock3 size={22} />
                <h3 className="text-3xl font-bold mt-3 text-orange-500">
                  {pendingTasks}
                </h3>
                <p className="text-gray-500">
                  Pending
                </p>
              </div>
            </div>
          </Card>

          {/* Productivity */}

          <Card
            className="
            lg:col-span-4
            !rounded-3xl
            !border-gray-100
            shadow-sm
          "
          >
            <h3 className="font-semibold text-lg text-gray-800">
              Productivity
            </h3>

            <div className="mt-6 flex flex-col items-center">
              <Progress
                type="circle"
                percent={productivity}
              />

              <p className="mt-4 text-gray-500">
                Completion Rate
              </p>
            </div>
          </Card>

          {/* High Priority */}

          <div className="lg:col-span-4">
            <Badge.Ribbon
              text="Highest"
              color="#ef4444"
            >
              <Card
                className="
                !rounded-3xl
                h-full
                overflow-hidden
                !bg-gray-400
              "
              >
                <div className="h-full overflow-y-auto pr-1 flex flex-col gap-2">
                  {highTasks.map(renderTaskCard)}
                </div>
              </Card>
            </Badge.Ribbon>
          </div>

          {/* Medium Priority */}

          <div className="lg:col-span-4 ">
            <Badge.Ribbon
              text="Medium"
              color="#6366f1"
            >
              <Card
                className="
                !rounded-3xl
                h-full
                overflow-hidden
                !bg-gray-400
              "
              >
                <div className="h-full overflow-y-auto pr-1 flex flex-col gap-2">
                  {mediumTasks.map(renderTaskCard)}
                </div>
              </Card>
            </Badge.Ribbon>
          </div>

          {/* Low Priority */}

          <div className="lg:col-span-4 ">
            <Badge.Ribbon
              text="Low"
              color="#22c55e"
            >
              <Card
                className="
                !rounded-3xl
                h-full
                overflow-hidden
                !bg-gray-400
              "
              >
                <div className="h-full overflow-y-auto pr-1 flex flex-col gap-2">
                  {lowTasks.map(renderTaskCard)}
                </div>
              </Card>
            </Badge.Ribbon>
          </div>

          {/* Notes */}

          <Card
            className="
    lg:col-span-6
    !rounded-3xl
   
  "
          >
            <h3 className="font-semibold text-lg mb-4">
              Notes
            </h3>

            <Input.TextArea
              rows={8}
              placeholder="Write notes, reminders, ideas..."
            />
          </Card>


        </div>
      </main>

      {/* Modal */}

      <Modal
        open={open}
        footer={null}
        title="Create New Task"
        onCancel={handleClose}
        maskClosable={false}
      >
        <Form
          layout="vertical"
          onFinish={createTask}
        >
          <Form.Item
            label="Task Name"
            name="title"
            rules={[
              {
                required: true,
                message: "Task title is required",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter task name"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message:
                  "Task description is required",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Describe the task..."
            />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[
              {
                required: true,
                message: "Select priority",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Choose Priority"
              options={[
                {
                  value: "high",
                  label: "Highest",
                },
                {
                  value: "medium",
                  label: "Medium",
                },
                {
                  value: "low",
                  label: "Lowest",
                },
              ]}
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            className="!rounded-xl"
          >
            Create Task
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default App;