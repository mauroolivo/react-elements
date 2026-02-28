import Toggle from '@/components/extensions/Toggle';

type ExtensionItem = {
  name: string;
  version: string;
  description: string;
  id: string;
  links: string;
  icon: string;
};

const extensions: ExtensionItem[] = [
  {
    name: 'axe DevTools - Web Accessibility Tes...',
    version: '4.122.1',
    description:
      'Accessibility Checker for Developers, Testers, and Designers in Chrome',
    id: 'lhdoppojpmngadmnlndnejefpokejbdd',
    links: 'Esamina visualizzazioni service worker',
    icon: 'ax',
  },
  {
    name: 'Documenti Google offline',
    version: '1.101.1',
    description:
      'Modifica, crea e visualizza documenti, fogli di lavoro e presentazioni, senza accesso a Internet.',
    id: 'ghbmnnjooekpmoecnnnilnnbdlolhkhi',
    links: 'Esamina visualizzazioni service worker (Non a...',
    icon: 'G',
  },
  {
    name: 'MetaMask',
    version: '13.16.4',
    description: 'Estensione Browser Ethereum',
    id: 'nkbihfbeogaeaoehlefnkodbefgpgknn',
    links: 'Esamina visualizzazioni service work...  Altre 1...',
    icon: '🦊',
  },
  {
    name: 'React Developer Tools',
    version: '7.0.1 (10/20/2025)',
    description:
      'Adds React debugging tools to the Chrome Developer Tools. Created from revision 3cde211b0c on 10/20/2025.',
    id: 'fmkadmapgofadopljbjfkapdkoienihi',
    links: 'Esamina visualizzazioni service worker',
    icon: '⚛️',
  },
  {
    name: 'Wappalyzer - Technology profiler',
    version: '6.10.89',
    description: 'Identify web technologies',
    id: 'gppongmhjkpfnbhagpmjfkanntfbllamg',
    links: 'Esamina visualizzazioni service worker',
    icon: '◈',
  },
];

function ExtensionCard({ extension }: { extension: ExtensionItem }) {
  return (
    <article className="flex min-h-60 flex-col rounded-2xl border border-slate-700/80 bg-slate-800/70 p-4 shadow-lg shadow-black/10 sm:p-5">
      <div className="mb-3 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-600 bg-slate-900 text-xl">
          {extension.icon}
        </div>
        <div>
          <h3 className="text-base leading-6 font-medium text-slate-100 sm:text-lg">
            {extension.name}{' '}
            <span className="text-slate-300">{extension.version}</span>
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {extension.description}
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-1 text-sm text-slate-300">
        <p>ID: {extension.id}</p>
        <p className="truncate text-blue-300 underline decoration-blue-300/70 underline-offset-2">
          {extension.links}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          className="rounded-full border border-blue-500 px-4 py-1.5 text-sm font-medium text-blue-200 transition hover:bg-blue-500/15"
        >
          Dettagli
        </button>
        <button
          type="button"
          className="rounded-full border border-blue-500 px-4 py-1.5 text-sm font-medium text-blue-200 transition hover:bg-blue-500/15"
        >
          Rimuovi
        </button>
        <div className="ml-auto">
          <Toggle />
        </div>
      </div>
    </article>
  );
}

export default function ExtensionsPage() {
  return (
    <section className="min-h-full text-slate-100">
      <header className="mb-6 flex flex-wrap items-center gap-4 xl:flex-nowrap">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">◔</span>
          <h1 className="text-2xl font-semibold sm:text-3xl">Estensioni</h1>
        </div>

        <div className="order-3 w-full xl:order-2 xl:mx-auto xl:max-w-3xl">
          <label htmlFor="extensions-search" className="sr-only">
            Cerca tra le estensioni
          </label>
          <input
            id="extensions-search"
            readOnly
            value="🔍  Cerca tra le estensioni"
            className="w-full rounded-full border border-blue-500/90 bg-slate-900/80 px-6 py-3 text-slate-300 outline-none"
          />
        </div>

        <div className="order-2 ml-auto flex items-center gap-4 xl:order-3">
          <span className="text-sm text-slate-200">Modalità sviluppatore</span>
          <Toggle />
        </div>
      </header>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        {[
          'Carica estensione non pacchettizzata',
          'Crea pacchetto estensione',
          'Aggiorna',
        ].map((label) => (
          <button
            key={label}
            type="button"
            className="rounded-full border border-blue-500 px-5 py-2 font-medium text-blue-200 transition hover:bg-blue-500/15"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
          <nav className="space-y-2">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl bg-blue-400/70 px-4 py-3 text-left font-medium text-slate-900"
            >
              <span>🧩</span>
              <span>Le mie estensioni</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-medium text-slate-200 hover:bg-slate-800/70"
            >
              <span>⌨️</span>
              <span>Scorciatoie da tastiera</span>
            </button>
          </nav>

          <div className="my-6 border-t border-slate-700" />

          <p className="text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Sviluppi estensioni? Ricevi aggiornamenti sulle <u>novità</u> nella
            documentazione per gli sviluppatori delle estensioni di Chrome.
          </p>

          <div className="my-6 border-t border-slate-700" />

          <a className="text-base text-slate-200 underline sm:text-lg" href="#">
            Scopri altri temi ed estensioni sul Chrome Web Store
          </a>
        </aside>

        <section>
          <h2 className="mb-4 text-2xl font-medium sm:text-3xl">
            Tutte le estensioni
          </h2>
          <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {extensions.map((extension) => (
              <ExtensionCard key={extension.id} extension={extension} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
