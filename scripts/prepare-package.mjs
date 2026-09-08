import { copyFileSync } from "node:fs";

copyFileSync(new URL("../design.md", import.meta.url), "design.md");
