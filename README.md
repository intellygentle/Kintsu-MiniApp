This is a [Vite](https://vitejs.dev) project bootstrapped with [`@farcaster/create-mini-app`](https://github.com/farcasterxyz/frames/tree/main/packages/create-mini-app).

## `farcaster.json`

The `/.well-known/farcaster.json` is served from the [public
directory](https://vite.dev/guide/assets) and can be updated by editing
`./public/.well-known/farcaster.json`.

You can also use the `public` directory to serve a static image for `splashBackgroundImageUrl`.

## Frame Embed

Add a the `fc:frame` in `index.html` to make your root app URL sharable in feeds:

```html
  <head>
    <!--- other tags --->
    <meta name="fc:frame" content='{"version":"next","imageUrl":"https://placehold.co/900x600.png?text=Frame%20Image","button":{"title":"Open","action":{"type":"launch_frame","name":"App Name","url":"https://app.com"}}}' /> 
  </head>
```

## Overview

This mini app demonstrates how to create a simple NFT minting experience within a Farcaster Frame. It uses:

- Vite for fast development
- React for UI
- TypeScript for type safety
- wagmi for Web3 wallet connections
- Farcaster Profile intergration

## Features
- Stake mon directly on Kintsu

## Getting Started

1. Clone this repository
   ```
   git clone https://github.com/intellygentle/Kintsu-MiniApp.git
   ```
2. Install dependencies with 
   ```
   npm install
   ```
3. Start the development server with 
   ```
   npm run build
   ```
4. If build successfully, use vercel to deploy and test with embed tool.

