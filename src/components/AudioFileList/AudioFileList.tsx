"use client";

import React from "react";

interface AudioFile {
  id: string;
  name: string;
  duration: number; // in seconds
  uploadedAt: string;
  url: string;
}

interface AudioFileListProps {
  files: AudioFile[];
  onSelect: (file: AudioFile) => void;
}

export default function AudioFileList({ files, onSelect }: AudioFileListProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Audio Files</h3>
      {files.length === 0 ? (
        <p>No audio files available.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {files.map((file) => (
            <li
              key={file.id}
              className="py-2 cursor-pointer hover:bg-gray-200 rounded px-2"
              onClick={() => onSelect(file)}
            >
              <div className="flex justify-between">
                <span className="font-medium">{file.name}</span>
                <span className="text-sm text-gray-600">
                  {Math.floor(file.duration / 60)}:
                  {(file.duration % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
