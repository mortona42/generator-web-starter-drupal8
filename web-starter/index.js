'use strict';
var generators = require('yeoman-generator'), 
  _ = require('lodash'),
  Promise = require('bluebird'),
  glob = Promise.promisify(require('glob')),
  pkg = require('../package.json'),
  ygp = require('yeoman-generator-bluebird'),
  drupal_modules = require('drupal-modules');

module.exports = generators.Base.extend({
  initializing : {
  //   async : function() {
  //     ygp(this);
  //     this.options.addDevDependency(pkg.name, '~' + pkg.version);
  //   },
  //   platform : function() {
  //     // Set the platform
  //     this.options.parent.answers.platform = 'drupal8';
  //   }
  },
  prompting : function() {
    var that = this;
    
    var config = _.extend({
      features : true,
      drupal_theme : '',
      drupal_version : ''
    }, this.config.getAll());

    return drupal_modules.getLatestMinorVersions('drupal').then(function(releases) {
      var tags = _.chain(releases)
        .filter({ version_major : 8 })
        .map(function(release) {
          return release.version
        })
        .value();
      
      if (config.drupal_version && tags[0] != config.drupal_version) {
        tags.push(config.drupal_version);
      }

      return Promise.resolve(tags);
    })
    .then(function(tags) {
      return that.prompt([
      //     {
      //   type : 'list',
      //   name : 'drupal_version',
      //   choices : tags,
      //   message : 'Select a version of Drupal',
      //   default : config.drupal_version,
      // },
      // {
      //   type: 'confirm',
      //   name: 'features',
      //   message: 'Does it use the Features module?',
      //   default: config.features,
      // },
      // {
      //   type: 'input',
      //   name: 'drupal_theme',
      //   message: 'Theme name (machine name)',
      //   default: config.drupal_theme,
      // },
      {
        type: 'confirm',
        name: 'install_drupal',
        message: 'Install a fresh copy of Drupal?',
        default: false,
      }]);
    })
    .then(function(answers) {
      that.config.set(answers);

      // Expose the answers on the parent generator
      _.extend(that.options.parent.answers, { 'web-starter-drupal8' : answers });
    });
  },
});
