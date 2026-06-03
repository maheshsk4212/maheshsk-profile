import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        caseStudies: resolve(__dirname, 'src/case-studies.html'),
        caseStudy: resolve(__dirname, 'src/case-study.html'),
        resume: resolve(__dirname, 'src/resume.html'),
        about: resolve(__dirname, 'src/about.html'),
      },
    },
  },
});
