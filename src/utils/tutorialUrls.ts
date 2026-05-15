const RAW = 'https://raw.githubusercontent.com'

const REPOS: Record<string, { owner: string; repo: string; branch: string }> = {
  git: { owner: 'vbeaucha', repo: 'git-tuto', branch: 'main' },
  vim: { owner: 'vbeaucha', repo: 'simple-vim-explain', branch: 'main' },
}

export function getRawUrl(tutorialId: string, path: string): string {
  const { owner, repo, branch } = REPOS[tutorialId]
  return `${RAW}/${owner}/${repo}/${branch}/${path}`
}

export function resolveMdLink(href: string, tutorialId: string): string | null {
  if (href.startsWith('http') || !href.endsWith('.md')) return null
  const path = href.replace(/\.md$/, '')
  return `/tutorials/${tutorialId}/${path}`
}
