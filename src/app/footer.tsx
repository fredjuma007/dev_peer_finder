import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-200 py-4 dark:bg-gray-900">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} DevPeerFinder. Designed by Fred Juma
      </div>
    </footer>
  );
}
