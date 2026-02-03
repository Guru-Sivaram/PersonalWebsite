import './CircuitBackground.css'

// Right-angle path: horizontal then vertical (one bend at midpoint)
function wirePath(from, to) {
  const midX = (from.x + to.x) / 2
  return `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`
}

// Alternative: vertical then horizontal (for variety so lines cross at different angles)
function wirePathAlt(from, to) {
  const midY = (from.y + to.y) / 2
  return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`
}

// Waypoints: shared nodes so lines interconnect. viewBox 0 0 700 550
const POINTS = [
  { x: 25, y: 75 }, { x: 55, y: 75 }, { x: 83, y: 75 }, { x: 111, y: 75 }, { x: 168, y: 115 }, { x: 194, y: 115 },
  { x: 220, y: 95 }, { x: 288, y: 87 }, { x: 316, y: 87 }, { x: 53, y: 235 }, { x: 81, y: 235 }, { x: 140, y: 235 },
  { x: 208, y: 275 }, { x: 234, y: 275 }, { x: 281, y: 252 }, { x: 328, y: 247 }, { x: 356, y: 247 },
  { x: 370, y: 130 }, { x: 400, y: 130 }, { x: 428, y: 130 }, { x: 473, y: 145 }, { x: 518, y: 145 },
  { x: 544, y: 145 }, { x: 581, y: 180 }, { x: 618, y: 180 }, { x: 646, y: 180 }, { x: 488, y: 290 },
  { x: 516, y: 290 }, { x: 537, y: 320 }, { x: 558, y: 320 }, { x: 584, y: 320 }, { x: 618, y: 325 },
  { x: 646, y: 325 }, { x: 70, y: 445 }, { x: 100, y: 445 }, { x: 142, y: 465 }, { x: 185, y: 465 },
  { x: 228, y: 420 }, { x: 270, y: 425 }, { x: 305, y: 290 }, { x: 333, y: 330 }, { x: 398, y: 330 },
  { x: 421, y: 320 }, { x: 335, y: 360 }, { x: 350, y: 327 },
  // Extra hubs so more lines meet
  { x: 170, y: 175 }, { x: 350, y: 200 }, { x: 500, y: 220 }, { x: 250, y: 350 }, { x: 450, y: 380 },
  { x: 150, y: 320 }, { x: 550, y: 280 }, { x: 200, y: 90 }, { x: 380, y: 250 }, { x: 600, y: 250 },
  { x: 100, y: 380 }, { x: 300, y: 400 }, { x: 520, y: 350 }, { x: 50, y: 280 }, { x: 650, y: 120 },
  { x: 180, y: 280 }, { x: 420, y: 170 }, { x: 280, y: 180 }, { x: 480, y: 190 },
  // Right-edge points (balance density in right mask strip)
  { x: 620, y: 80 }, { x: 635, y: 180 }, { x: 645, y: 280 }, { x: 658, y: 380 }, { x: 668, y: 480 },
  // Left-edge points (balance density in left mask strip)
  { x: 35, y: 160 }, { x: 42, y: 320 }, { x: 48, y: 460 },
]

// Connections: from point index -> to point index. Many links so lines share nodes (interconnected).
// Color 1-10, varied duration/delay.
const CONNECTIONS = [
  { from: 0, to: 1, color: 1, duration: 2.5, delay: 0 },
  { from: 1, to: 2, color: 2, duration: 2.8, delay: 0.2 },
  { from: 2, to: 4, color: 3, duration: 3, delay: 0.1 },
  { from: 4, to: 5, color: 4, duration: 2.6, delay: 0.4 },
  { from: 5, to: 7, color: 5, duration: 3.2, delay: 0.3 },
  { from: 7, to: 8, color: 6, duration: 2.4, delay: 0.5 },
  { from: 8, to: 9, color: 7, duration: 4, delay: 0.2 },
  { from: 9, to: 10, color: 8, duration: 2.8, delay: 0.6 },
  { from: 10, to: 12, color: 9, duration: 3.5, delay: 0.1 },
  { from: 12, to: 13, color: 10, duration: 2.6, delay: 0.4 },
  { from: 13, to: 15, color: 1, duration: 3.2, delay: 0.3 },
  { from: 15, to: 16, color: 2, duration: 2.8, delay: 0.7 },
  { from: 16, to: 1, color: 3, duration: 5, delay: 0.2 },
  { from: 17, to: 18, color: 4, duration: 2.5, delay: 0.5 },
  { from: 18, to: 19, color: 5, duration: 2.8, delay: 0.1 },
  { from: 19, to: 21, color: 6, duration: 3.2, delay: 0.4 },
  { from: 21, to: 22, color: 7, duration: 2.6, delay: 0.6 },
  { from: 22, to: 24, color: 8, duration: 3.5, delay: 0.2 },
  { from: 24, to: 25, color: 9, duration: 2.8, delay: 0.3 },
  { from: 25, to: 27, color: 10, duration: 3, delay: 0.5 },
  { from: 27, to: 18, color: 1, duration: 4.5, delay: 0.1 },
  { from: 26, to: 28, color: 2, duration: 3, delay: 0.4 },
  { from: 28, to: 29, color: 3, duration: 2.6, delay: 0.7 },
  { from: 29, to: 31, color: 4, duration: 3.2, delay: 0.2 },
  { from: 31, to: 32, color: 5, duration: 2.8, delay: 0.5 },
  { from: 32, to: 33, color: 6, duration: 2.4, delay: 0.3 },
  { from: 33, to: 34, color: 7, duration: 2.6, delay: 0.6 },
  { from: 34, to: 26, color: 8, duration: 4, delay: 0.2 },
  { from: 35, to: 36, color: 9, duration: 2.8, delay: 0.1 },
  { from: 36, to: 37, color: 10, duration: 3, delay: 0.4 },
  { from: 37, to: 39, color: 1, duration: 3.5, delay: 0.3 },
  { from: 39, to: 35, color: 2, duration: 4.2, delay: 0.5 },
  { from: 38, to: 40, color: 3, duration: 2.6, delay: 0.2 },
  { from: 40, to: 41, color: 4, duration: 3.2, delay: 0.6 },
  { from: 41, to: 38, color: 5, duration: 3.8, delay: 0.1 },
  // Cross-links through hub points (interconnected)
  { from: 4, to: 46, color: 6, duration: 3.5, delay: 0.4 },
  { from: 46, to: 47, color: 7, duration: 3.2, delay: 0.2 },
  { from: 47, to: 19, color: 8, duration: 4, delay: 0.5 },
  { from: 12, to: 50, color: 9, duration: 3.8, delay: 0.3 },
  { from: 50, to: 38, color: 10, duration: 4.2, delay: 0.1 },
  { from: 25, to: 51, color: 1, duration: 3.5, delay: 0.6 },
  { from: 51, to: 52, color: 2, duration: 3, delay: 0.2 },
  { from: 52, to: 36, color: 3, duration: 4.5, delay: 0.4 },
  { from: 9, to: 53, color: 4, duration: 4, delay: 0.5 },
  { from: 53, to: 35, color: 5, duration: 4.8, delay: 0.2 },
  { from: 46, to: 54, color: 6, duration: 3.2, delay: 0.7 },
  { from: 54, to: 55, color: 7, duration: 3.5, delay: 0.1 },
  { from: 55, to: 28, color: 8, duration: 4, delay: 0.3 },
  { from: 47, to: 56, color: 9, duration: 3.8, delay: 0.5 },
  { from: 56, to: 57, color: 10, duration: 3.2, delay: 0.2 },
  { from: 57, to: 31, color: 1, duration: 4.2, delay: 0.4 },
  { from: 58, to: 59, color: 2, duration: 2.8, delay: 0.6 },
  { from: 59, to: 46, color: 3, duration: 3.5, delay: 0.1 },
  { from: 60, to: 50, color: 4, duration: 3.2, delay: 0.3 },
  { from: 61, to: 52, color: 5, duration: 3.8, delay: 0.5 },
  { from: 62, to: 54, color: 6, duration: 3, delay: 0.2 },
  { from: 63, to: 56, color: 7, duration: 3.5, delay: 0.4 },
  { from: 0, to: 58, color: 8, duration: 4, delay: 0.6 },
  { from: 58, to: 53, color: 9, duration: 4.5, delay: 0.1 },
  { from: 8, to: 59, color: 10, duration: 3.2, delay: 0.3 },
  { from: 59, to: 60, color: 1, duration: 3.5, delay: 0.5 },
  { from: 16, to: 61, color: 2, duration: 3.8, delay: 0.2 },
  { from: 61, to: 62, color: 3, duration: 3, delay: 0.4 },
  { from: 27, to: 63, color: 4, duration: 4.2, delay: 0.6 },
  { from: 63, to: 55, color: 5, duration: 3.5, delay: 0.1 },
  // More interconnects
  { from: 46, to: 38, color: 6, duration: 4.5, delay: 0.3 },
  { from: 50, to: 54, color: 7, duration: 4, delay: 0.5 },
  { from: 51, to: 47, color: 8, duration: 3.8, delay: 0.2 },
  { from: 53, to: 50, color: 9, duration: 4.2, delay: 0.4 },
  { from: 55, to: 52, color: 10, duration: 3.5, delay: 0.6 },
  { from: 56, to: 58, color: 1, duration: 4, delay: 0.1 },
  { from: 57, to: 60, color: 2, duration: 3.2, delay: 0.3 },
  { from: 59, to: 61, color: 3, duration: 3.8, delay: 0.5 },
  { from: 62, to: 63, color: 4, duration: 3.5, delay: 0.2 },
  { from: 3, to: 46, color: 5, duration: 3.2, delay: 0.4 },
  { from: 6, to: 47, color: 6, duration: 3.5, delay: 0.6 },
  { from: 11, to: 50, color: 7, duration: 4, delay: 0.1 },
  { from: 14, to: 51, color: 8, duration: 3.8, delay: 0.3 },
  { from: 20, to: 54, color: 9, duration: 3.2, delay: 0.5 },
  { from: 23, to: 56, color: 10, duration: 3.5, delay: 0.2 },
  // Right-edge wires (more density on right)
  { from: 25, to: 64, color: 1, duration: 2.8, delay: 0.2 },
  { from: 64, to: 65, color: 2, duration: 3, delay: 0.4 },
  { from: 65, to: 66, color: 3, duration: 2.6, delay: 0.1 },
  { from: 66, to: 67, color: 4, duration: 3.2, delay: 0.5 },
  { from: 67, to: 68, color: 5, duration: 2.9, delay: 0.3 },
  { from: 34, to: 68, color: 6, duration: 3.5, delay: 0.6 },
  { from: 51, to: 65, color: 7, duration: 3.2, delay: 0.2 },
  { from: 59, to: 64, color: 8, duration: 2.7, delay: 0.4 },
  { from: 63, to: 67, color: 9, duration: 3.8, delay: 0.1 },
  { from: 24, to: 64, color: 10, duration: 2.5, delay: 0.5 },
  // Left-edge wires (balance left)
  { from: 0, to: 69, color: 1, duration: 2.6, delay: 0.3 },
  { from: 69, to: 70, color: 2, duration: 2.9, delay: 0.5 },
  { from: 70, to: 71, color: 3, duration: 3.1, delay: 0.2 },
  { from: 58, to: 69, color: 4, duration: 3.4, delay: 0.6 },
  { from: 1, to: 69, color: 5, duration: 2.8, delay: 0.1 },
  { from: 9, to: 70, color: 6, duration: 3.2, delay: 0.4 },
  { from: 33, to: 71, color: 7, duration: 2.7, delay: 0.2 },
]

// Build paths: alternate wirePath / wirePathAlt for visual variety
function buildPath(fromIdx, toIdx, useAlt) {
  const from = POINTS[fromIdx]
  const to = POINTS[toIdx]
  return useAlt ? wirePathAlt(from, to) : wirePath(from, to)
}

const ALL_WIRES = CONNECTIONS.map((c, i) => ({
  d: buildPath(c.from, c.to, i % 2 === 1),
  color: ((c.color - 1) % 10) + 1,
  duration: c.duration,
  delay: c.delay,
}))

// Feeder lines from off-screen into hubs so flow "enters" the mesh
const FEED_WIRES = [
  { d: wirePath({ x: -20, y: POINTS[0].y }, POINTS[0]), color: 1, duration: 2.5, delay: 0.5 },
  { d: wirePath({ x: -20, y: POINTS[17].y }, POINTS[17]), color: 3, duration: 2.8, delay: 0.8 },
  { d: wirePath({ x: POINTS[35].x, y: 570 }, POINTS[35]), color: 5, duration: 3, delay: 0.2 },
  { d: wirePath({ x: 720, y: POINTS[25].y }, POINTS[25]), color: 7, duration: 2.6, delay: 0.6 },
  { d: wirePath({ x: 720, y: POINTS[34].y }, POINTS[34]), color: 9, duration: 2.8, delay: 0.3 },
  { d: wirePath({ x: POINTS[46].x, y: -15 }, POINTS[46]), color: 2, duration: 2.4, delay: 0.4 },
  { d: wirePath({ x: POINTS[50].x, y: 570 }, POINTS[50]), color: 4, duration: 3.2, delay: 0.7 },
  { d: wirePath({ x: -20, y: POINTS[58].y }, POINTS[58]), color: 6, duration: 2.6, delay: 0.1 },
  { d: wirePath({ x: 720, y: POINTS[51].y }, POINTS[51]), color: 8, duration: 2.9, delay: 0.5 },
  { d: wirePath({ x: POINTS[62].x, y: -15 }, POINTS[62]), color: 10, duration: 2.7, delay: 0.2 },
]

const WIRES_FINAL = [...FEED_WIRES, ...ALL_WIRES]

export default function CircuitBackground() {
  return (
    <div className="circuit-background" aria-hidden="true">
      <svg
        className="circuit-svg"
        viewBox="0 0 700 550"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="circuit-wires">
          {WIRES_FINAL.map((wire, i) => (
            <g key={i}>
              <path
                className="circuit-trace"
                d={wire.d}
                fill="none"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ stroke: `var(--wire-${wire.color})` }}
              />
              <path
                className="circuit-pulse"
                d={wire.d}
                fill="none"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  stroke: `var(--wire-${wire.color}-pulse)`,
                  animationDuration: `${wire.duration}s`,
                  animationDelay: `${wire.delay}s`,
                }}
              />
            </g>
          ))}
        </g>
      </svg>
      <div className="circuit-grid" />
    </div>
  )
}
