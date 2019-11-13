const blogs = [
  {
    title: 'Jest cheatsheet',
    author: 'Rico Sta. Cruz',
    url: 'https://devhints.io/jest',
    likes: 409,
    user: {
      username: 'bronepeace',
      name: 'Paribesh Ranabhat',
      id: '5db015f5a9eef7044b81642d'
    },
    id: '5db0537f12bf700fc36b84e2'
  },
  {
    title: 'Ikigai The Japanese Secret ',
    author: 'Thomas Oppong',
    url: 'https://medium.com/thrive-global/ikigai-the-japanese-secret-to-a-long-and-happy-life-might-just-help-you-live-a-more-fulfilling-9871d01992b7',
    likes: 52,
    user: {
      username: 'itTech',
      name: 'Bikesh Maharjan',
      id: '5db03518eec6bb0ae4f589a0'
    },
    id: '5db34b376f1265042590358a'
  },
  {
    title: 'Let\'s do something meaningful.',
    author: 'Bikesh Maharjan',
    url: 'https://www.example.com',
    likes: 51,
    user: {
      username: 'bronepeace',
      name: 'Paribesh Ranabhat',
      id: '5db015f5a9eef7044b81642d'
    },
    id: '5db34b9c6f1265042590358b'
  }

]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }