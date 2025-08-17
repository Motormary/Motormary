import React from 'react'

type CircularProgressProps = {
  value: string | number // 0–100
  label: string
  children?: React.ReactNode
}

export default function CircularProgress({
  value,
  label,
  children,
}: CircularProgressProps) {
  const size = 300
  const radius = size / 3
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Number(value ?? 0) / 100) * circumference
  const stroke = 40

  return (
    <div className="relative w-min space-y-1">
      <svg
        width={size}
        height={size / 2}
        viewBox={`0 ${size / 2} ${size} ${size / 2}`}
        className="rotate-180"
      >
        <defs>
          <linearGradient
            id="progress-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="red" />
            <stop offset="25%" stopColor="yellow" />
            <stop offset="100%" stopColor="green" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#444"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progress-gradient)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <p
        title={label}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 text-2xl font-semibold max-w-[100px] truncate"
      >
        {label}
      </p>
      {children}
    </div>
  )
}
