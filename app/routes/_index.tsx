import { Link } from "@remix-run/react";
import { Technical } from "../components/landing-page/landing-page-technical";
import type { PropsWithChildren } from "react";
import { prose } from "~/components/css";
import blob from '../components/blobanimation.svg'

export default function Index() {
  return (
    <>
      <section>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="flex flex-wrap items-center mx-auto max-w-7xl relative">
            <img src={blob} width={850} className="absolute -top-48 -left-48 pointer-events-none" alt="" />
            <div className="relative w-full lg:max-w-lg lg:w-1/2 rounded-xl">
              <picture>
                <source
                  srcSet="/static/avatar3_cropped_512.jpg 1x, /static/avatar3_cropped_1024.jpg 2x"
                  type="image/jpeg"
                />
                <img
                  className="object-cover object-center mx-auto rounded-lg shadow-2xl"
                  alt="hero"
                  src="/static/avatar3_cropped.png"
                />
              </picture>
            </div>
            <div className="flex flex-col items-start mt-12 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
              <span className="text-sm font-bold tracking-widest text-rose-600 dark:text-rose-300 uppercase">
                Ing.
              </span>
              <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 dark:text-neutral-200 md:text-7xl lg:text-5xl">
                Isabella Skořepová
              </h1>
              <p className="mb-8 text-base leading-relaxed text-left text-gray-500 dark:text-neutral-300">
                Mám stránky, mám stránky. Nic moc tu není, ale už to nevypadá
                vyloženě hnusně. Jenom trochu 😄️️️️️️
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/blog"
                  className="inline-flex items-center font-semibold text-rose-600 dark:text-rose-300 lg:mb-0 hover:text-rose-800 dark:hover:text-rose-500"
                >
                  Blog »
                </Link>
                <Link
                  to="/demos"
                  className="inline-flex items-center font-semibold text-rose-600 dark:text-rose-300 lg:mb-0 hover:text-rose-800 dark:hover:text-rose-500"
                >
                  Demos »
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="px-4 sm:pl-6 md:pl-14">
        <section className="max-w-prose lg:mx-auto">
          <Timeline>
            <TimelineItem
              date="Září 2022 — současnost"
              title="Stránky našeho oddílu Brehoni"
            >
              <ExternalLink href="https://brehoni.cz">brehoni.cz</ExternalLink>
            </TimelineItem>
            <TimelineItem date="Červen 2018 — současnost" title="Zpěvník">
              <p className="mb-0">
                Více jak 250 písní, funguje offline včetně fulltext vyhledávání.
                Má light a dark mode, kolekce písní a umí generovat PDF. Česká a
                anglická jazyková mutace. Dlouhodobě udržovaný projekt.
              </p>
              <ExternalLink href="https://zpevnik.skorepova.info">
                zpevnik.skorepova.info
              </ExternalLink>
            </TimelineItem>
            <TimelineItem date="2021" title="Host">
              <p className="mb-0">
                Multiplayer VR experience. Vytvořeno v rámci předmětu ITT.
                Obsahuje motion capture data.
              </p>
              <ExternalLink href="https://github.com/CodeWitchBella/itt2021-host#readme">
                Github Repozitář
              </ExternalLink>
            </TimelineItem>
            <TimelineItem title="Rekonstrukce státu" date="2018 — 2021">
              <p>
                Webová prezentace{" "}
                <ExternalLink href="https://rekonstrukcestatu.cz">
                  rekonstrukcestatu.cz
                </ExternalLink>{" "}
                včetně CMS a migrace z existujícího řešení. Dále obsahovalo
                hodnocení politiků, který je stále jednou za čas obnoven a
                použit. V současnosti nedostupné.
              </p>
            </TimelineItem>
            <TimelineItem title="Reflektor" date="2018 — 2021">
              <p>
                React Native aplikace pro Android a iOS. Stále dostupné, ale už
                neudržované.
              </p>
            </TimelineItem>
            <TimelineItem date="May 2018" title="Mantinely Demokracie">
              <p>
                Webová prezentace projektu Rekonstrukce státu včetně
                jednoduchého CMS a interaktivního generátoru sdílitelných
                grafik. V současnosti nedostupné.
              </p>
            </TimelineItem>
            <TimelineItem title="ok1kvk.cz" date="2015">
              <p className="mb-0">
                Webové stránky pro radioamatérský klub OK1KVK. Nadále je udržuji
                v chodu, ale základní strukturu jsem již dlouho neupravila.
              </p>
              <ExternalLink href="https://ok1kvk.cz">ok1kvk.cz</ExternalLink>
            </TimelineItem>
          </Timeline>
        </section>
      </div>
      <section className={prose+" max-w-prose mx-auto"}>
        <ul>
          <li>
            Profil na{" "}
            <ExternalLink href="https://isbl.cz/gitlab">
              GitLab.com
            </ExternalLink>{" "}
            a <ExternalLink href="https://isbl.cz/github">GitHub</ExternalLink>
          </li>
          <li>A další neveřejné projekty</li>
        </ul>
      </section>
      <Technical />
    </>
  );
}

function TimelineItem({
  date,
  title,
  children,
}: {
  date: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="mb-10 ml-4">
      <div className="absolute w-3 h-3 bg-slate-500 rounded-full mt-1.5 -left-1.5 dark:bg-slate-500"></div>
      <time className="mb-1 text-sm font-normal leading-none text-slate-700 dark:text-slate-400">
        {date}
      </time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <div className={prose}>{children}</div>
    </li>
  );
}

function Timeline({ children }: { children: React.ReactNode }) {
  // https://flowbite.com/docs/components/timeline/
  return (
    <ol className="relative border-l dark:border-gray-600 border-slate-400">
      {children}
    </ol>
  );
}

function ExternalLink({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}
