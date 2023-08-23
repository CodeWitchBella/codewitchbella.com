// https://en.wikipedia.org/wiki/Cubic_Hermite_spline
export function cubicHermiteSpline<T extends readonly number[]>(
  t: number,
  definition: {
    point0: T
    point1: T
    tangent0: T
    tangent1: T
  }
): T {
  const t2 = t * t
  const t3 = t2 * t

  return Array.from({ length: definition.point0.length }, (_, i) =>
    cubicHermiteSplineSingle(
      t,
      t2,
      t3,
      definition.point0[i],
      definition.point1[i],
      definition.tangent0[i],
      definition.tangent1[i]
    )
  ) as any
}

function cubicHermiteSplineSingle(
  t: number,
  t2: number,
  t3: number,
  point0: number,
  point1: number,
  tangent0: number,
  tangent1: number
) {
  let acc = (2 * t3 - 3 * t2 + 1) * point0
  acc += (t3 - 2 * t2 + t) * tangent0
  acc += (-2 * t3 + 3 * t2) * point1
  acc += (t3 - t2) * tangent1
  return acc
}
