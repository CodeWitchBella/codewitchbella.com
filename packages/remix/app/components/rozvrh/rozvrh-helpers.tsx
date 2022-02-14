import { useCallback } from 'react'
import { useSearchParams } from 'remix'

export function useEn() {
  const [params, setParams] = useSearchParams()

  const current = params.get('lang') === 'en'
  return [
    current,
    useCallback(() => {
      const copy = new URLSearchParams(params)
      if (current) {
        copy.delete('lang')
      } else {
        copy.set('lang', 'en')
      }
      setParams(copy, { replace: true })
    }, [current, params, setParams]),
  ] as const
}

function useQueryParam(param: string) {
  const [params, setParams] = useSearchParams()

  return [
    params.get(param),
    useCallback(
      (value: string | null) => {
        console.log('setParam', param, value)
        const copy = new URLSearchParams(params)
        if (value === null) {
          copy.delete(param)
        } else {
          copy.set(param, value)
        }
        setParams(Object.fromEntries(copy.entries()), { replace: true })
      },
      [params, setParams, param]
    ),
  ] as const
}

export function useBooleanQueryParam(param: string, deflt: boolean) {
  const [v, setV] = useQueryParam(param)
  return [
    deflt ? v !== 'false' : v === 'true',
    useCallback(
      (value: boolean) => {
        setV(value ? (deflt ? null : 'true') : deflt ? 'false' : null)
      },
      [deflt, setV]
    ),
  ] as const
}
