import type { ReactElement, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MermaidDiagram } from '../components/MermaidDiagram'
import { getRawUrl, resolveMdLink } from '../utils/tutorialUrls'

type Status = 'loading' | 'success' | 'error'

export function TutorialPage() {
  const { tutorialId = '', '*': splat = '' } = useParams()
  const filePath = splat || 'readme.md'
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setContent('')
    try {
      const url = getRawUrl(tutorialId, filePath.endsWith('.md') ? filePath : filePath + '.md')
      fetch(url, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.text()
        })
        .then((text) => {
          setContent(text)
          setStatus('success')
        })
        .catch((err) => {
          if (err.name !== 'AbortError') setStatus('error')
        })
    } catch {
      setStatus('error')
    }
    return () => controller.abort()
  }, [tutorialId, filePath])

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Card container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          {status === 'loading' && (
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 p-12">
              <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              Loading…
            </div>
          )}

          {status === 'error' && (
            <div className="p-12 text-red-600 dark:text-red-400 flex items-center gap-3">
              <span className="text-2xl">⚠</span>
              Failed to load tutorial. Please try again later.
            </div>
          )}

          {status === 'success' && (
            <article
              className="
                p-8 md:p-12
                prose prose-gray dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:text-gray-900 dark:prose-h1:text-white prose-h1:border-b prose-h1:border-gray-200 dark:prose-h1:border-gray-700 prose-h1:pb-4
                prose-h2:text-2xl prose-h2:text-gray-800 dark:prose-h2:text-gray-100 prose-h2:mt-10
                prose-h3:text-xl prose-h3:text-gray-700 dark:prose-h3:text-gray-200
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-code:before:content-none prose-code:after:content-none
                prose-code:bg-blue-50 dark:prose-code:bg-blue-900/30
                prose-code:text-blue-700 dark:prose-code:text-blue-300
                prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
                prose-blockquote:border-l-accent prose-blockquote:not-italic
                prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/10
                prose-blockquote:rounded-r-lg prose-blockquote:py-1
                prose-li:marker:text-accent
                prose-table:text-sm
                prose-th:bg-gray-50 dark:prose-th:bg-gray-700/50
                prose-hr:border-gray-200 dark:prose-hr:border-gray-700
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre({ children }) {
                    const child = (Array.isArray(children) ? children[0] : children) as ReactElement
                    const childProps = child?.props as { className?: string; children?: ReactNode }
                    const childClass = childProps?.className ?? ''

                    if (childClass === 'language-mermaid') {
                      return <>{children}</>
                    }

                    const language = childClass.startsWith('language-') ? childClass.slice(9) : ''
                    const code = String(childProps?.children ?? '').replace(/\n$/, '')

                    return (
                      <div className="not-prose my-6 rounded-xl overflow-hidden border border-gray-700 dark:border-gray-600">
                        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          {language && (
                            <span className="ml-2 text-xs font-mono text-gray-400">{language}</span>
                          )}
                        </div>
                        {language ? (
                          <SyntaxHighlighter
                            language={language}
                            style={oneDark}
                            customStyle={{ margin: 0, borderRadius: 0, background: '#030712', fontSize: '0.875rem', lineHeight: '1.625' }}
                          >
                            {code}
                          </SyntaxHighlighter>
                        ) : (
                          <pre className="m-0 px-6 py-5 bg-gray-950 text-gray-100 text-sm overflow-x-auto leading-relaxed">
                            {children}
                          </pre>
                        )}
                      </div>
                    )
                  },
                  code({ className, children }) {
                    if (className === 'language-mermaid') {
                      return <MermaidDiagram code={String(children).trim()} />
                    }
                    return <code className={className}>{children}</code>
                  },
                  a({ href = '', children, ...props }) {
                    const currentFile = filePath.endsWith('.md') ? filePath : filePath + '.md'
                    const internal = resolveMdLink(href, tutorialId, currentFile)
                    if (internal) {
                      return (
                        <Link to={internal} className="text-accent hover:underline font-medium">
                          {children}
                        </Link>
                      )
                    }
                    return (
                      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                        {children}
                      </a>
                    )
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}
