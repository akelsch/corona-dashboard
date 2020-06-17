import typeorm from 'typeorm'
import { Post } from './model/Post.js'
import { Category } from './model/Category.js'

import postSchema from './entity/PostSchema.js'
import categorySchema from './entity/CategorySchema.js'

typeorm.createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    postSchema,
    categorySchema
  ]
}).then(function (connection) {
  const category1 = new Category(0, 'TypeScript')
  const category2 = new Category(0, 'Programming')

  return connection
    .manager
    .save([category1, category2])
    .then(() => {
      const post = new Post()
      post.title = 'Control flow based type analysis'
      post.text = 'TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.'
      post.categories = [category1, category2]

      const postRepository = connection.getRepository(Post)
      postRepository.save(post)
        .then(function (savedPost) {
          console.log('Post has been saved: ', savedPost)
          console.log('Now lets load all posts: ')

          return postRepository.find()
        })
        .then(function (allPosts) {
          console.log('All posts: ', allPosts)
        })
    })
}).catch(function (error) {
  console.log('Error: ', error)
})
