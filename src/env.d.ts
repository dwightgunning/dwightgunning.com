/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.gpx' {
  const value: string;
  export default value;
}

declare module '*.pmtiles' {
  const value: string;
  export default value;
}
