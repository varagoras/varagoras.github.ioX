var
  Metalsmith = require('metalsmith'),
  markdown = require('metalsmith-markdown'),
  templates = require('metalsmith-templates'),
  collections = require('metalsmith-collections'),
  branch = require('metalsmith-branch'),
  permalinks = require('metalsmith-permalinks'),
  excerpts = require('metalsmith-excerpts'),
  ignore = require('metalsmith-ignore'),
  myth = require('metalsmith-myth'),
  pagination = require('metalsmith-pagination'),
  serve = require('metalsmith-serve'),
  headingsidentifier = require('metalsmith-headings-identifier'),
  ids = require('metalsmith-ids'),
  jade = require('metalsmith-jade'),
  moment = require('moment')
  ;

// Assets (CSS etc.)
function buildAssets() {
  Metalsmith(__dirname)
    .source('src/assets')
    .ignore(['!style.css'])
    .use(myth({
      reworkNpm: {
        alias: { 'node': './node_modules/basscss/node_modules' }
      }
    }))
    .destination('public/assets')
    .build(function(err) {
      if (err) { return console.log(err); }
      console.log('CSS build complete!');
    });
}

// Main site
Metalsmith(__dirname)
  .metadata({
    site: {title: 'Varagoras'}
  })
  .source('src/content')
  .use(ignore(['.DS_Store']))

  .use(ids())
  .use(collections({
    posts: {
      pattern: 'posts/*/*.md',
      sortBy: 'date',
      reverse: true
    },
    formsis: {
      pattern: 'formsis/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(pagination({
    'collections.posts': {
      perPage: 10,
      template: 'posts.jade',
      first: 'index.html',
      path: 'page/:num/index.html',
      filter: function (page) {
        return !page.private && !page.draft
      },
      pageMetadata: {
        title: 'Logs'
      }
    }
  }))
  .use(permalinks())
  .use(excerpts())
  .use(templates({
    directory: 'src/templates',
    engine: 'jade',
    pretty: true,
    default: 'post.jade',
    moment: moment
  }))
  .use(headingsidentifier({ selector: '.entry' }))
  .destination('public')


  .build(function(err) {
    if (err) { return console.log(err); }
    console.log('Site build complete!');
    buildAssets();
  });
