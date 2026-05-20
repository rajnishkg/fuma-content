import { createElement, type ReactNode } from "react";
import { docs } from "content/docs";

type Node = (typeof docs)["$inferData"]["tree"]["nodes"][number];
type ElementAttributes = Record<string, unknown>;

export default function Page() {
  const pages = docs.list();

  return (
    <main>
      <p className="eyebrow">Fuma Content + Comark</p>
      <h1>Comark collection in a Next.js app</h1>
      <p>
        This example reads both <code>.md</code> and <code>.mdc</code> files through{" "}
        <code>comarkCollection()</code>, validates frontmatter, and renders the parsed tree.
      </p>

      <div className="grid">
        {pages.map((page) => (
          <article className="card" key={page.path}>
            <p className="path">{page.path}</p>
            <h2>{page.tree.frontmatter.title}</h2>
            <p>{page.tree.frontmatter.description}</p>

            <div className="rendered">
              {page.tree.nodes.map((node, index) => renderNode(node, index))}
            </div>

            <h3>Parsed tree</h3>
            <pre>{JSON.stringify(page.tree.nodes, null, 2)}</pre>
          </article>
        ))}
      </div>
    </main>
  );
}

function renderNode(node: Node, key: number): ReactNode {
  if (typeof node === "string") return node;
  if (node[0] === null) return null;

  const [tag, attrs, ...children] = node as [string, ElementAttributes, ...Node[]];
  const props = sanitizeAttributes(attrs);

  return createElement(
    tag,
    { key, ...props },
    children.map((child, index) => renderNode(child as Node, index)),
  );
}

function sanitizeAttributes(attrs: ElementAttributes): Record<string, string | number | boolean> {
  const props: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(attrs)) {
    if (key === "$") continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      props[key === "class" ? "className" : key] = value;
    }
  }

  return props;
}
