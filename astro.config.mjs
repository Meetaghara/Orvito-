// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // TODO: set to the client's .in domain once it is confirmed
  // site: 'https://www.example.in',
  trailingSlash: 'never',
  build: { format: 'directory' },
});
