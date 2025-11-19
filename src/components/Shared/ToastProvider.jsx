import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

let idCounter = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const showToast = useCallback(({ title, message, type = 'success', timeout = 5000, meta } = {}) => {
    const id = idCounter++
    setToasts((t) => [{ id, title, message, type, meta }, ...t])
    if (timeout > 0) setTimeout(() => removeToast(id), timeout)
    return id
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-3 w-80">
        {toasts.map((toast) => (
          <div key={toast.id} className={`flex items-start space-x-3 p-3 rounded-lg shadow-lg bg-white border ${toast.type === 'error' ? 'border-red-200' : 'border-gray-100'}`}>
            <div className="shrink-0 mt-1">
              {toast.type === 'error' ? (
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              )}
            </div>
            <div className="flex-1">
              {toast.title && <div className="font-semibold text-gray-900">{toast.title}</div>}
              {toast.message && <div className="text-sm text-gray-600">{toast.message}</div>}
              {toast.meta && toast.meta.url && (
                <div className="mt-2 flex items-center space-x-2">
                  <a href={toast.meta.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600">Open</a>
                  <button
                    onClick={() => navigator.clipboard?.writeText(toast.meta.url)}
                    className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>
            <div>
              <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastProvider
