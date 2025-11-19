import React from 'react'

export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="h-auto my-20 flex items-center justify-center">
      <div className="w-full max-w-7xl px-4">
        <div className="flex items-center justify-center space-x-4 card rounded-xl p-6">
          <svg
            aria-hidden="true"
            className="w-8 h-8 animate-spin"
            viewBox="0 0 100 100"
            fill="none"
            style={{ color: 'var(--btn-text)' }}
          >
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" strokeOpacity="0.25" />
            <path d="M90 50a40 40 0 10-12.9 29.1" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{label}</span>
        </div>
      </div>
    </div>
  )
}
