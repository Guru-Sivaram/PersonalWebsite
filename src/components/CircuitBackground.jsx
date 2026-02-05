import './CircuitBackground.css'

// Radius for smooth quadratic bends (clamped so we don't overshoot short segments)
const BEND_R = 10

// Horizontal then vertical then horizontal, with Q curves at bends
function wirePath(from, to) {
  const midX = (from.x + to.x) / 2
  const r = Math.max(0, Math.min(BEND_R, Math.abs(midX - from.x) / 2, Math.abs(to.y - from.y) / 2, Math.abs(to.x - midX) / 2))
  if (r <= 0) return `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`
  const horz1 = midX >= from.x ? 1 : -1
  const vert = to.y >= from.y ? 1 : -1
  const horz2 = to.x >= midX ? 1 : -1
  return `M ${from.x} ${from.y} L ${midX - horz1 * r} ${from.y} Q ${midX} ${from.y} ${midX} ${from.y + vert * r} L ${midX} ${to.y - vert * r} Q ${midX} ${to.y} ${midX + horz2 * r} ${to.y} L ${to.x} ${to.y}`
}

// Vertical then horizontal then vertical, with Q curves at bends
function wirePathAlt(from, to) {
  const midY = (from.y + to.y) / 2
  const r = Math.max(0, Math.min(BEND_R, Math.abs(midY - from.y) / 2, Math.abs(to.x - from.x) / 2, Math.abs(to.y - midY) / 2))
  if (r <= 0) return `M ${from.x} ${from.y} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${to.y}`
  const vert1 = midY >= from.y ? 1 : -1
  const horz = to.x >= from.x ? 1 : -1
  const vert2 = to.y >= midY ? 1 : -1
  return `M ${from.x} ${from.y} L ${from.x} ${midY - vert1 * r} Q ${from.x} ${midY} ${from.x + horz * r} ${midY} L ${to.x - horz * r} ${midY} Q ${to.x} ${midY} ${to.x} ${midY + vert2 * r} L ${to.x} ${to.y}`
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
  // Left-edge points (same count as right for balanced density, different layout)
  { x: 35, y: 160 }, { x: 42, y: 320 }, { x: 48, y: 460 }, { x: 38, y: 90 }, { x: 45, y: 400 },
  // Left strip top (visible left of mask, viewBox x ~100–175)
  { x: 108, y: 55 }, { x: 124, y: 95 }, { x: 140, y: 135 }, { x: 156, y: 175 }, { x: 118, y: 210 },
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
  // Left-edge wires (same density as right, different connections)
  { from: 0, to: 69, color: 1, duration: 2.6, delay: 0.3 },
  { from: 69, to: 70, color: 2, duration: 2.9, delay: 0.5 },
  { from: 70, to: 71, color: 3, duration: 3.1, delay: 0.2 },
  { from: 58, to: 69, color: 4, duration: 3.4, delay: 0.6 },
  { from: 1, to: 69, color: 5, duration: 2.8, delay: 0.1 },
  { from: 9, to: 70, color: 6, duration: 3.2, delay: 0.4 },
  { from: 33, to: 71, color: 7, duration: 2.7, delay: 0.2 },
  { from: 58, to: 72, color: 8, duration: 2.8, delay: 0.2 },
  { from: 72, to: 69, color: 9, duration: 2.6, delay: 0.4 },
  { from: 70, to: 73, color: 10, duration: 3, delay: 0.1 },
  { from: 73, to: 71, color: 1, duration: 2.9, delay: 0.5 },
  // Left strip top (more wires left of mask, toward top)
  { from: 0, to: 74, color: 2, duration: 2.6, delay: 0.2 },
  { from: 74, to: 75, color: 3, duration: 2.8, delay: 0.4 },
  { from: 75, to: 76, color: 4, duration: 3, delay: 0.1 },
  { from: 76, to: 77, color: 5, duration: 2.7, delay: 0.5 },
  { from: 77, to: 78, color: 6, duration: 2.9, delay: 0.3 },
  { from: 78, to: 36, color: 7, duration: 3.2, delay: 0.1 },
  { from: 4, to: 74, color: 8, duration: 2.8, delay: 0.6 },
  { from: 75, to: 58, color: 9, duration: 3.1, delay: 0.2 },
  { from: 77, to: 46, color: 10, duration: 2.5, delay: 0.4 },
  { from: 74, to: 78, color: 1, duration: 3.4, delay: 0.15 },
]

// Build paths: alternate wirePath / wirePathAlt for visual variety
function buildPath(fromIdx, toIdx, useAlt) {
  const from = POINTS[fromIdx]
  const to = POINTS[toIdx]
  return useAlt ? wirePathAlt(from, to) : wirePath(from, to)
}

