'use strict';
var generators = require('yeoman-generator'), 
  _ = require('lodash'),
  Promise = require('bluebird'),
  glob = Promise.promisify(require('glob')),
  pkg = require('../package.json'),
  ygp = require('yeoman-generator-bluebird'),
  drupal_modules = require('drupal-modules'),

  memFs = require('mem-fs'),
  editor = require('mem-fs-editor');


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
  writing :  {
    drupal_composer : function() {
      // Get current system config for this sub-generator
      var config = this.options.parent.answers['web-starter-drupal8'];
      _.extend(config, this.options.parent.answers);

      var gitignore = this.fs.read(
        this.templatePath('.gitignore')
      )

      fs = editor.create(store);

      fs.append(
        this.destinationPath('.gitignore'),
        gitignore
      );

      this.fs.copy(
        this.templatePath('composer.json'),
        this.destinationPath('composer.json')
      );

      this.fs.copy(
        this.templatePath('drush'),
        this.destinationPath('drush')
      );

      this.fs.copy(
        this.templatePath('scripts'),
        this.destinationPath('scripts')
      );
    }
  }
});
