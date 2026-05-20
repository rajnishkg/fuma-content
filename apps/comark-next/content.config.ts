import { comarkCollection } from "fuma-content/collections/comark";
import { z } from "zod";

export const docs = comarkCollection({
  dir: "content/docs",
  frontmatter: z.object({
    title: z.string(),
    description: z.string(),
  }),
});
