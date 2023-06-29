/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

declare module '*.gpx' {
  const value: string;
  export default value;
}

declare module '*.pmtiles' {
  const value: string;
  export default value;
}

declare global {
  interface Window {
    setColorTheme(theme: string);
  }
}

export {};
