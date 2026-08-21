# cervejasBR

A storefront for Brazilian craft beer, built with Next.js and powered by
[Commerce.js](https://commercejs.com/) (Chec) for product and cart data.

## Features

- **Homepage** — hero section, a brand-logo carousel, and a bestseller
  product carousel (Swiper).
- **Loja (`/loja`)** — full product catalog in a grid, with a category
  sidebar.
- **Carrinho (`/carrinho`)** — shopping cart with editable line item
  quantities, subtotal, and a checkout form (UI only).
- Cart state is fetched from Chec on load and kept in React context, shared
  across all pages.

## Tech stack

- [Next.js 12](https://nextjs.org/) + React 18 + TypeScript
- [@chec/commerce.js](https://commercejs.com/docs/) for products and cart
- [Swiper](https://swiperjs.com/) for carousels
- [Font Awesome](https://fontawesome.com/) for icons
- Sass / CSS Modules for styling

## Getting started

### Prerequisites

- Node.js
- Yarn
- A [Chec](https://authorize.chec.io/) account with a public API key

### Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Add your Chec public API key to a `.env.development` file in the project
   root:

   ```
   NEXT_PUBLIC_CHEC_PUBLIC_API_KEY=pk_your_key_here
   ```

3. Run the dev server:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

- `yarn build` — production build
- `yarn start` — run the production build
- `yarn lint` — run ESLint

## Troubleshooting

### `Error: unable to get local issuer certificate`

`api.chec.io` serves a TLS certificate issued from Let's Encrypt's new
["Generation Y"](https://letsencrypt.org/2025/11/24/gen-y-hierarchy) root
(`ISRG Root YE`), which started issuing in January 2026. Operating systems
and Node.js ship their own bundled list of trusted root certificates, and
that list only gets a new root added on a future OS/Node release — so
until this root has propagated to your machine (and everyone else's), any
Node process trying to reach `api.chec.io` fails TLS verification with
this error, even though the certificate itself is perfectly valid.

**Fix (already applied):** [isrg-root-ye.pem](isrg-root-ye.pem) in the
project root is the official root certificate, downloaded directly from
`letsencrypt.org` (not from Chec's own server, to avoid trusting an
unverified chain). `dev`, `build`, and `start` in `package.json` set
`NODE_EXTRA_CA_CERTS` to that file via
[cross-env](https://www.npmjs.com/package/cross-env), which tells Node to
trust it as an additional root — no system or Node upgrade needed.

This workaround can be removed (drop `isrg-root-ye.pem`, the `cross-env`
scripts, and the dependency) once your OS and Node version both trust
`ISRG Root YE` natively, which will happen automatically as they receive
future updates.

Verified independently of this app: `openssl s_client -connect
api.chec.io:443 -CAfile isrg-root-ye.pem` returns `Verify return code: 0
(ok)` once the cert is trusted, confirming the chain itself is valid and
the fix is correct.

### Requests to `api.chec.io` reset or hang after the TLS fix

Separately from the certificate issue above, requests to `api.chec.io`
(and `chec.io` / `authorize.chec.io`) may fail with a connection reset or
`HTTP/2 stream ... PROTOCOL_ERROR`, even after TLS validates successfully.
This reproduced consistently across multiple protocols (HTTP/1.1 and
HTTP/2) and network conditions, pointing to an infrastructure-side issue
on Chec's end rather than anything in this project or your machine. If
`yarn dev` still can't fetch product data after applying the certificate
fix above, this is likely why — check
[Chec's status/support channels](https://authorize.chec.io/) rather than
your local setup.

## Project structure

```
components/    Shared UI: Header, Footer, HtmlHead, Item, Bestseller,
               Slider, ProductModal
context/       Cart state (React context + reducer), synced with Chec
lib/           Commerce.js SDK client
pages/         index (home), loja (shop), carrinho (cart)
public/        Static assets: brand logos, header logo, background image
styles/        Global styles and CSS Modules (per-page and per-component)
```
