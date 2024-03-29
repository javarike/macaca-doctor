/* ================================================================
 * macaca-doctor by xdf(xudafeng[at]126.com)
 *
 * first created at : Sat Mar 05 2016 11:35:25 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const JAVA = require('java-util');

const _ = require('./helper');
const JAVA_HOME = JAVA.JAVA_HOME;

var env = process.env;

exports.check_JAVA_VERSION = function *() {
  var version = yield JAVA.getVersion();
  if (version) {
    _.pass('JAVA version is `%s`', version);
  } else {
    _.fail('JAVA version get not found');
  }
};

exports.check_ANDROID_HOME = function *() {
  if (typeof env.ANDROID_HOME !== 'undefined') {
    _.pass('ANDROID_HOME is set to `%s`', env.ANDROID_HOME);
  } else {
    _.fail('ANDROID_HOME is not set');
  }
};

exports.check_JAVA_HOME = function() {
  return new Promise((resolve, reject) => {
    JAVA_HOME.getPath(function(error, javaHome) {
      if (error) {
        _.fail('JAVA_HOME is not set');
        return reject(error);
      }
      _.pass('JAVA_HOME is set to `%s`', javaHome);
      resolve();
    });
  });
};
