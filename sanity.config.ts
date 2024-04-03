import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  name: "default",
  title: "my-nextjs-app",

  projectId: "ysuh13wj",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  basePath: "/studio",
});
