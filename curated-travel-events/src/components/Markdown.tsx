import type { ReactNode } from 'react'
import { contact } from '../lib/site'

// A small renderer for the subset of Markdown used by the legal pages:
// ## headings, paragraphs, "-" and "1." lists, tables, **bold** and [placeholders].

const inlinePattern =
  /(\*\*[^*]+\*\*)|(\[[^\]]+\])|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(\bico\.org\.uk\b)|(07947 653744)/g

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(inlinePattern)) {
    const [token, bold, placeholder, email, ico, phone] = match
    const index = match.index ?? 0
    if (index > last) out.push(text.slice(last, index))
    const key = `${index}-${token}`
    if (bold) out.push(<strong key={key} className="font-medium text-ink">{bold.slice(2, -2)}</strong>)
    else if (placeholder) out.push(<mark key={key} className="bracket">{placeholder}</mark>)
    else if (email)
      out.push(
        <a key={key} href={`mailto:${email}`} className="underline decoration-gold underline-offset-4 [overflow-wrap:anywhere]">
          {email}
        </a>,
      )
    else if (ico)
      out.push(
        <a key={key} href="https://ico.org.uk/" target="_blank" rel="noopener" className="underline decoration-gold underline-offset-4">
          {ico}
        </a>,
      )
    else if (phone)
      out.push(
        <a key={key} href={contact.phoneHref} className="underline decoration-gold underline-offset-4">
          {phone}
        </a>,
      )
    last = index + token.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((cell) => cell.trim())

export function Markdown({ source }: { source: string }) {
  const lines = source.split('\n')
  const blocks: ReactNode[] = []
  let i = 0

  const collect = (test: (line: string) => boolean) => {
    const group: string[] = []
    while (i < lines.length && test(lines[i])) group.push(lines[i++])
    return group
  }

  while (i < lines.length) {
    const line = lines[i]
    const key = blocks.length

    if (!line.trim()) {
      i++
    } else if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={key} className="mb-4 mt-12 text-[1.75rem] leading-[1.15] first:mt-0">
          {line.slice(3)}
        </h2>,
      )
      i++
    } else if (line.startsWith('|')) {
      const [head, , ...rows] = collect((l) => l.startsWith('|'))
      blocks.push(
        <div key={key} role="region" aria-label="Table" tabIndex={0} className="my-6 overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse text-left text-[0.95rem] leading-[1.55]">
            <thead>
              <tr>
                {cells(head).map((cell) => (
                  <th key={cell} scope="col" className="border border-line bg-mist px-4 py-3 align-top font-medium">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row}>
                  {cells(row).map((cell, c) => (
                    <td key={c} className="border border-line px-4 py-3 align-top">
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
    } else if (line.startsWith('- ')) {
      const items = collect((l) => l.startsWith('- '))
      blocks.push(
        <ul key={key} className="my-5 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="relative pl-6 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-gold"
            >
              {inline(item.slice(2))}
            </li>
          ))}
        </ul>,
      )
    } else if (/^\d+\. /.test(line)) {
      const items = collect((l) => /^\d+\. /.test(l))
      blocks.push(
        <ol key={key} className="my-5 list-decimal space-y-3 pl-6 marker:text-gold-ink">
          {items.map((item) => (
            <li key={item} className="pl-1">
              {inline(item.replace(/^\d+\. /, ''))}
            </li>
          ))}
        </ol>,
      )
    } else {
      blocks.push(
        <p key={key} className="my-4">
          {inline(line)}
        </p>,
      )
      i++
    }
  }

  return <div className="text-[1.0625rem] leading-[1.75] text-ink [&>*:first-child]:mt-0">{blocks}</div>
}
