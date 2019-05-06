(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        /**
         * Annoncement service.
         * Displays a md-toast on top of the view, containing an announcement retrieved from the code tables.
         */
        var AnnouncementService = exports.AnnouncementService = function () {
            function AnnouncementService($translate, $mdToast, $rootScope, $cookies) {
                var _this = this;

                _classCallCheck(this, AnnouncementService);

                this.$translate = $translate;
                this.$mdToast = $mdToast;
                this.$rootScope = $rootScope;
                this.$cookies = $cookies;

                this._dismissed = false;

                // Forget the dismissal if the language is changed.
                this.$rootScope.$on('$translateChangeSuccess', function () {
                    _this._dismissed = false;
                });
            }

            _createClass(AnnouncementService, [{
                key: '_dismiss',


                // The announcement has been dismissed.
                value: function _dismiss() {
                    this._dismissed = true;
                    this._toastPromise = null;
                }
            }, {
                key: 'display',


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
                            }
                            // If there is no announcement to be displayed.
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
                            }

                            // If there is already a toast promise,
                            // avoid creating a new one.
                            ctrl._toastPromise = ctrl._toastPromise || ctrl.$mdToast.show({
                                // Timeout duration in msecs. false implies no timeout.
                                hideDelay: false,
                                position: 'top',
                                controller: function controller() {
                                    return {
                                        close: function close() {
                                            ctrl.$mdToast.hide();
                                            // Save as cookie
                                            ctrl.$translate('nui.message.announcement').then(function (response) {
                                                return ctrl.$cookies.put('announcement', response);
                                            });
                                        }
                                    };
                                },
                                controllerAs: '$ctrl',
                                template: '<md-toast class="page-notification" style="top: 0px; position: sticky !important;">\n    <div class="md-toast-content" style="box-shadow:none; width: 100%;">\n        <span class=\'md-toast-text\' flex translate=\'nui.message.announcement\'>\n  </span>\n    </div>\n    <a class="close" ng-click=\'$ctrl.close()\' aria-label="{{\'nui.message.dismiss\' | translate}}" style="position: absolute; right: 1.5rem; top: 1.5rem;">\n<prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="close"><!----><md-icon ng-if="!$ctrl.isCustom" md-svg-icon="primo-ui:close" alt="" class="md-primoExplore-theme" aria-hidden="true"><svg id="close" width="100%" height="100%" viewBox="0 0 24 24" y="240" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">\n        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>\n    </svg></md-icon><!----><!----><prm-icon-after parent-ctrl="$ctrl"></prm-icon-after></prm-icon></a>\n</md-toast>'
                            });

                            ctrl._toastPromise.then(hideCallback).catch(hideCallback).then(function () {
                                return ctrl._dismiss();
                            });

                            resolve();
                        });
                    });
                }
            }]);

            return AnnouncementService;
        }();

        ;

        AnnouncementService.$inject = ['$translate', '$mdToast', '$rootScope', '$cookies'];

    },{}],2:[function(require,module,exports){
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var PrmTopbarAfterController = function () {
            function PrmTopbarAfterController(announcementService, $scope, $element, $translate) {
                _classCallCheck(this, PrmTopbarAfterController);

                this.announcementService = announcementService;
                this.$scope = $scope;
                this.$element = $element;
                this.$translate = $translate;
            }

            _createClass(PrmTopbarAfterController, [{
                key: '$onInit',
                value: function $onInit() {
                    // Announcement displayed.
                    this.announcementService.display().catch(function (e) {
                        if (e) console.log(e);
                    });
                }
            }]);

            return PrmTopbarAfterController;
        }();

        PrmTopbarAfterController.$inject = ['announcementService', '$scope', '$element', '$translate'];

        var PrmTopbarAfterConfig = exports.PrmTopbarAfterConfig = {
            name: 'prmTopbarAfter',
            config: {
                controller: PrmTopbarAfterController,
                require: {
                    primoExploreCtrl: '^primoExplore'
                }
            }
        };

    },{}],3:[function(require,module,exports){
        'use strict';

        var _announcement = require('./announcement/announcement.service');

        var _prmTopbarAfter = require('./announcement/prmTopbarAfter.component');

        angular.module('viewCustom', ['angularLoad']);

        angular.module('viewCustom').service('announcementService', _announcement.AnnouncementService).component(_prmTopbarAfter.PrmTopbarAfterConfig.name, _prmTopbarAfter.PrmTopbarAfterConfig.config);

    },{"./announcement/announcement.service":1,"./announcement/prmTopbarAfter.component":2}]},{},[3]);