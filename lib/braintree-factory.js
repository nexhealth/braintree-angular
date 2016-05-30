function braintreeFactory(braintree) {
  return function braintreeAngular(clientTokenPath, $http) {
    var $braintree = {}

    $braintree.clientToken = null

    Object.keys(braintree).forEach(function(key) {
      $braintree[key] = braintree[key]
    })

    $braintree.getClientToken = function(params, auth) {
      var path = clientTokenPath

      if (params) {
        // TODO: Use a library for this
        path += '?'
        path += Object.keys(params).map(function(key) {
          var value = params[key]
          return key + '=' + value
        }).join('&')
      }
      var req = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      };

      return $http.get(path, req)
    }

    $braintree.setupDropin = function(options, params, auth) {
      $braintree.getClientToken(params, auth)
        .success(function(token) {
          braintree.setup(token, 'dropin', options)
        })
        .error(function(data, status) {
          console.error('error fetching client token at ' + clientTokenPath, data, status)
        })
    }

    $braintree.setupPayPal = function(options, params, auth) {
      $braintree.getClientToken(params, auth)
        .success(function(token) {
          braintree.setup(token, 'paypal', options)
        })
        .error(function(data, status) {
          console.error('error fetching client token at ' + clientTokenPath, data, status)
        })
    }

    return $braintree
  }
}

module.exports = braintreeFactory
