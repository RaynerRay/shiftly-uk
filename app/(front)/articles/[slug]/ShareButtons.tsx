"use client";

import React from "react";
import { Twitter, Facebook, Linkedin, Link } from "lucide-react";

export function ShareButtons({ url, title }: { url: string, title: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div className="flex gap-4">
      <a 
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5 text-gray-600" />
      </a>
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5 text-gray-600" />
      </a>
      <a 
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5 text-gray-600" />
      </a>
      <button 
        onClick={copyToClipboard}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Copy link"
      >
        <Link className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}