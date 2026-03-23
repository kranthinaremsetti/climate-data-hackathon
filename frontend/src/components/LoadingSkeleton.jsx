import React from 'react'

function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`bg-slate-200 rounded-lg ${className}`}
      style={{
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }}
    />
  )
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Chart Skeleton */}
      <div className="card p-8">
        <div className="mb-8">
          <SkeletonBlock className="h-8 w-48 mb-3" />
          <SkeletonBlock className="h-4 w-64" />
        </div>
        <SkeletonBlock className="w-full h-80 mb-6" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonBlock key={i} className="h-24" />
          ))}
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-6">
            <SkeletonBlock className="h-4 w-32 mb-4" />
            <div className="space-y-3">
              <SkeletonBlock className="h-8" />
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
