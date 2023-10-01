import { Link } from "@remix-run/react";
import { prose } from "~/components/css";

export default function Demos() {
  return (
    <div className={prose+" max-w-prose mx-auto mt-8"}>
      <ul>
        <li>
          <Link to="/splines">Kochanek-Bartels Spline</Link>
        </li>
        <li>
          <Link to="/graham">Graham's convex hull algorithm</Link>
        </li>
      </ul>
    </div>
  );
}
