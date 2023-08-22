import { Technical } from "../components/landing-page/landing-page-technical";
import type { PropsWithChildren } from "react";

export default function Index() {
  return (
    <>
      <section>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="flex flex-wrap items-center mx-auto max-w-7xl">
            <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
              <div>
                <div className="relative w-full max-w-lg">
                  <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

                  <div className="absolute rounded-full bg-fuchsia-300 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                  <div className="relative">
                    <img
                      className="object-cover object-center mx-auto rounded-lg shadow-2xl"
                      alt="hero"
                      src="/static/avatar3_cropped.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
              <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">
                Ing.
              </span>
              <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">
                Isabella Skořepová
              </h1>
              <p className="mb-8 text-base leading-relaxed text-left text-gray-500">
                Mám stránky, mám stránky. Nic moc tu není, ale už to nevypadá
                vyloženě hnusně. Jenom trochu 😄️️️️️️
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="prose max-w-prose mx-auto">
        <ul>
          <li>
            <Link href="https://brehoni.cz">Stránky našeho oddílu Brehoni</Link>
          </li>
          <li>
            <Link href="https://isbl.cz/zpevnik">
              Zpěvník (funguje offline)
            </Link>
          </li>
          <li>
            <Link href="https://github.com/CodeWitchBella/itt2021-host#readme">
              Host
            </Link>
          </li>
          <li>
            <Link href="https://isbl.cz/mantinely">mantinelydemokracie.cz</Link>{" "}
            (archiv)
          </li>
          <li>
            Reflektor{" "}
            <Link href="https://isbl.cz/reflektor-android">Google Play</Link>{" "}
            <Link href="https://isbl.cz/reflektor-ios">App Store</Link>
          </li>
          <li>
            <Link href="https://ok1kvk.cz/tag/vse/1/">ok1kvk.cz</Link>
          </li>
          <li>
            <Link href="https://rekonstrukcestatu.cz/">
              Rekonstrukce státu.cz
            </Link>{" "}
            (předchozí verze)
          </li>
          <li>
            Profil na <Link href="https://isbl.cz/gitlab">GitLab.com</Link> a{" "}
            <Link href="https://isbl.cz/github">GitHub</Link>
          </li>
          <li>A další neveřejné projekty</li>
        </ul>
      </section>
      <Technical />
    </>
  );
}

function Link({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}
