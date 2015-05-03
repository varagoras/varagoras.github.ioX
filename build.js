'use strict';

var buildBranch = require('buildbranch');
 
buildBranch({
  folder: 'public',
  branch: 'master'
}, function(){
  console.log('Build pushed');
});
