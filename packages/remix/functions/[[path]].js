export async function onRequest(context) {
  const { createPagesFunctionHandler } = await import(
    '@remix-run/cloudflare-pages'
  )

  const build = await import('../build')

  const handleRequest = createPagesFunctionHandler({ build })
  return handleRequest(context)
}
