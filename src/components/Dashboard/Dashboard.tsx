"use client";

import React, { useState } from "react";
import AudioRecorder from "../AudioRecorder/AudioRecorder";
import AudioFileList from "../AudioFileList/AudioFileList";
import Spectrogram from "../Spectrogram/Spectrogram";
import SegmentLabeler from "../SegmentLabeler/SegmentLabeler";

interface AudioFile {
  id: string;
  name: string;
  duration: number; // in seconds
  uploadedAt: string;
  url: string;
}

export default function Dashboard({ userEmail }: { userEmail: string }) {
  const [user] = useState({ email: userEmail });
  const [audioFiles, setAudioFiles] = React.useState<AudioFile[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<AudioFile | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [segments, setSegments] = React.useState([]);

  React.useEffect(() => {
    // Fetch audio files from API on mount
    async function fetchAudioFiles() {
      try {
        const res = await fetch("/api/audio/files");
        if (res.ok) {
          const files = await res.json();
          setAudioFiles(files);
        } else {
          console.error("Failed to fetch audio files");
        }
      } catch (err) {
        console.error("Error fetching audio files:", err);
      }
    }
    fetchAudioFiles();
  }, []);

  const handleSelectFile = (file: AudioFile) => {
    setSelectedFile(file);
    setAudioUrl(file.url);
    setSegments([]);
  };

  const handleSegmentsChange = (newSegments: any) => {
    setSegments(newSegments);
  };

  const saveAnnotations = async () => {
    if (!selectedFile) return;
    try {
      const response = await fetch("/api/annotations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now().toString(),
          audioFileId: selectedFile.id,
          segments,
          annotator: user.email,
          timestamp: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        alert("Annotations saved successfully.");
      } else {
        alert("Failed to save annotations.");
      }
    } catch (error) {
      alert("Error saving annotations: " + error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Audio Files</h3>
        <AudioFileList files={audioFiles} onSelect={handleSelectFile} />
      </section>
      {selectedFile && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Selected Audio: {selectedFile.name}</h3>
          {audioUrl ? (
            <>
              <Spectrogram audioUrl={audioUrl} />
              <SegmentLabeler
                audioDuration={selectedFile.duration}
                predefinedTags={["burst", "multiple bursts", "harmonic"]}
                onSegmentsChange={handleSegmentsChange}
              />
              <button
                onClick={saveAnnotations}
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
              >
                Save Annotations
              </button>
            </>
          ) : (
            <p>Spectrogram and labeling UI will be implemented here.</p>
          )}
        </section>
      )}
      <section>
        <h3 className="text-xl font-semibold mb-2">Audio Recording</h3>
        <AudioRecorder />
      </section>
    </div>
  );
}
