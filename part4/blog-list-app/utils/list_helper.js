const dummy = array => {
  return array.length === 0
    ? 0
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

const mostBlogs = blogs => {
  if (blogs.length === 0) {

    return { }
  } else {
    const mapBlogPostToAuthors = blogs.map(blogs => blogs.author)
    const countedAuthors = mapBlogPostToAuthors.reduce((allAuthors, author) => {
      if( author in allAuthors) {
        allAuthors[author]++
      }
      else {
        allAuthors[author] = 1
      }
      return allAuthors
    }, {})
    const blogsAuthorNameAsKeys = Object.keys(countedAuthors)
    const blogsAuthorCountAsValues = Object.values(countedAuthors)
    const maxCountedAuthorValue = Math.max(...blogsAuthorCountAsValues)
    const indexOfMaxCountedAuthorValue = blogsAuthorCountAsValues.indexOf(maxCountedAuthorValue)
    const authorWithMaxBlogs = blogsAuthorNameAsKeys[indexOfMaxCountedAuthorValue]
    return { author: authorWithMaxBlogs,
      blogs: maxCountedAuthorValue }
  }
}

/* Helper function for mostLikes */
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

const arrayFuncd = array => {
  const likesArray = array.map(item => item.likes)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const totalLikes = likesArray.reduce(reducer)
  return totalLikes
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
    const totalLikesArrayFromAuthorValuesArray = groupedAuthorValuesArray.map(value => arrayFuncd(value))

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