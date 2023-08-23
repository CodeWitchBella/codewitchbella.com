import { Splines, styles } from "~/components/splines/splines";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function SplinesRoute() {
  return <Splines />;
}
