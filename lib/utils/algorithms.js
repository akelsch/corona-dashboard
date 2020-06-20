export function douglasPeucker (points, epsilon) {
  const end = points.length - 1

  // Finde den Punkt mit dem größten Abstand
  let dmax = 0
  let index = 0
  for (let i = 1; i < end; i++) {
    const d = perpendicularDistance(points[i], points[0], points[end])
    if (d > dmax) {
      dmax = d
      index = i
    }
  }

  // Wenn die maximale Entfernung größer als Epsilon ist, dann rekursiv vereinfachen
  if (dmax > epsilon) {
    const r1 = douglasPeucker(points.slice(0, index + 1), epsilon)
    const r2 = douglasPeucker(points.slice(index), epsilon)
    return r1.slice(0, r1.length - 1).concat(r2)
  } else {
    return [points[0], points[end]]
  }
}

function perpendicularDistance ([x, y], [x1, y1], [x2, y2]) {
  const dx = x2 - x1
  const dy = y2 - y1

  // Sonderfall: Die Strecke ist ein Punkt (p1 == p2)
  if (dx === 0 && dy === 0) {
    return Math.hypot(x - x1, y - y1)
  }

  const numerator = Math.abs(dy * x - dx * y + x2 * y1 - y2 * x1)
  const denominator = Math.hypot(dy, dx)

  return numerator / denominator
}

export function webMercator (long, lat, zoom) {
  const x = (256 / (2 * Math.PI)) * (2 ** zoom) * (radians(long) + Math.PI)
  const y = (256 / (2 * Math.PI)) * (2 ** zoom) * (Math.PI - Math.log(Math.tan(Math.PI / 4 + radians(lat) / 2)))
  return [x, y]
}

function radians (degrees) {
  return degrees * (Math.PI / 180)
}
