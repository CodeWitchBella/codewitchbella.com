export const loader = () => {
  const disallow = [
    "Mediapartners-Google",
    "SemrushBot",
    "Pinterestbot",
    "AhrefsBot",
    "dotbot",
    "Semrush",
    "GPTBot",
    "ChatGPT-User",
    "Google-Extended",
    "PerplexityBot",
    "Amazonbot",
    "ClaudeBot",
    "anthropic-ai",
    "Claude-Web",
    "Omgilibot",
    "Applebot",
    "Bytespider",
    "Diffbot",
    "ImagesiftBot",
    "Omgili",
    "YouBot",
    "CCBot",
  ];
  const robotText =
    disallow.map((v) => `User-agent: ${v}\nDisallow: /`).join("\n\n") +
    `\n\nUser-agent: *\nAllow: /\n`;
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
