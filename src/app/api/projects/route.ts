import { NextResponse } from "next/server";

interface Project {
  id: string;
  name: string;
  offlineLabelingAllowed: boolean;
  archived: boolean;
  exported: boolean;
  dataCount: number; // number of data items under project
}

let projects: Project[] = [
  { id: "1", name: "Project Alpha", offlineLabelingAllowed: true, archived: false, exported: false, dataCount: 10 },
  { id: "2", name: "Project Beta", offlineLabelingAllowed: false, archived: false, exported: true, dataCount: 0 },
];

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const newProject: Project = await request.json();
  projects.push(newProject);
  return NextResponse.json({ message: "Project created", project: newProject });
}

export async function PUT(request: Request) {
  const updatedProject: Project = await request.json();
  const index = projects.findIndex((p) => p.id === updatedProject.id);
  if (index !== -1) {
    projects[index] = updatedProject;
    return NextResponse.json({ message: "Project updated", project: updatedProject });
  } else {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  const project = projects[index];
  if (project.dataCount > 0 && !project.exported) {
    return NextResponse.json(
      { error: "Cannot delete project with data that is not exported" },
      { status: 400 }
    );
  }
  projects.splice(index, 1);
  return NextResponse.json({ message: "Project deleted" });
}
