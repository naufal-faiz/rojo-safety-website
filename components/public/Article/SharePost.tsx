"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SharePostProps {
  title?: string;
  slug?: string;
  category?: string;
}

const SharePost = ({ title = "", slug = "", category = "" }: SharePostProps) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareUrl = currentUrl || (slug ? `https://rojosafety.com/artikel/${slug}` : "");
  const shareTitle = title || "Artikel Rojo Safety";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <div className="mt-11 border-t border-stroke pt-8 dark:border-strokedark">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Social Share Icons */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-black dark:text-white">
            Bagikan:
          </span>
          <div className="flex items-center gap-2">
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-white text-[#1877F2] shadow-xs transition-all hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white dark:border-strokedark dark:bg-black"
              title="Bagikan ke Facebook"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X (Twitter)"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-white text-black shadow-xs transition-all hover:border-black hover:bg-black hover:text-white dark:border-strokedark dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
              title="Bagikan ke X"
            >
              <svg
                className="h-3.5 w-3.5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-white text-[#25D366] shadow-xs transition-all hover:border-[#25D366] hover:bg-[#25D366] hover:text-white dark:border-strokedark dark:bg-black"
              title="Bagikan ke WhatsApp"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-white text-[#0A66C2] shadow-xs transition-all hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white dark:border-strokedark dark:bg-black"
              title="Bagikan ke LinkedIn"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              type="button"
              aria-label="Copy Article Link"
              className="relative group flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-white text-black shadow-xs transition-all hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:bg-black dark:text-white dark:hover:border-primary dark:hover:bg-primary"
              title="Salin tautan artikel"
            >
              <svg
                className="h-4 w-4 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>

              {/* Tooltip on copied */}
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-[11px] font-medium text-white shadow-sm dark:bg-white dark:text-black">
                  Tersalin!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-black dark:text-white">
            Kategori:
          </span>
          {category ? (
            <Link
              href={`/artikel/kategori/${category}`}
              className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-black transition-colors hover:bg-primary hover:text-white dark:bg-strokedark dark:text-white dark:hover:bg-primary"
            >
              #{category}
            </Link>
          ) : (
            <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-black dark:bg-strokedark dark:text-white">
              #rojosafety
            </span>
          )}
          <Link
            href="/artikel"
            className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-black transition-colors hover:bg-primary hover:text-white dark:bg-strokedark dark:text-white dark:hover:bg-primary"
          >
            #k3
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharePost;
