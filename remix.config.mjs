/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
export default {
  future: {
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_meta: true,
    v2_headers: true,
    v2_routeConvention: true,
    v2_dev: true,
  },
  tailwind: true,
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [
    "@isbl/bcryptjs",
    "@isbl/ts-utils",
    "@isbl/react-resizer",
    "mdx-bundler",
    /^rehype.*/,
    /^remark.*/,
    /^unified.*/,
    /^(unist|hast|micromark|mdast|estree).*/,
    "lowlight",
    "fault",
  ],
};
