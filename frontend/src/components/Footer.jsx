"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-gray-800 dark:text-gray-200 py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-100 dark:text-gray-50">
            Connect with Us
          </h3>
        </div>

        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-200 transition duration-200"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-200 transition duration-200"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-200 transition duration-200"
            aria-label="Instagram"
          >
            Instagram
          </a>
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()} Your College Name. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
