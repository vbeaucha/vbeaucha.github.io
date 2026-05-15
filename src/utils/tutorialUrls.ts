const RAW = 'https://raw.githubusercontent.com'

const REPOS: Record<string, { owner: string; repo: string; branch: string }> = {
  git: { owner: 'vbeaucha', repo: 'git-tuto', branch: 'main' },
  vim: { owner: 'vbeaucha', repo: 'simple-vim-explain', branch: 'main' },
}

export function getRawUrl(tutorialId: string, path: string): string {
  const repo = REPOS[tutorialId]
  if (!repo) throw new Error(`Unknown tutorial: ${tutorialId}`)
  return `${RAW}/${repo.owner}/${repo.repo}/${repo.branch}/${path}`
}

// Resolves a relative .md link to an internal React Router route.
// currentPath is the path of the file being rendered (e.g. 'readme.md' or 'docs/01-configuring-git.md').
// This handles sibling links (02-next.md from docs/) and parent links (../readme.md).
export function resolveMdLink(href: string, tutorialId: string, currentPath = 'readme.md'): string | null {
  if (href.startsWith('http') || !href.endsWith('.md')) return null

  const normalizedCurrent = currentPath.endsWith('.md') ? currentPath : currentPath + '.md'
  const base = new URL(`https://x/${normalizedCurrent}`)
  const resolved = new URL(href, base)
  const resolvedPath = resolved.pathname.slice(1)

  if (resolvedPath === 'readme.md') return `/tutorials/${tutorialId}`

  const path = resolvedPath.replace(/\.md$/, '')
  return `/tutorials/${tutorialId}/${path}`
}