// Spread delays 0–1.5s so pulses don't start in sync (more organic)
const ALL_WIRES = CONNECTIONS.map((c, i) => ({
  d: buildPath(c.from, c.to, i % 2 === 1),
  color: ((c.color - 1) % 10) + 1,
  duration: c.duration,
  delay: (i / Math.max(CONNECTIONS.length - 1, 1)) * 1.5,
}))

// Feeder lines from off-screen into hubs so flow "enters" the mesh (delays spread 0–1.5s)
const FEED_WIRES = [
  { d: wirePath({ x: -20, y: POINTS[0].y }, POINTS[0]), color: 1, duration: 2.5, delay: 0 },
  { d: wirePath({ x: -20, y: POINTS[17].y }, POINTS[17]), color: 3, duration: 2.8, delay: 0.2 },
  { d: wirePath({ x: POINTS[35].x, y: 570 }, POINTS[35]), color: 5, duration: 3, delay: 0.45 },
  { d: wirePath({ x: 720, y: POINTS[25].y }, POINTS[25]), color: 7, duration: 2.6, delay: 0.7 },
  { d: wirePath({ x: 720, y: POINTS[34].y }, POINTS[34]), color: 9, duration: 2.8, delay: 0.95 },
  { d: wirePath({ x: POINTS[46].x, y: -15 }, POINTS[46]), color: 2, duration: 2.4, delay: 1.15 },
  { d: wirePath({ x: POINTS[50].x, y: 570 }, POINTS[50]), color: 4, duration: 3.2, delay: 0.35 },
  { d: wirePath({ x: -20, y: POINTS[58].y }, POINTS[58]), color: 6, duration: 2.6, delay: 1.35 },
  { d: wirePath({ x: 720, y: POINTS[51].y }, POINTS[51]), color: 8, duration: 2.9, delay: 0.55 },
  { d: wirePath({ x: POINTS[62].x, y: -15 }, POINTS[62]), color: 10, duration: 2.7, delay: 1.5 },
]

const WIRES_FINAL = [...FEED_WIRES, ...ALL_WIRES]

// Vertical wires for mobile edges. ViewBox 0 0 700 550 with SVG 140% centered:
// viewport 0% ≈ viewBox x 100, viewport 100% ≈ viewBox x 500. So left strip (0–8%) ≈ x 100–132, right (92–100%) ≈ x 468–500.
const MOBILE_VERTICAL_WIRES = [
  // Left visible strip (viewBox x 100–132)
  { d: 'M 105 -20 L 105 570', color: 1, duration: 2.8, delay: 0 },
  { d: 'M 115 -20 L 115 570', color: 3, duration: 3.2, delay: 0.4 },
  { d: 'M 125 -20 L 125 570', color: 5, duration: 2.6, delay: 0.8 },
  { d: 'M 110 0 L 110 550', color: 7, duration: 3.4, delay: 0.2 },
  { d: 'M 120 0 L 120 550', color: 9, duration: 2.9, delay: 0.6 },
  // Right visible strip (viewBox x 468–500)
  { d: 'M 475 -20 L 475 570', color: 2, duration: 3, delay: 0.3 },
  { d: 'M 485 -20 L 485 570', color: 4, duration: 2.7, delay: 0.7 },
  { d: 'M 495 -20 L 495 570', color: 6, duration: 3.3, delay: 0.1 },
  { d: 'M 480 0 L 480 550', color: 8, duration: 2.5, delay: 0.5 },
  { d: 'M 490 0 L 490 550', color: 10, duration: 3.1, delay: 0.9 },
]

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
                className="circuit-trace-back"
                d={wire.d}
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ stroke: `var(--wire-${wire.color})` }}
              />
              <path
                className="circuit-trace"
                d={wire.d}
                fill="none"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ stroke: `var(--wire-${wire.color})` }}
              />
              <path
                className="circuit-pulse"
                d={wire.d}
                fill="none"
                strokeWidth="1.5"
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
        <g className="circuit-wires-mobile-vertical" aria-hidden="true">
          {MOBILE_VERTICAL_WIRES.map((wire, i) => (
            <g key={`v-${i}`}>
              <path
                className="circuit-trace-back circuit-trace-vertical"
                d={wire.d}
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ stroke: `var(--wire-${wire.color})` }}
              />
              <path
                className="circuit-trace circuit-trace-vertical"
                d={wire.d}
                fill="none"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ stroke: `var(--wire-${wire.color})` }}
              />
              <path
                className="circuit-pulse circuit-pulse-vertical"
                d={wire.d}
                fill="none"
                strokeWidth="1.5"
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
