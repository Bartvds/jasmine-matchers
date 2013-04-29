module.exports = function (grunt) {
    'use strict';

    var path = require('path');
    var util = require('util');

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-wrap');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            typing : [
                'typings/test'
            ]
        },
        copy: {
            ts_specs: {
                expand: true,
                cwd: 'test/',
                src: ['**/*-spec.js'],
                dest: 'typings/test/',
                rename: function (dest, src, options) {
                    console.log(path.join(dest, src.replace(/\.js$/, '.ts')));
                    return path.join(dest, src.replace(/\.js$/, '.ts'));
                }
            }
        },
        typescript: {
            ts_specs: {
                src: ['typings/test/**/*.ts'],
                dest: 'typetest',
                options: {
                  module: 'amd',
                  target: 'es5',
                  base_path: 'typings/test',
                  sourcemap: true,
                  declaration: true
                }
            }
        },
        wrap: {
            ts_specs: {
                expand: true,
                cwd: 'test/',
                src: ['**/*-spec.js'],
                dest: 'typings/test/',
                rename: function (dest, src, options) {
                  return path.join(dest, src.replace(/\.js$/, '.ts'));
                },
                options: {
                    seperator:'\n',
                    wrapper: ['/// <reference path="../_refs.ts" />\n\n', '']
                }
            }
        },
        jasmine: {
            tiled: {
                src: 'build/tiled.js',
                options: {
                    specs: 'build/test/**/*-spec.js',
                    helpers: 'build/test/**/*.helper.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', []);
    /*
     grunt.registerTask('build:all', ['clean:build', 'build:assets', 'build:lib']);
     grunt.registerTask('build:assets', ['copy:assets', 'copy:typings', 'copy:components']);
     grunt.registerTask('build:lib', ['typescript:build']);

     grunt.registerTask('live:assets', ['regarde:assets']);
     grunt.registerTask('live:lib', ['regarde:lib']);
     grunt.registerTask('live:die', ['regarde:lib_die']);
     */
    grunt.registerTask('ts_test1', ['clean', 'wrap:ts_specs','typescript:ts_specs']);
    grunt.registerTask('ts_test2', ['clean', 'wrap:ts_specs']);

    //link editor UI buttons
    grunt.registerTask('edit_01', ['clean']);
    grunt.registerTask('edit_02', ['build']);
    grunt.registerTask('edit_03', ['ts_test1']);
    grunt.registerTask('edit_04', ['ts_test2']);
    grunt.registerTask('edit_05', ['typescript:ts_specs']);
};