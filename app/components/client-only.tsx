import type { PropsWithChildren} from 'react';
import { useEffect, useState } from 'react'
import { Scripts } from "@remix-run/react";

export function ClientOnly({ children }: PropsWithChildren<{}>) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
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
