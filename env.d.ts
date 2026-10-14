/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-ssg" />

// vite-imagetools: `as=picture` imports resolve to a Picture object.
declare module '*as=picture' {
  const picture: import('vite-imagetools').Picture
  export default picture
}

// vite-imagetools: `inline` imports resolve to a base64 data URL.
declare module '*&inline' {
  const src: string
  export default src
}
