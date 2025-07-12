import { NextResponse } from "next/server";

const audioFiles = [
  {
    id: "1",
    name: "Sample Audio 1",
    duration: 125,
    uploadedAt: "2023-06-01T12:00:00Z",
    url: "/audio/sample1.webm",
  },
  {
    id: "2",
    name: "Sample Audio 2",
    duration: 240,
    uploadedAt: "2023-06-05T15:30:00Z",
    url: "/audio/sample2.webm",
  },
];

export async function GET() {
  return NextResponse.json(audioFiles);
}
