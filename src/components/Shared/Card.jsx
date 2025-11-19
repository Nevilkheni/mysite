import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <div className={`card rounded-2xl p-6 ${className}`.trim()}>
      {children}
    </div>
  )
}
