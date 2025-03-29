
import React from "react";

interface HighlightTextProps {
  text: string;
  highlight: string;
}

export function HighlightText({ text, highlight }: HighlightTextProps) {
  // If no search query, return the plain text
  if (!highlight || highlight.trim() === "") {
    return <span>{text}</span>;
  }

  // Case insensitive search
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="bg-yellow-200 font-medium rounded px-0.5">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
