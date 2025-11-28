import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-6 text-center text-gray-500">
      <div className="flex justify-center gap-4 mb-2">
        <a href="https://facebook.com" target="_blank" className="hover:text-blue-600">Facebook</a>
        <a href="https://twitter.com" target="_blank" className="hover:text-blue-400">Twitter</a>
        <a href="https://instagram.com" target="_blank" className="hover:text-pink-500">Instagram</a>
      </div>
      <div>© {new Date().getFullYear()} TaskFlow</div>
    </footer>
  );
}
