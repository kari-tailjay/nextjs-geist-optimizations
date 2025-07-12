import { NextResponse } from "next/server";

interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  assignedTo: string[]; // user ids
  status: "pending" | "in_progress" | "completed" | "review";
  createdAt: string;
  updatedAt: string;
}

let tasks: Task[] = [
  {
    id: "1",
    projectId: "1",
    name: "Annotate Audio 1",
    description: "Annotate the first audio file",
    assignedTo: ["1"],
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    projectId: "1",
    name: "Review Annotations",
    description: "Review annotations for audio files",
    assignedTo: ["2"],
    status: "review",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const newTask: Task = await request.json();
  tasks.push(newTask);
  return NextResponse.json({ message: "Task created", task: newTask });
}

export async function PUT(request: Request) {
  const updatedTask: Task = await request.json();
  const index = tasks.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    return NextResponse.json({ message: "Task updated", task: updatedTask });
  } else {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  tasks.splice(index, 1);
  return NextResponse.json({ message: "Task deleted" });
}
