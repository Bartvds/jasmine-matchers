module.exports = function (grunt) {
    'use strict';

    var path = require('path');
    var util = require('util');

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-regex-replace');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: [
                'dist'
            ],
            tmp: [
                'typings_tmp'
            ]
        },
        copy: {
            ts_tests: {
                expand: true,
                cwd: 'typings_tmp/',
                src: ['*.js', '!nodeRunner-spec.js'],
                dest: 'typings_tmp/concat/'
            },
            ts_build: {
                expand: true,
                cwd: 'typings/src/',
                src: ['*.d.ts'],
                dest: 'typings/jasmine-matchers/',
                rename: function (dest, src, options) {
                    return path.join(dest, src.replace('matchers', 'jasmine-matchers'));
                },
                options: {
                    processContent: function (content, srcpath) {
                        var license = grunt.file.read('typings/LICENSE.TYPING.txt').replace(/([\w\.,])[ \t]*(\r|\n|\r\n)[ \t]*([\w\.,])/g, '$1 $3').replace(/(^\s*\/\*\s*)|(\s*\*\/\s*$)/g, '');
                        //.split('[\\w,\\.]([ \\t]*[\\r\\n][ \\t]*)[\\w,\\.]/g').join('');
                        //grunt.log.writeln('ts_build ts_build %1', srcpath);
                        return grunt.template.process(content, {data: {license_typing: license}});
                    }
                }
            },
            ts_licence: {
                expand: true,
                cwd: 'typings/src/',
                src: ['license.txt'],
                dest: 'typings/',
                rename: function (dest, src, options) {
                    return path.join(dest, src.replace('license', 'LICENSE.TYPING'));
                },
                options: {
                    processContent: function (content, srcpath) {
                        var license = grunt.file.read('LICENSE.txt').replace(/(^\s*\/\*\s*)|(\s*\*\/\s*$)/g, '');
                        return grunt.template.process(content, {data: {license_original: license}});
                    }
                }
            },
            ts_build_tests: {
                expand: true,
                cwd: 'typings/jasmine-matchers/',
                src: ['*-tests.ts'],
                dest: 'typings/jasmine-matchers/',
                options: {
                    processContent: function (content, srcpath) {
                        var license = grunt.file.read('typings/LICENSE.TYPING.txt').replace(/([\w\.,])[ \t]*(\r|\n|\r\n)[ \t]*([\w\.,])/g, '$1 $3');
                        license += '\n\n/// <reference path="../jasmine/jasmine.d.ts" />\n/// <reference path="jasmine-matchers.d.ts" />\n\n';
                        return license + content;
                    }
                }
            }
        },
        concat: {
            dist: {
                src: ['LICENSE.txt', 'src/*.js', '!src/matchers.js'],
                dest: 'dist/jasmine-matchers.js'
            },
            ts_tests: {
                src: ['typings_tmp/concat/*.js'],
                dest: 'typings/jasmine-matchers/jasmine-matchers-tests.ts'
            }
        },
        wrap: {
            ts_specs: {
                expand: true,
                cwd: 'test/',
                src: ['*-spec.js'],
                dest: 'typings_tmp/',
                rename: function (dest, src, options) {
                    return path.join(dest, src.replace(/\.js$/, '.ts'));
                },
                options: {
                    wrapper: ['/// <reference path="../typings/_refs.ts" />\n', '']
                }
            }
        },
        typescript: {
            ts_specs: {
                src: ['typings_tmp/*.ts'],
                dest: 'typings_tmp/',
                options: {
                    module: 'amd',
                    target: 'es5',
                    base_path: 'typings_tmp/',
                    sourcemap: 'true'
                }
            },
            ts_tests: {
                src: ['typings/jasmine-matchers/*-tests.ts'],
                dest: 'typings_tmp/test/',
                options: {
                    module: 'amd',
                    target: 'es5',
                    base_path: 'typings/jasmine-matchers/'
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
                    forceExit: true,
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
                src: 'typings_tmp/',
                options: {
                    match: '.',
                    matchall: false,
                    extensions: 'js',
                    forceExit: true,
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
        },
        "regex-replace": {
            ts_tests: {
                src: ['typings_tmp/concat/*.js'],
                actions: [
                    {
                        search: '^\\s*require\\s*\\(\\[\\],\\s*function\\s*\\(\\)\\s*{[\\r\n]*',
                        replace: '',
                        flags: 'g'
                    },
                    {
                        search: '}\\);\\s*(\\/\\/@\\s*sourceMappingURL=[\\w\\.-]+.js.map\\s*)?$',
                        replace: '',
                        flags: 'g'
                    },
                    {
                        search: '^    ',
                        replace: '',
                        flags: 'gm'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['concat:dist', 'jasmine_node:test']);
    grunt.registerTask('typing', ['clean:tmp', 'copy:ts_licence', 'copy:ts_build', 'wrap:ts_specs', 'typescript:ts_specs', 'jasmine_node:ts_specs', 'copy:ts_tests', 'regex-replace:ts_tests', 'concat:ts_tests', 'copy:ts_build_tests', 'typescript:ts_tests']);

    grunt.registerTask('dev', ['typing']);
};