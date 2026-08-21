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
