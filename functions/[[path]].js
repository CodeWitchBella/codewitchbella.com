import * as handler from '../packages/remix/functions/[[path]].js'

export function onRequest(context) {
  return handler.onRequest(context)
}
