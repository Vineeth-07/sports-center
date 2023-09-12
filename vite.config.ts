import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default ({ mode }) => {
  return defineConfig({
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      VitePWA({
        devOptions: {
          enabled: true, // For making sure that the PWA is testable from the Local dev environment
        },
        manifest: {
          name: "SportsBuzz",
          short_name: "SportsBuzz",
          icons: [
            {
              src: "/logo.png",
              sizes: "64x64 32x32 24x24 16x16",
              type: "image/x-icon",
            },
            {
              src: "/logo.png",
              type: "image/png",
              sizes: "16x16",
            },
            {
              src: "/logo.png",
              type: "image/png",
              sizes: "32x32",
            },
            {
              src: "/logo.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "/logo.png",
              type: "image/png",
              sizes: "512x512",
              purpose: "any maskable", // Icon format that ensures that your PWA icon looks great on all Android devices
            },
          ],
          theme_color: "#AAF",
        },
      }),
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
    },
  });
};
