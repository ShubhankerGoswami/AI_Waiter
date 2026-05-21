import { useId } from 'react'

export default function AIWaiterLogo({ scale = 1, className = '' }) {
  const uid = useId().replace(/:/g, '')

  // Nodes: octahedral neural-network layout (viewBox 0 0 60 72)
  const nodes = [
    { x: 30, y: 5  },  // 0 top
    { x: 7,  y: 22 },  // 1 upper-left
    { x: 53, y: 20 },  // 2 upper-right
    { x: 28, y: 36 },  // 3 center
    { x: 9,  y: 52 },  // 4 lower-left
    { x: 51, y: 52 },  // 5 lower-right
    { x: 28, y: 65 },  // 6 bottom
  ]

  const edges = [
    [0,1],[0,2],[0,3],
    [1,2],[1,3],[1,4],
    [2,3],[2,5],
    [3,4],[3,5],[3,6],
    [4,5],[4,6],
    [5,6],
    [1,5],[2,4],          // cross diagonals
  ]

  const iconW = 52 * scale
  const iconH = 62 * scale

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Neural network SVG icon */}
      <svg width={iconW} height={iconH} viewBox="0 0 60 72" fill="none">
        <defs>
          {/* Edge gradient: orange → white */}
          <linearGradient id={`${uid}eg`} x1="0" y1="0" x2="60" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#f97316" />
            <stop offset="55%"  stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ffffff"  stopOpacity="0.9" />
          </linearGradient>
          {/* Node gradient: white center → orange rim */}
          <radialGradient id={`${uid}ng`} cx="38%" cy="32%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f97316" />
          </radialGradient>
          {/* Soft glow on nodes */}
          <filter id={`${uid}glow`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke={`url(#${uid}eg)`}
            strokeWidth="1.6"
            strokeOpacity="0.75"
            strokeLinecap="round"
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x} cy={n.y}
            r={i === 3 ? 4.5 : 3}
            fill={`url(#${uid}ng)`}
            filter={`url(#${uid}glow)`}
          />
        ))}
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-none gap-1">
        <span
          className="font-bold tracking-tight"
          style={{
            fontSize: `${26 * scale}px`,
            lineHeight: 1,
            background: 'linear-gradient(120deg, #f97316 0%, #fb923c 45%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AI Waiter
        </span>
        <span
          className="text-gray-400 font-medium tracking-widest uppercase"
          style={{ fontSize: `${9 * scale}px` }}
        >
          being cogni
        </span>
      </div>
    </div>
  )
}
