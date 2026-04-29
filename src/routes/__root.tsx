import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-glow-red">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Pista não encontrada</h2>
        <Link to="/" className="mt-6 inline-block rounded bg-primary px-4 py-2 text-primary-foreground">Voltar</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google", content: "notranslate" },
      { httpEquiv: "Content-Language", content: "pt-BR" },
      { title: "KOENIGSEGG — Hipercarros Suecos" },
      { name: "description", content: "Toda a linhagem Koenigsegg. CC8S ao Jesko." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="notranslate dark" translate="no">
      <head>
        <HeadContent />
      </head>
      <body className="notranslate" translate="no">
        {children}
        <Scripts />
        <NoSaveScript />
      </body>
    </html>
  );
}

function NoSaveScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('contextmenu', function(e){
            var t=e.target; if(t && (t.tagName==='IMG' || t.tagName==='VIDEO')) e.preventDefault();
          });
          document.addEventListener('dragstart', function(e){
            var t=e.target; if(t && (t.tagName==='IMG' || t.tagName==='VIDEO')) e.preventDefault();
          });
          // Override media session metadata (browser media notification)
          (function(){
            function setMeta(){
              try {
                if ('mediaSession' in navigator) {
                  var blackArt = 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="#000"/></svg>');
                  navigator.mediaSession.metadata = new MediaMetadata({
                    title: 'Koenigsegg Jesko',
                    artist: 'Absolut',
                    album: '',
                    artwork: [
                      { src: blackArt, sizes: '512x512', type: 'image/svg+xml' }
                    ]
                  });
                }
              } catch(e) {}
            }
            setMeta();
            document.addEventListener('play', setMeta, true);
            setInterval(setMeta, 2000);
          })();
        `,
      }}
    />
  );
}
