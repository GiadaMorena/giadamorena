# Giada Morena — Portfolio

Sito statico HTML con CSS Tailwind compilato. La tagline e lo stile italiano/inglese sono mantenuti.

## Build e pubblicazione

```sh
npm ci
npm run build
```

La cartella `dist/` contiene esclusivamente le pagine e le risorse da pubblicare. Netlify usa `netlify.toml`: build `npm run build`, publish `dist`. Per un caricamento manuale, pubblicare il contenuto di `dist/`.

Per vedere il progetto: `python -m http.server 8080 --bind 127.0.0.1`, poi aprire `http://127.0.0.1:8080/dist/`.

## Contenuti e verifica

I progetti descrivono obiettivi, ruoli e output già presenti nel portfolio: nessuna metrica inventata. La sezione Data presenta il lavoro dello stage, non un caso studio quantitativo.

Il form rimane gestito da Netlify Forms, con campo antispam e pagina di conferma `/grazie.html`. Riconoscimento del form, ricezione e notifiche email devono essere verificati dopo il deploy su Netlify.

Le immagini utilizzate sono WebP; gli originali sono conservati nel progetto. `optimize_images.py` può rigenerare le immagini e richiede Pillow. Il video GSocial viene caricato su richiesta.

Didascalie fotografiche confermate: Como Women–Inter, Real Meda, Como Women–Milan, Como Women–Juventus, Meda–Casteggio, Giro d’Italia 2025; Shooting 01–02 Miho sushi, 03–06 Neofisio.

Su telefono il modulo Contatti precede i dettagli anche nell’ordine HTML, per mantenere coerenti lettura e navigazione da tastiera.
