import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

test('starts with light mode when no localStorage entry', () => {
  const { result } = renderHook(() => useTheme())
  expect(result.current.isDark).toBe(false)
  expect(document.documentElement.classList.contains('dark')).toBe(false)
})

test('toggle switches to dark mode and persists to localStorage', () => {
  const { result } = renderHook(() => useTheme())
  act(() => result.current.toggle())
  expect(result.current.isDark).toBe(true)
  expect(document.documentElement.classList.contains('dark')).toBe(true)
  expect(localStorage.getItem('theme')).toBe('dark')
})

test('toggle twice returns to light mode', () => {
  const { result } = renderHook(() => useTheme())
  act(() => result.current.toggle())
  act(() => result.current.toggle())
  expect(result.current.isDark).toBe(false)
  expect(localStorage.getItem('theme')).toBe('light')
})

test('reads dark preference from localStorage on mount', () => {
  localStorage.setItem('theme', 'dark')
  const { result } = renderHook(() => useTheme())
  expect(result.current.isDark).toBe(true)
  expect(document.documentElement.classList.contains('dark')).toBe(true)
})
