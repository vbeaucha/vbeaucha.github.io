import { getRawUrl, resolveMdLink } from './tutorialUrls'

test('getRawUrl pour git readme', () => {
  expect(getRawUrl('git', 'readme.md')).toBe(
    'https://raw.githubusercontent.com/vbeaucha/git-tuto/main/readme.md'
  )
})

test('getRawUrl pour un chapitre git', () => {
  expect(getRawUrl('git', 'docs/01-configuring-git.md')).toBe(
    'https://raw.githubusercontent.com/vbeaucha/git-tuto/main/docs/01-configuring-git.md'
  )
})

test('getRawUrl pour vim readme', () => {
  expect(getRawUrl('vim', 'readme.md')).toBe(
    'https://raw.githubusercontent.com/vbeaucha/simple-vim-explain/main/readme.md'
  )
})

test('resolveMdLink convertit un lien relatif .md en route interne', () => {
  expect(resolveMdLink('docs/01-configuring-git.md', 'git')).toBe(
    '/tutorials/git/docs/01-configuring-git'
  )
})

test('resolveMdLink retourne null pour un lien externe', () => {
  expect(resolveMdLink('https://example.com', 'git')).toBeNull()
})

test('resolveMdLink retourne null pour un lien non-.md', () => {
  expect(resolveMdLink('some-image.png', 'git')).toBeNull()
})
