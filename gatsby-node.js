/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 const path = require('path')

 exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
   if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox-gl/,
            use: loaders.null()
          },
        ],
      }
    })
  }
   actions.setWebpackConfig({
     resolve: {
       modules: [path.resolve(__dirname, "src"), "node_modules"]
     },
     module: {
       rules: [
         {
         test: /\.worker.js$/i,
         exclude: /node_modules/,
         use: [
           'worker-loader'
         ]
       }
       ]
     },
     output: {
       libraryTarget: "this"
     }
   })
 }
 // Implement the Gatsby API “createPages”. This is called once the
 // data layer is bootstrapped to let plugins create pages from data.
 exports.createPages = ({ graphql, actions }) => {
   const { createPage } = actions

   return new Promise((resolve, reject) => {
     const SchoolTemplate = path.resolve(`src/templates/School.js`)
     // Query for markdown nodes to use in creating pages.

     resolve(
       graphql(
         `
           {
             allSchool {
               edges {
                 node {
                   id,
                   media,
                   meta{
                     regon
                   }
                 }
               }
             }
           }
         `
       ).then(result => {
         if (result.errors) {
           reject(result.errors)
         }

         // Create pages for each markdown file.
         result.data.allSchool.edges.forEach(({ node }) => {
           console.log(node)
             createPage({
               path: `school/${node.meta.regon}`,
               component: SchoolTemplate,
               // In your blog post template's graphql query, you can use path
               // as a GraphQL variable to query for data from the markdown file.
               context: {
                 id: node.id,
               },
             })

         })
       })
     )
   })
 }
 exports.onCreatePage = ({ page, actions }) => {
   const { createPage, createRedirect } = actions

  //  createRedirect({
  //   fromPath: `/school`,
  //   isPermanent: true,
  //   redirectInBrowser: true,
  //   toPath: '/search',
  // })
  //
  //  if (page.path.startsWith('/school/')) {
  //    page.matchPath = `${page.path}/*`
  //    createPage(page)
  //  }
 }
