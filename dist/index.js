(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnouncementService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Annoncement service.
 * Displays a md-toast on top of the view, containing an announcement retrieved from the code tables.
 */
var AnnouncementService =
/*#__PURE__*/
function () {
  function AnnouncementService($translate, $mdToast, $rootScope, $cookies) {
    var _this = this;

    _classCallCheck(this, AnnouncementService);

    this.$translate = $translate;
    this.$mdToast = $mdToast;
    this.$rootScope = $rootScope;
    this.$cookies = $cookies;
    this._dismissed = false; // Forget the dismissal if the language is changed.

    this.$rootScope.$on('$translateChangeSuccess', function () {
      _this._dismissed = false;
    });
  }

  _createClass(AnnouncementService, [{
    key: "_dismiss",
    // The announcement has been dismissed.
    value: function _dismiss() {
      this._dismissed = true;
      this._toastPromise = null;
    }
  }, {
    key: "display",

    /** 
     *  Displays the announcement if it has not been dismissed.
     *  @param {function} [hideCallback] - A function to be called 
     *    when the announcement is hidden.
     *  @return {Promise} A Promise to be fulfilled 
     *    if the announcement is displayed, and to be 
     *    rejected when the announcement cannot be displayed.
     */
    value: function display(hideCallback) {
      var ctrl = this;
      return new Promise(function (resolve, reject) {
        if (ctrl._dismissed === true) {
          reject('The announcement has been dismissed.');
          return;
        }

        ctrl.$translate('nui.message.announcement').then(function (translation) {
          // Check if there is a cookie with this message
          var cookie = ctrl.$cookies.get('announcement');

          if (cookie === translation) {
            reject('The announcement has been dismissed before.');
            return;
          } // If there is no announcement to be displayed.


          if (!translation || ['announcement', '&nbsp;', ''].includes(translation)) {
            // translation is assigned 'announcement' in the absence of a matching entry.
            // If there is already a toast, and no 
            // announcement, hide the toast.
            // This happens when the language is changed.
            if (ctrl._toastPromise && !ctrl._dismissed) {
              ctrl.$mdToast.hide();
            }

            reject('No announcement found.');
            return;
          } // If there is already a toast promise,
          // avoid creating a new one.


          ctrl._toastPromise = ctrl._toastPromise || ctrl.$mdToast.show({
            // Timeout duration in msecs. false implies no timeout.
            hideDelay: false,
            position: 'top',
            controller: function controller() {
              return {
                close: function close() {
                  ctrl.$mdToast.hide(); // Save as cookie

                  ctrl.$translate('nui.message.announcement').then(function (response) {
                    return ctrl.$cookies.put('announcement', response);
                  });
                }
              };
            },
            controllerAs: '$ctrl',
            template: "<md-toast class=\"page-notification\" style=\"top: 0px; position: sticky !important;\">\n    <div class=\"md-toast-content\" style=\"box-shadow:none; width: 100%;\">\n        <span class='md-toast-text' flex translate='nui.message.announcement'>\n  </span>\n    </div>\n    <a class=\"close\" ng-click='$ctrl.close()' aria-label=\"{{'nui.message.dismiss' | translate}}\" style=\"position: absolute; right: 1.5rem; top: 1.5rem;\">\n<prm-icon icon-type=\"svg\" svg-icon-set=\"primo-ui\" icon-definition=\"close\"><!----><md-icon ng-if=\"!$ctrl.isCustom\" md-svg-icon=\"primo-ui:close\" alt=\"\" class=\"md-primoExplore-theme\" aria-hidden=\"true\"><svg id=\"close\" width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" y=\"240\" xmlns=\"http://www.w3.org/2000/svg\" fit=\"\" preserveAspectRatio=\"xMidYMid meet\" focusable=\"false\">\n        <path d=\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\"></path>\n    </svg></md-icon><!----><!----><prm-icon-after parent-ctrl=\"$ctrl\"></prm-icon-after></prm-icon></a>\n</md-toast>"
          });

          ctrl._toastPromise.then(hideCallback)["catch"](hideCallback).then(function () {
            return ctrl._dismiss();
          });

          resolve();
        });
      });
    }
  }]);

  return AnnouncementService;
}();

exports.AnnouncementService = AnnouncementService;
;
AnnouncementService.$inject = ['$translate', '$mdToast', '$rootScope', '$cookies'];

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrmTopbarAfterConfig = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PrmTopbarAfterController =
/*#__PURE__*/
function () {
  function PrmTopbarAfterController(announcementService, $scope, $element, $translate) {
    _classCallCheck(this, PrmTopbarAfterController);

    this.announcementService = announcementService;
    this.$scope = $scope;
    this.$element = $element;
    this.$translate = $translate;
  }

  _createClass(PrmTopbarAfterController, [{
    key: "$onInit",
    value: function $onInit() {
      // Announcement displayed.
      this.announcementService.display()["catch"](function (e) {
        if (e) console.log(e);
      });
    }
  }]);

  return PrmTopbarAfterController;
}();

PrmTopbarAfterController.$inject = ['announcementService', '$scope', '$element', '$translate'];
var PrmTopbarAfterConfig = {
  name: 'prmTopbarAfter',
  config: {
    controller: PrmTopbarAfterController,
    require: {
      primoExploreCtrl: '^primoExplore'
    }
  }
};
exports.PrmTopbarAfterConfig = PrmTopbarAfterConfig;

},{}],3:[function(require,module,exports){
"use strict";

var _announcement = require("./announcement/announcement.service");

var _prmTopbarAfter = require("./announcement/prmTopbarAfter.component");

angular.module('viewCustom', ['angularLoad']);
angular.module('viewCustom').service('announcementService', _announcement.AnnouncementService).component(_prmTopbarAfter.PrmTopbarAfterConfig.name, _prmTopbarAfter.PrmTopbarAfterConfig.config);

},{"./announcement/announcement.service":1,"./announcement/prmTopbarAfter.component":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYW5ub3VuY2VtZW50L2Fubm91bmNlbWVudC5zZXJ2aWNlLmpzIiwic3JjL2Fubm91bmNlbWVudC9wcm1Ub3BiYXJBZnRlci5jb21wb25lbnQuanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7OztJQUlhLG1COzs7QUFDWCwrQkFBWSxVQUFaLEVBQXdCLFFBQXhCLEVBQWtDLFVBQWxDLEVBQThDLFFBQTlDLEVBQXdEO0FBQUE7O0FBQUE7O0FBQ3RELFNBQUssVUFBTCxHQUFrQixVQUFsQjtBQUNBLFNBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFNBQUssVUFBTCxHQUFrQixVQUFsQjtBQUNBLFNBQUssUUFBTCxHQUFnQixRQUFoQjtBQUVBLFNBQUssVUFBTCxHQUFrQixLQUFsQixDQU5zRCxDQVF0RDs7QUFDQSxTQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsQ0FBb0IseUJBQXBCLEVBQStDLFlBQU07QUFDbkQsTUFBQSxLQUFJLENBQUMsVUFBTCxHQUFrQixLQUFsQjtBQUNELEtBRkQ7QUFHRDs7OztBQUVEOytCQUNXO0FBQ1QsV0FBSyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsV0FBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0Q7Ozs7QUFFRDs7Ozs7Ozs7NEJBUVEsWSxFQUFjO0FBQ3BCLFVBQUksSUFBSSxHQUFHLElBQVg7QUFFQSxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFFdEMsWUFBSSxJQUFJLENBQUMsVUFBTCxLQUFvQixJQUF4QixFQUE4QjtBQUM1QixVQUFBLE1BQU0sQ0FBQyxzQ0FBRCxDQUFOO0FBQ0E7QUFDRDs7QUFFRCxRQUFBLElBQUksQ0FBQyxVQUFMLENBQWdCLDBCQUFoQixFQUE0QyxJQUE1QyxDQUFpRCxVQUFDLFdBQUQsRUFBaUI7QUFDaEU7QUFDQSxj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QWYsRUFBNkIsQ0FBQyxhQUFELENBQTdCO0FBRUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxZQUFmLEVBQ08sT0FEUCxDQUNlLHFCQURmLEVBQ3NDLGlDQUR0QyxFQUVPLFNBRlAsQ0FFaUIscUNBQXFCLElBRnRDLEVBRTRDLHFDQUFxQixNQUZqRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogQW5ub25jZW1lbnQgc2VydmljZS5cbiAqIERpc3BsYXlzIGEgbWQtdG9hc3Qgb24gdG9wIG9mIHRoZSB2aWV3LCBjb250YWluaW5nIGFuIGFubm91bmNlbWVudCByZXRyaWV2ZWQgZnJvbSB0aGUgY29kZSB0YWJsZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbm5vdW5jZW1lbnRTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoJHRyYW5zbGF0ZSwgJG1kVG9hc3QsICRyb290U2NvcGUsICRjb29raWVzKSB7XG4gICAgdGhpcy4kdHJhbnNsYXRlID0gJHRyYW5zbGF0ZTtcbiAgICB0aGlzLiRtZFRvYXN0ID0gJG1kVG9hc3Q7XG4gICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICB0aGlzLiRjb29raWVzID0gJGNvb2tpZXM7XG5cbiAgICB0aGlzLl9kaXNtaXNzZWQgPSBmYWxzZTtcblxuICAgIC8vIEZvcmdldCB0aGUgZGlzbWlzc2FsIGlmIHRoZSBsYW5ndWFnZSBpcyBjaGFuZ2VkLlxuICAgIHRoaXMuJHJvb3RTY29wZS4kb24oJyR0cmFuc2xhdGVDaGFuZ2VTdWNjZXNzJywgKCkgPT4ge1xuICAgICAgdGhpcy5fZGlzbWlzc2VkID0gZmFsc2U7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gVGhlIGFubm91bmNlbWVudCBoYXMgYmVlbiBkaXNtaXNzZWQuXG4gIF9kaXNtaXNzKCkge1xuICAgIHRoaXMuX2Rpc21pc3NlZCA9IHRydWU7XG4gICAgdGhpcy5fdG9hc3RQcm9taXNlID0gbnVsbDtcbiAgfTtcblxuICAvKiogXG4gICAqICBEaXNwbGF5cyB0aGUgYW5ub3VuY2VtZW50IGlmIGl0IGhhcyBub3QgYmVlbiBkaXNtaXNzZWQuXG4gICAqICBAcGFyYW0ge2Z1bmN0aW9ufSBbaGlkZUNhbGxiYWNrXSAtIEEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIFxuICAgKiAgICB3aGVuIHRoZSBhbm5vdW5jZW1lbnQgaXMgaGlkZGVuLlxuICAgKiAgQHJldHVybiB7UHJvbWlzZX0gQSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZCBcbiAgICogICAgaWYgdGhlIGFubm91bmNlbWVudCBpcyBkaXNwbGF5ZWQsIGFuZCB0byBiZSBcbiAgICogICAgcmVqZWN0ZWQgd2hlbiB0aGUgYW5ub3VuY2VtZW50IGNhbm5vdCBiZSBkaXNwbGF5ZWQuXG4gICAqL1xuICBkaXNwbGF5KGhpZGVDYWxsYmFjaykge1xuICAgIGxldCBjdHJsID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGlmIChjdHJsLl9kaXNtaXNzZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmVqZWN0KCdUaGUgYW5ub3VuY2VtZW50IGhhcyBiZWVuIGRpc21pc3NlZC4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjdHJsLiR0cmFuc2xhdGUoJ251aS5tZXNzYWdlLmFubm91bmNlbWVudCcpLnRoZW4oKHRyYW5zbGF0aW9uKSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgY29va2llIHdpdGggdGhpcyBtZXNzYWdlXG4gICAgICAgIGxldCBjb29raWUgPSBjdHJsLiRjb29raWVzLmdldCgnYW5ub3VuY2VtZW50Jyk7XG4gICAgICAgIGlmIChjb29raWUgPT09IHRyYW5zbGF0aW9uKXtcbiAgICAgICAgICByZWplY3QoJ1RoZSBhbm5vdW5jZW1lbnQgaGFzIGJlZW4gZGlzbWlzc2VkIGJlZm9yZS4nKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gYW5ub3VuY2VtZW50IHRvIGJlIGRpc3BsYXllZC5cbiAgICAgICAgaWYgKCghdHJhbnNsYXRpb24pIHx8IFsnYW5ub3VuY2VtZW50JywgJyZuYnNwOycsICcnXS5pbmNsdWRlcyh0cmFuc2xhdGlvbikpIHtcbiAgICAgICAgICAvLyB0cmFuc2xhdGlvbiBpcyBhc3NpZ25lZCAnYW5ub3VuY2VtZW50JyBpbiB0aGUgYWJzZW5jZSBvZiBhIG1hdGNoaW5nIGVudHJ5LlxuXG4gICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhIHRvYXN0LCBhbmQgbm8gXG4gICAgICAgICAgLy8gYW5ub3VuY2VtZW50LCBoaWRlIHRoZSB0b2FzdC5cbiAgICAgICAgICAvLyBUaGlzIGhhcHBlbnMgd2hlbiB0aGUgbGFuZ3VhZ2UgaXMgY2hhbmdlZC5cbiAgICAgICAgICBpZiAoY3RybC5fdG9hc3RQcm9taXNlICYmICFjdHJsLl9kaXNtaXNzZWQpIHtcbiAgICAgICAgICAgIGN0cmwuJG1kVG9hc3QuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZWplY3QoJ05vIGFubm91bmNlbWVudCBmb3VuZC4nKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGEgdG9hc3QgcHJvbWlzZSxcbiAgICAgICAgLy8gYXZvaWQgY3JlYXRpbmcgYSBuZXcgb25lLlxuICAgICAgICBjdHJsLl90b2FzdFByb21pc2UgPSBjdHJsLl90b2FzdFByb21pc2UgfHwgY3RybC4kbWRUb2FzdC5zaG93KHtcbiAgICAgICAgICAvLyBUaW1lb3V0IGR1cmF0aW9uIGluIG1zZWNzLiBmYWxzZSBpbXBsaWVzIG5vIHRpbWVvdXQuXG4gICAgICAgICAgaGlkZURlbGF5OiBmYWxzZSxcbiAgICAgICAgICBwb3NpdGlvbjogJ3RvcCcsXG4gICAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjdHJsLiRtZFRvYXN0LmhpZGUoKTtcbiAgICAgICAgICAgICAgICAvLyBTYXZlIGFzIGNvb2tpZVxuICAgICAgICAgICAgICAgIGN0cmwuJHRyYW5zbGF0ZSgnbnVpLm1lc3NhZ2UuYW5ub3VuY2VtZW50JykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjdHJsLiRjb29raWVzLnB1dCgnYW5ub3VuY2VtZW50JywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICckY3RybCcsXG4gICAgICAgICAgdGVtcGxhdGU6IGA8bWQtdG9hc3QgY2xhc3M9XCJwYWdlLW5vdGlmaWNhdGlvblwiIHN0eWxlPVwidG9wOiAwcHg7IHBvc2l0aW9uOiBzdGlja3kgIWltcG9ydGFudDtcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWQtdG9hc3QtY29udGVudFwiIHN0eWxlPVwiYm94LXNoYWRvdzpub25lOyB3aWR0aDogMTAwJTtcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9J21kLXRvYXN0LXRleHQnIGZsZXggdHJhbnNsYXRlPSdudWkubWVzc2FnZS5hbm5vdW5jZW1lbnQnPlxuICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGEgY2xhc3M9XCJjbG9zZVwiIG5nLWNsaWNrPSckY3RybC5jbG9zZSgpJyBhcmlhLWxhYmVsPVwie3snbnVpLm1lc3NhZ2UuZGlzbWlzcycgfCB0cmFuc2xhdGV9fVwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyByaWdodDogMS41cmVtOyB0b3A6IDEuNXJlbTtcIj5cbjxwcm0taWNvbiBpY29uLXR5cGU9XCJzdmdcIiBzdmctaWNvbi1zZXQ9XCJwcmltby11aVwiIGljb24tZGVmaW5pdGlvbj1cImNsb3NlXCI+PCEtLS0tPjxtZC1pY29uIG5nLWlmPVwiISRjdHJsLmlzQ3VzdG9tXCIgbWQtc3ZnLWljb249XCJwcmltby11aTpjbG9zZVwiIGFsdD1cIlwiIGNsYXNzPVwibWQtcHJpbW9FeHBsb3JlLXRoZW1lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHN2ZyBpZD1cImNsb3NlXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB5PVwiMjQwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpdD1cIlwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZCBtZWV0XCIgZm9jdXNhYmxlPVwiZmFsc2VcIj5cbiAgICAgICAgPHBhdGggZD1cIk0xOSw2LjQxTDE3LjU5LDVMMTIsMTAuNTlMNi40MSw1TDUsNi40MUwxMC41OSwxMkw1LDE3LjU5TDYuNDEsMTlMMTIsMTMuNDFMMTcuNTksMTlMMTksMTcuNTlMMTMuNDEsMTJMMTksNi40MVpcIj48L3BhdGg+XG4gICAgPC9zdmc+PC9tZC1pY29uPjwhLS0tLT48IS0tLS0+PHBybS1pY29uLWFmdGVyIHBhcmVudC1jdHJsPVwiJGN0cmxcIj48L3BybS1pY29uLWFmdGVyPjwvcHJtLWljb24+PC9hPlxuPC9tZC10b2FzdD5gLFxuICAgICAgICB9KTtcblxuICAgICAgICBjdHJsLl90b2FzdFByb21pc2UudGhlbihoaWRlQ2FsbGJhY2spLmNhdGNoKGhpZGVDYWxsYmFjaykudGhlbigoKSA9PiBjdHJsLl9kaXNtaXNzKCkpO1xuXG4gICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfTtcblxufTtcblxuQW5ub3VuY2VtZW50U2VydmljZS4kaW5qZWN0ID0gWyckdHJhbnNsYXRlJywgJyRtZFRvYXN0JywgJyRyb290U2NvcGUnLCAnJGNvb2tpZXMnXTtcbiIsImNsYXNzIFBybVRvcGJhckFmdGVyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGFubm91bmNlbWVudFNlcnZpY2UsICRzY29wZSwgJGVsZW1lbnQsICR0cmFuc2xhdGUpIHtcbiAgICB0aGlzLmFubm91bmNlbWVudFNlcnZpY2UgPSBhbm5vdW5jZW1lbnRTZXJ2aWNlO1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcbiAgICB0aGlzLiR0cmFuc2xhdGUgPSAkdHJhbnNsYXRlO1xuICB9XG5cbiAgJG9uSW5pdCgpIHtcbiAgICAvLyBBbm5vdW5jZW1lbnQgZGlzcGxheWVkLlxuICAgIHRoaXMuYW5ub3VuY2VtZW50U2VydmljZS5kaXNwbGF5KClcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoZSkgY29uc29sZS5sb2coZSk7XG4gICAgICB9KTtcbiAgfTtcbn1cblxuUHJtVG9wYmFyQWZ0ZXJDb250cm9sbGVyLiRpbmplY3QgPSBbJ2Fubm91bmNlbWVudFNlcnZpY2UnLCAnJHNjb3BlJywgJyRlbGVtZW50JywgJyR0cmFuc2xhdGUnXTtcblxuZXhwb3J0IGxldCBQcm1Ub3BiYXJBZnRlckNvbmZpZyA9IHtcbiAgbmFtZTogJ3BybVRvcGJhckFmdGVyJyxcbiAgY29uZmlnOiB7XG4gICAgY29udHJvbGxlcjogUHJtVG9wYmFyQWZ0ZXJDb250cm9sbGVyLFxuICAgIHJlcXVpcmU6IHtcbiAgICAgIHByaW1vRXhwbG9yZUN0cmw6ICdecHJpbW9FeHBsb3JlJ1xuICAgIH1cbiAgfVxufTsiLCJpbXBvcnQgeyBBbm5vdW5jZW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9hbm5vdW5jZW1lbnQvYW5ub3VuY2VtZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJtVG9wYmFyQWZ0ZXJDb25maWcgfSBmcm9tICcuL2Fubm91bmNlbWVudC9wcm1Ub3BiYXJBZnRlci5jb21wb25lbnQnO1xuXG5hbmd1bGFyLm1vZHVsZSgndmlld0N1c3RvbScsIFsnYW5ndWxhckxvYWQnXSk7XG5cbmFuZ3VsYXIubW9kdWxlKCd2aWV3Q3VzdG9tJylcbiAgICAgIC5zZXJ2aWNlKCdhbm5vdW5jZW1lbnRTZXJ2aWNlJywgQW5ub3VuY2VtZW50U2VydmljZSlcbiAgICAgIC5jb21wb25lbnQoUHJtVG9wYmFyQWZ0ZXJDb25maWcubmFtZSwgUHJtVG9wYmFyQWZ0ZXJDb25maWcuY29uZmlnKTtcbiJdfQ==
