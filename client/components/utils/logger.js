/**
 * Created by BWI on 24/01/15.
 */

(function () {
  "use strict";

  angular.module('logger', []).provider('Logger', [function () {
    var isEnabled = true;
    var level = 'log';

    var levelCombinaison = {
      error: ['error'],
      warn: ['warn', 'error'],
      info: ['log','info','warn','error'],
      log: ['log','info','warn','error'],
      debug: ['debug', 'log', 'info','warn','error'],
      all: ['debug', 'log', 'info','warn','error']
    };

    this.enabled = function(_isEnabled) {
      isEnabled = !!_isEnabled;
    };

    this.setLevel = function (_level) {
      if (levelCombinaison.all.indexOf(_level) === -1) {
        //Unknown level
        return;
      } else {
        level = _level;
      }
    };

    this.$get = ['$log', function($log) {
      var Logger = function(context) {
        this.context = context;
      };
      Logger.getInstance = function(context) {
        return new Logger(context);
      };
      Logger.supplant = function(str, o) {
        return str.replace(
          /\{([^{}]*)\}/g,
          function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
          }
        );
      };
      Logger.getFormattedTimestamp = function(date) {
        return Logger.supplant('{0}:{1}:{2}:{3}', [
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds()
        ]);
      };
      Logger.isRequiredLevel = function(levelToTest) {
        if (levelCombinaison[level].indexOf(levelToTest) === -1) {
          return false;
        } else {
          return true;
        }
      };
      Logger.prototype = {
        _log: function(originalFn, args) {
          if (!isEnabled || !Logger.isRequiredLevel(originalFn)) {
            return;
          }

          var now  = Logger.getFormattedTimestamp(new Date());
          var message = '', supplantData = [];
          switch (args.length) {
            case 1:
              message = Logger.supplant("{0} - {1}: {2}", [ now, this.context, args[0] ]);
              break;
            case 3:
              supplantData = args[2];
              message = Logger.supplant("{0} - {1}::{2}(\'{3}\')", [ now, this.context, args[0], args[1] ]);
              break;
            case 2:
              if (typeof args[1] === 'string') {
                message = Logger.supplant("{0} - {1}::{2}(\'{3}\')", [ now, this.context, args[0], args[1] ]);
              } else {
                supplantData = args[1];
                message = Logger.supplant("{0} - {1}: {2}", [ now, this.context, args[0] ]);
              }
              break;
          }

          $log[originalFn].call(null, Logger.supplant(message, supplantData));
        },
        log: function() {
          this._log('log', arguments);
        },
        info: function() {
          this._log('info', arguments);
        },
        warn: function() {
          this._log('warn', arguments);
        },
        debug: function() {
          this._log('debug', arguments);
        },
        error: function() {
          this._log('error', arguments);
        }
      };
      return Logger;
    }];
  }]);

})();

