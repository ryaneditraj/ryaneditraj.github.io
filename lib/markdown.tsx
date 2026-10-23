import type { ReactNode } from "react";

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\((?:https?:\/\/|\/)[^)\s]+\))/g;
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const token = match[0];
    const key = `${keyPrefix}-${index}`;
    index += 1;
    if (token.startsWith("`")) nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    else if (token.startsWith("**")) nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    else if (token.startsWith("*")) nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    else {
      const label = token.slice(1, token.indexOf("]"));
      const href = token.slice(token.indexOf("(") + 1, -1);
      const external = href.startsWith("http");
      nodes.push(
        <a key={key} href={href} {...(external ? { rel: "noreferrer" } : {})}>
          {label}
        </a>,
      );
    }
    last = start + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderBlock(block: string, index: number): ReactNode {
  const lines = block.split("\n");
  const key = `b${index}`;
  if (lines.every((line) => line.startsWith("- "))) {
    return (
      <ul key={key}>
        {lines.map((line, i) => (
          <li key={`${key}-${i}`}>{inline(line.slice(2), `${key}-${i}`)}</li>
        ))}
      </ul>
    );
  }
  if (lines.every((line) => line.startsWith("> "))) {
    return <blockquote key={key}>{inline(lines.map((line) => line.slice(2)).join(" "), key)}</blockquote>;
  }
  const heading = /^(#{1,3})\s+(.+)$/.exec(lines[0] ?? "");
  if (heading && lines.length === 1) {
    const level = heading[1].length;
    const content = inline(heading[2], key);
    if (level === 1) return <h2 key={key}>{content}</h2>;
    if (level === 2) return <h3 key={key}>{content}</h3>;
    return <h4 key={key}>{content}</h4>;
  }
  return <p key={key}>{inline(lines.join(" "), key)}</p>;
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").trim().split(/\n{2,}/).filter(Boolean);
  if (blocks.length === 0) return null;
  return <div className="prose">{blocks.map((block, index) => renderBlock(block, index))}</div>;
}
