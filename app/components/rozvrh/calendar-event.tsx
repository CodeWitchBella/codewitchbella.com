import type { ReactNode, PropsWithChildren } from 'react';
import React, { useContext, createContext } from 'react'

export function CalEvent({
  title,
  time,
  children,
  type,
}: {
  title: string
  time: string
  type: 'lecture' | 'seminar' | 'lab'
  children?: ReactNode
}) {
  const ctx = useContext(eventContext)
  const subject = ctx.subjects[title]
  return (
    <Event>
      <div className="bold">
        {title}{' '}
        {!ctx.czech
          ? type
          : type === 'lecture'
          ? 'přednáška'
          : type === 'seminar'
          ? 'cvičení'
          : 'laboratoř'}
      </div>
      <div>{time}</div>
      {ctx.showTitles ? (
        <div>
          {ctx.czech ? subject?.name : subject?.enname ?? subject?.name ?? ''}
        </div>
      ) : null}
      {ctx.deets ? (
        <>
          {subject?.deets}
          <div>{children}</div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </Event>
  )
}

function Event({ children }: PropsWithChildren<{}>) {
  return <div className="event">{children}</div>
}

const eventContext = createContext({
  subjects: {} as {
    [key: string]:
      | { name: string; longcode: string; enname?: string; deets: JSX.Element }
      | undefined
  },
  showTitles: false,
  czech: true,
  deets: false,
  room: false,
})
export const EventProvider = eventContext.Provider

export function En({ children }: { children: ReactNode }) {
  const ctx = useContext(eventContext)
  if (ctx.czech) return null
  return <>{children}</>
}

export function Cz({ children }: { children: ReactNode }) {
  const ctx = useContext(eventContext)
  if (!ctx.czech) return null
  return <>{children}</>
}

export function Room({ children }: { children: ReactNode }) {
  const ctx = useContext(eventContext)
  if (!ctx.room) return null
  return <>{children}</>
}

export function Deets({ children }: { children: ReactNode }) {
  const ctx = useContext(eventContext)
  if (!ctx.deets) return null
  return <>{children}</>
}
