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
    async : function() {
      ygp(this);
      this.options.addDevDependency(pkg.name, '~' + pkg.version);
    },
    platform : function() {
      // Set the platform
      this.options.parent.answers.platform = 'drupal8';
    }
  },
  prompting : function() {
    var that = this;
    
    var config = _.extend({
    }, this.config.getAll());

    return that.prompt([
      {
        type: 'input',
        name: 'drupal_theme',
        message: 'Theme name (machine name)',
      },
      {
        type: 'confirm',
        name: 'install_drupal',
        message: 'Install Drupal via composer?',
      }
    ]);
  },
});
