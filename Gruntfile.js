module.exports = function (grunt) {
    'use strict';

    var path = require('path');
    var util = require('util');

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-wrap');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            typing: [
                'test_typing',
                'dist'
            ]
        },
        concat: {
            dist: {
                src: ['LICENSE.txt', 'src/**/*.js', '!src/matchers.js'],
                dest: 'dist/jasmine-matchers.js'
            }
        },
        wrap: {
            ts_specs: {
                expand: true,
                cwd: 'test/',
                src: ['**/*-spec.js'],
                dest: 'test_typing/',
                rename: function (dest, src, options) {
                    return path.join(dest, src.replace(/\.js$/, '.ts'));
                },
                options: {
                    seperator: '\n',
                    wrapper: ['/// <reference path="../typings/_refs.ts" />\n\n', '']
                }
            }
        },
        typescript: {
            ts_specs: {
                src: ['test_typing/**/*.ts'],
                dest: 'test_typing/',
                options: {
                    module: 'amd',
                    target: 'es5',
                    base_path: 'test_typing/',
                    sourcemap: 'true'
                }
            }
        },
        jasmine_node: {
            test: {
                src: 'test/',
                options: {
                    match: '.',
                    matchall: false,
                    extensions: 'js',
                    useRequireJs: true,
                    specNameMatcher: 'spec',
                    jUnit: {
                        report: false,
                        savePath: "build/reports/jasmine/",
                        useDotNotation: true,
                        consolidate: true
                    }
                }
            },
            ts_specs: {
                src: 'test_typing/',
                options: {
                    match: '.',
                    matchall: false,
                    extensions: 'js',
                    useRequireJs: true,
                    specNameMatcher: 'spec',
                    jUnit: {
                        report: false,
                        savePath: "build/reports/jasmine/",
                        useDotNotation: true,
                        consolidate: true
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['test']);
    grunt.registerTask('build', ['concat', 'jasmine_node:test']);
    grunt.registerTask('typing', ['clean', 'wrap:ts_specs', 'typescript:ts_specs', 'jasmine_node:ts_specs']);

    //link editor UI buttons
    grunt.registerTask('edit_01', ['clean']);
    grunt.registerTask('edit_02', ['build']);
    grunt.registerTask('edit_03', ['typing']);
};