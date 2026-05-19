import { getAllPosts, getPostBySlug } from '@/lib/blog'
import fs from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'

jest.mock('fs')
jest.mock('gray-matter')
jest.mock('reading-time')

const mockReaddirSync = jest.mocked(fs.readdirSync)
const mockReadFileSync = jest.mocked(fs.readFileSync)
const mockExistsSync = jest.mocked(fs.existsSync)
const mockMatter = jest.mocked(matter)
const mockReadingTime = jest.mocked(readingTime)

const fakeStats = { text: '3 min read', minutes: 3, time: 180000, words: 600 }

describe('getAllPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockReadingTime.mockReturnValue(fakeStats)
  })

  it('returns posts sorted by date descending', async () => {
    mockReaddirSync.mockReturnValue(['old-post.mdx', 'new-post.mdx'] as any)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter
      .mockReturnValueOnce({ data: { title: 'Old', date: '2026-03-01', description: 'Old desc' }, content: 'body' } as any)
      .mockReturnValueOnce({ data: { title: 'New', date: '2026-05-01', description: 'New desc' }, content: 'body' } as any)

    const posts = await getAllPosts()
    expect(posts[0].date).toBe('2026-05-01')
    expect(posts[1].date).toBe('2026-03-01')
  })

  it('derives slug from filename without .mdx extension', async () => {
    mockReaddirSync.mockReturnValue(['my-research-post.mdx'] as any)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter.mockReturnValue({ data: { title: 'My Post', date: '2026-05-01', description: 'Desc' }, content: 'body' } as any)

    const posts = await getAllPosts()
    expect(posts[0].slug).toBe('my-research-post')
  })

  it('filters out non-.mdx files', async () => {
    mockReaddirSync.mockReturnValue(['post.mdx', 'README.md', '.DS_Store'] as any)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter.mockReturnValue({ data: { title: 'Post', date: '2026-05-01', description: 'Desc' }, content: 'body' } as any)

    const posts = await getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0].slug).toBe('post')
  })

  it('includes readingTime from reading-time library', async () => {
    mockReaddirSync.mockReturnValue(['post.mdx'] as any)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter.mockReturnValue({ data: { title: 'Post', date: '2026-05-01', description: 'Desc' }, content: 'body' } as any)

    const posts = await getAllPosts()
    expect(posts[0].readingTime).toBe('3 min read')
  })
})

describe('getPostBySlug', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockReadingTime.mockReturnValue(fakeStats)
  })

  it('returns null when file does not exist', async () => {
    mockExistsSync.mockReturnValue(false)
    const post = await getPostBySlug('nonexistent')
    expect(post).toBeNull()
  })

  it('returns post with all fields when file exists', async () => {
    mockExistsSync.mockReturnValue(true)
    mockReadFileSync.mockReturnValue('raw' as any)
    mockMatter.mockReturnValue({
      data: { title: 'Found', date: '2026-05-01', description: 'Found desc' },
      content: 'Post body here',
    } as any)

    const post = await getPostBySlug('found-post')
    expect(post).not.toBeNull()
    expect(post!.slug).toBe('found-post')
    expect(post!.title).toBe('Found')
    expect(post!.date).toBe('2026-05-01')
    expect(post!.description).toBe('Found desc')
    expect(post!.content).toBe('Post body here')
    expect(post!.readingTime).toBe('3 min read')
  })
})
