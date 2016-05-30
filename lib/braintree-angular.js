// Everything that's not easily unit testable goes in this file

var braintreeWeb = require('braintree-web')
var braintreeFactory = require('./braintree-factory')
var braingular = window.angular.module('braintree-angular', [])

braingular.factory('$braintree', [
  'clientTokenPath',
  '$http',
  braintreeFactory(braintreeWeb)
])

braingular.directive('braintreeDropin', function () {
  return {
    restrict: 'AEC',
    scope: {
      options: '=',
      req: '='
    },
    template: '<div id="bt-dropin"></div>',
    controller: ['$scope', '$braintree', function ($scope, $braintree) {
      var options = $scope.options || {}
      var req = $scope.req || {}
      options.container = 'bt-dropin'

      $braintree.setupDropin(options, req.params, req.auth)
    }]
  }
})

braingular.directive('braintreePaypal', function () {
  return {
    restrict: 'AEC',
    scope: {
      options: '=',
      req: '='
    },
    template: '<div id="bt-paypal"></div>',
    controller: ['$scope', '$braintree', function ($scope, $braintree) {
      var options = $scope.options || {}
      var req = $scope.req || {}

      options.container = 'bt-paypal'

      $braintree.setupPayPal(options, req.params, req.auth)
    }]
  }
})

module.exports = braingular
