import { NextResponse } from "next/server";

interface Annotation {
  id: string;
  audioFileId: string;
  segments: any[];
  annotator: string;
  timestamp: string;
}

let annotations: Annotation[] = [];

export async function GET() {
  return NextResponse.json(annotations);
}

export async function POST(request: Request) {
  const newAnnotation: Annotation = await request.json();
  annotations.push(newAnnotation);
  return NextResponse.json({ message: "Annotation saved", annotation: newAnnotation });
}
