const dummy = array => {
  return array.length === 0
    ? 1
    : array.length
}

const totalLikes = blogs => {
  const listOfEachBlogLikes = blogs.map(blogs => blogs.likes)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const arrayReduce = listOfEachBlogLikes.reduce(reducer,0)
  return arrayReduce
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return { error: 'Blog List is empty' }
  } else {
    const listOfEachPostLikes = blogs.map(blogs => blogs.likes)
    const indexofMaxPostLikes = listOfEachPostLikes.indexOf(Math.max(...listOfEachPostLikes))
    const copyBlogs = [...blogs]
    delete copyBlogs[indexofMaxPostLikes]._id
    delete copyBlogs[indexofMaxPostLikes].url
    delete copyBlogs[indexofMaxPostLikes].__v
    return copyBlogs[indexofMaxPostLikes]
  }
}

/* Helper function for mostBlogs and  mostLikes */
const groupBy = (blogsArray, blogsProperty) => {
  return blogsArray.reduce((acc, blogs) => {
    const key = blogs[blogsProperty]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(blogs)
    return acc
  }, {})
}
// groupBy(blogs, author) will return =>
/*
{ 'Michael Chan': [ { author: 'Michael Chan', likes: 7 } ],
  'Edsger W. Dijkstra':
   [ { author: 'Edsger W. Dijkstra', likes: 5 },
     { author: 'Edsger W. Dijkstra', likes: 12 } ]
*/
const mostBlogs = blogs => {
  if (blogs.length === 0) {

    return { }
  } else {
    const groupedAuthor = groupBy([...blogs], 'author')
    const groupedAuthorKeysArray = Object.keys(groupedAuthor)
    const groupedAuthorValuesArray = Object.values(groupedAuthor)
    const totalBlogsByEachAuthorArray = groupedAuthorValuesArray.map(value => value.length)
    const maxCountedAuthorValue = Math.max(...totalBlogsByEachAuthorArray)
    const indexOfMaxCountedAuthorValue = totalBlogsByEachAuthorArray.indexOf(maxCountedAuthorValue)
    const authorWithMaxBlogs = groupedAuthorKeysArray[indexOfMaxCountedAuthorValue]
    return { author: authorWithMaxBlogs,
      blogs: maxCountedAuthorValue }
  }
}

const mostLikes = blogs => {
  if (blogs.length === 0) {

    return { }
  } else {
    const groupedAuthor = groupBy([...blogs], 'author')
    // console.log(groupedAuthor)
    // console.log(typeof(groupedAuthor))
    const groupedAuthorKeysArray = Object.keys(groupedAuthor)
    const groupedAuthorValuesArray = Object.values(groupedAuthor)
    // console.log(groupedAuthorKeysArray)
    // console.log(groupedAuthorValuesArray)

    /*const array2 =[ { author: 'Robert C. Martin', likes: 10 },
     { author: 'Robert C. Martin', likes: 0 },
     { author: 'Robert C. Martin', likes: 2 } ]*/

    //console.log(arrayFuncd(array2))
    const totalLikesArrayFromAuthorValuesArray = groupedAuthorValuesArray.map(value => totalLikes(value))

    // console.log(totalLikesArrayFromAuthorValuesArray)
    const likesMaximumValue = Math.max(...totalLikesArrayFromAuthorValuesArray)
    // console.log('likesMaximumValue', likesMaximumValue)

    const likesIndexOfMaximumValue = totalLikesArrayFromAuthorValuesArray.indexOf(likesMaximumValue)
    // console.log('likesIndexOfMaximumValue', likesIndexOfMaximumValue)

    const authorWithMaxLikes = groupedAuthorKeysArray[likesIndexOfMaximumValue]

    //console.log(authorWithMaxLikes)
    return { author: authorWithMaxLikes,
      likes: likesMaximumValue }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}