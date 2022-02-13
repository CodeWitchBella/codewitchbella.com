import { PropsWithChildren, useEffect, useState } from 'react'
import { Scripts } from 'remix'

export function ClientOnly({ children }: PropsWithChildren<{}>) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    shim()
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <>
        <Scripts />
        <Loading />
      </>
    )
  }

  return (
    <>
      <Scripts />
      {children}
    </>
  )
}

export function Loading() {
  return <div>Loading...</div>
}

function shim() {
  window.global = window
}
