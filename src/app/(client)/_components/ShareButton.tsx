"use client";

import React, { useState, useEffect } from "react";
import { FiShare2 } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaTwitter } from "react-icons/fa";

const ShareButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  // Pegar URL atual no client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleShare = (platform?: "whatsapp" | "facebook" | "twitter") => {
    if (!url) return;

    // Mobile: Web Share API
    if (navigator.share && !platform) {
      navigator.share({ url }).catch((err) => console.error(err));
      return;
    }

    // Desktop: URLs de compartilhamento
    const encodedURL = encodeURIComponent(url);
    let shareURL = "";

    switch (platform) {
      case "whatsapp":
        shareURL = `https://api.whatsapp.com/send?text=${encodedURL}`;
        break;
      case "facebook":
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
        break;
      case "twitter":
        shareURL = `https://twitter.com/intent/tweet?url=${encodedURL}`;
        break;
      default:
        return;
    }

    window.open(shareURL, "_blank", "width=600,height=400");
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Botão principal */}
      <div
        className="hoverEffect flex cursor-pointer items-center gap-2 text-xs text-black hover:text-red-600"
        onClick={() => setOpen(!open)}
      >
        <FiShare2 className="text-lg" />
        <p>Partilhar</p>
      </div>

      {/* Menu dropdown */}
      {open && (
        <div className="absolute top-full z-10 mt-1 flex flex-col gap-1 rounded bg-white p-2 shadow-lg">
          <button
            onClick={() => handleShare("whatsapp")}
            className="flex items-center gap-2 rounded px-2 py-1 text-gray-700 hover:text-green-600"
          >
            <FaWhatsapp /> WhatsApp
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="flex items-center gap-2 rounded px-2 py-1 text-gray-700 hover:text-blue-600"
          >
            <FaFacebookF /> Facebook
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="flex items-center gap-2 rounded px-2 py-1 text-gray-700 hover:text-blue-400"
          >
            <FaTwitter /> Twitter
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
