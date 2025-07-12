"use client";

import React, { useState } from "react";

interface Segment {
  id: string;
  startTime: number; // seconds
  endTime: number; // seconds
  tag: string;
}

interface SegmentLabelerProps {
  audioDuration: number; // seconds
  predefinedTags: string[];
  onSegmentsChange: (segments: Segment[]) => void;
}

export default function SegmentLabeler({
  audioDuration,
  predefinedTags,
  onSegmentsChange,
}: SegmentLabelerProps) {
  const [segments, setSegments] = useState<Segment[]>([]);

  const addSegment = () => {
    const newSegment: Segment = {
      id: Date.now().toString(),
      startTime: 0,
      endTime: Math.min(5, audioDuration),
      tag: predefinedTags[0] || "",
    };
    const newSegments = [...segments, newSegment];
    setSegments(newSegments);
    onSegmentsChange(newSegments);
  };

  const updateSegment = (id: string, field: keyof Segment, value: any) => {
    const newSegments = segments.map((seg) =>
      seg.id === id ? { ...seg, [field]: value } : seg
    );
    setSegments(newSegments);
    onSegmentsChange(newSegments);
  };

  const removeSegment = (id: string) => {
    const newSegments = segments.filter((seg) => seg.id !== id);
    setSegments(newSegments);
    onSegmentsChange(newSegments);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md max-w-4xl mx-auto">
      <h4 className="text-lg font-semibold mb-4">Segment Labeler</h4>
      <button
        onClick={addSegment}
        className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
      >
        Add Segment
      </button>
      {segments.length === 0 && <p>No segments defined yet.</p>}
      {segments.map((segment) => (
        <div
          key={segment.id}
          className="flex items-center space-x-4 mb-2 bg-white p-2 rounded border border-gray-300"
        >
          <label className="flex flex-col">
            Start Time (s)
            <input
              type="number"
              min={0}
              max={segment.endTime}
              step={0.1}
              value={segment.startTime}
              onChange={(e) =>
                updateSegment(segment.id, "startTime", parseFloat(e.target.value))
              }
              className="border border-gray-300 rounded px-2 py-1 w-24"
            />
          </label>
          <label className="flex flex-col">
            End Time (s)
            <input
              type="number"
              min={segment.startTime}
              max={audioDuration}
              step={0.1}
              value={segment.endTime}
              onChange={(e) =>
                updateSegment(segment.id, "endTime", parseFloat(e.target.value))
              }
              className="border border-gray-300 rounded px-2 py-1 w-24"
            />
          </label>
          <label className="flex flex-col">
            Tag
            <select
              value={segment.tag}
              onChange={(e) => updateSegment(segment.id, "tag", e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {predefinedTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={() => removeSegment(segment.id)}
            className="ml-auto px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
