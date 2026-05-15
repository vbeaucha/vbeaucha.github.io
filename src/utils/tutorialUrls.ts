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

export function resolveMdLink(href: string, tutorialId: string): string | null {
  if (href.startsWith('http') || !href.endsWith('.md')) return null
  const path = href.replace(/\.md$/, '')
  return `/tutorials/${tutorialId}/${path}`
}
