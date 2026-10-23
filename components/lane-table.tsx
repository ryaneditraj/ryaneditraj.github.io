import type { LaneRow } from "@/lib/lanes";

export function LaneTable({ rows, linkLabel }: { rows: LaneRow[]; linkLabel: string }) {
  return (
    <table className="index">
      <thead>
        <tr>
          <th>Name</th>
          <th>For you</th>
          <th>{linkLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td data-label="Name">{row.name}</td>
            <td data-label="For you">
              {row.line}
              {row.note ? <div className="meta">{row.note}</div> : null}
            </td>
            <td data-label={linkLabel}>
              {row.links.map((link) => (
                <div key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
