const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('bloglist total likes', () => {
  const blogs = [
    {
      title: 'Js in AI',
      author: 'Ann',
      url: 'https://jsai.com',
      likes: 1
    },
    {
      title: 'AI',
      author: 'vnn',
      url: 'https://jsai.com',
      likes: 5
    }
  ]

  test('total likes in bloglist', () => {
    expect(totalLikes(blogs)).toBe(6)
  })

  test('favorite blog', () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: 'AI',
      author: 'vnn',
      url: 'https://jsai.com',
      likes: 5
    })
  })
})
