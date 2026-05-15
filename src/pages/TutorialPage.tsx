import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getRawUrl, resolveMdLink } from '../utils/tutorialUrls'

type Status = 'loading' | 'success' | 'error'

export function TutorialPage() {
  const { tutorialId = '', '*': splat = '' } = useParams()
  const filePath = splat || 'readme.md'
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    setStatus('loading')
    const url = getRawUrl(tutorialId, filePath.endsWith('.md') ? filePath : filePath + '.md')
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        setContent(text)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [tutorialId, filePath])

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link
        to="/"
        className="text-accent hover:underline text-sm mb-6 inline-block"
      >
        ← Back to portfolio
      </Link>

      {status === 'loading' && (
        <p className="text-gray-500 dark:text-slate-400">Loading…</p>
      )}

      {status === 'error' && (
        <p className="text-red-500">Failed to load tutorial. Please try again later.</p>
      )}

      {status === 'success' && (
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a({ href = '', children, ...props }) {
                const internal = resolveMdLink(href, tutorialId)
                if (internal) {
                  return (
                    <Link to={internal} className="text-accent hover:underline">
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
  )
}
