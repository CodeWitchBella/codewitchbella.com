import { Technical } from '../components/landing-page/landing-page-technical'
import type { PropsWithChildren } from 'react'
import css from '../components/landing-page/landing-page.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: css,
    },
  ]
}

export default function Index() {
  return (
    <>
      <h1>Isabella Skořepová</h1>
      <div className="img">
        <img src="/static/avatar3_cropped.png" />
      </div>
      <p>
        Člověk by řekl, že když dělám webovky už několik let, že budu mít hezčí
        stránky...
        <br />
        Ale co naplat. Kovářova kobyla chodí bosa 😆
      </p>
      <ul>
        <li>
          <Link href="https://brehoni.cz">Stránky našeho oddílu Brehoni</Link>
        </li>
        <li>
          <Link href="https://isbl.cz/zpevnik">Zpěvník (funguje offline)</Link>
        </li>
        <li>
          <Link href="https://github.com/CodeWitchBella/itt2021-host#readme">
            Host
          </Link>
        </li>
        <li>
          <Link href="https://isbl.cz/mantinely">mantinelydemokracie.cz</Link>{' '}
          (archiv)
        </li>
        <li>
          Reflektor{' '}
          <Link href="https://isbl.cz/reflektor-android">Google Play</Link>{' '}
          <Link href="https://isbl.cz/reflektor-ios">App Store</Link>
        </li>
        <li>
          <Link href="https://ok1kvk.cz/tag/vse/1/">ok1kvk.cz</Link>
        </li>
        <li>
          <Link href="https://rekonstrukcestatu.cz/">
            Rekonstrukce státu.cz
          </Link>{' '}
          (předchozí verze)
        </li>
        <li>
          Profil na <Link href="https://isbl.cz/gitlab">GitLab.com</Link> a{' '}
          <Link href="https://isbl.cz/github">GitHub</Link>
        </li>
        <li>A další neveřejné projekty</li>
      </ul>
      <Technical />
    </>
  )
}

function Link({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  )
}
