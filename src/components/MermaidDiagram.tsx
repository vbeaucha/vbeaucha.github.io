import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { useTheme } from '../hooks/useTheme'

let _counter = 0

export function MermaidDiagram({ code }: { code: string }) {
  const { isDark } = useTheme()
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')
  const idRef = useRef(`mermaid-${++_counter}`)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
    })

    setSvg('')
    setError('')
    idRef.current = `mermaid-${++_counter}`

    mermaid
      .render(idRef.current, code)
      .then(({ svg: rendered }) => setSvg(rendered))
      .catch((err: unknown) => setError(String(err)))
  }, [code, isDark])

  if (error) {
    return (
      <div className="not-prose my-6 px-5 py-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
        <span>⚠</span>
        <span>Diagram could not be rendered</span>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="not-prose my-6 h-40 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
    )
  }

  return (
    <div
      className="not-prose my-6 flex justify-center overflow-x-auto p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
