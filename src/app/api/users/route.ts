import { NextResponse } from "next/server";

interface User {
  id: string;
  email: string;
  role: "annotator" | "admin";
  name: string;
}

let users: User[] = [
  { id: "1", email: "test@example.com", role: "annotator", name: "Test User" },
  { id: "2", email: "admin@example.com", role: "admin", name: "Admin User" },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const newUser: User = await request.json();
  users.push(newUser);
  return NextResponse.json({ message: "User created", user: newUser });
}

export async function PUT(request: Request) {
  const updatedUser: User = await request.json();
  const index = users.findIndex((u) => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    return NextResponse.json({ message: "User updated", user: updatedUser });
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  users.splice(index, 1);
  return NextResponse.json({ message: "User deleted" });
}
