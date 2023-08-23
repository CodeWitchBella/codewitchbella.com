import { Link } from "@remix-run/react";

export default function Demos() {
  return (
    <ul className="prose max-w-prose mx-auto mt-8">
      <li>
        <Link to="/splines">Kochanek-Bartels Spline</Link>
      </li>
      <li>
        <Link to="/graham">Graham's convex hull algorithm</Link>
      </li>
    </ul>
  );
}
