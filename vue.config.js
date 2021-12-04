module.exports = {
  publicPath: process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://iming.work/demo/vitepress-blog-vs-inner-editor/dist'
}
