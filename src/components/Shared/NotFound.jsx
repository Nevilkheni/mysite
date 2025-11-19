import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-4">
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h1 className="text-4xl font-extrabold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
          <p className="text-gray-600 mb-6">The page you requested does not exist or has been moved.</p>
          <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Go back home</Link>
        </div>
      </div>
    </div>
  )
}
