# Curated Travel & Events website

Vite + React + TypeScript + Tailwind CSS + React Router.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/, one HTML file per page
```

## Photos

The originals live in `curated-photos/`. After adding or replacing a photo there, run `npm run images` to regenerate the WebP files in `public/images/` (a full version up to 1600px wide and an 800px version for phones).

The honeymoon photo (`03-honeymoons-STAND-IN-replace-with-real-photo.jpg`) is a stand-in: replace it, keep the file name, and run `npm run images`.

## Still to fill in

- Privacy Policy: `[date]`, `[ICO reference]` and `[website host]` in `src/content/legal.ts`. They are highlighted on the page until filled in.
- Enquiry form: it does not send anything yet. Connect a form or email service in `src/lib/sendEnquiry.ts`.

## Where things are

- `src/pages/` – one file per page
- `src/content/legal.ts` – legal page text
- `src/lib/pages.ts` – page titles and descriptions (SEO)
- `src/index.css` – brand colours, fonts, buttons, labels and lists
- `public/sitemap.xml`, `public/robots.txt`
