this.gitHash = '3.3.6 [e50cde1ecef6c4eb0c398238b03b0cd49e4c0c5b] Mon Feb 23 2015 @ 14:49:35 GMT+0100 (CET)';

requirejs.config({
  'baseUrl': '/',
  'paths': {
    'wb': 'loaders/wunderbits',
    'template': 'loaders/templates',
    'partial': 'loaders/partials',
    'style': 'loaders/styles'
  }
});

define('urls', function() {
  return {
    'baseUrl': './'
  };
});

define('config', function() {
  return {
    'name': "crx-production",
    'package': true,
    'release': '3.3.6',
    'api': {"host":"https://a.wunderlist.com/api"},
    'oldApi': {"host":"https://api.wunderlist.com"},
    'analytics': {"ga":"UA-3239969-30"},
    'clientID': "66b6a7c710ca932826f5",
    'comments': {},
    'domain_name': 'www.wunderlist.com',
    'files': {},
    'google': {
      'chromeAppID': '773050426390-8aff4g1mfag0qpnnonpkt7fdv3pl9u9g.apps.googleusercontent.com'
    },
    'invitations': {"host":"https://invitations.wunderlist.com"},
    'facebook': {"appID":"208559595824260"},
    'payment': {"host":"https://payment.wunderlist.com"},
    'realtime': {"host":"wss://socket.wunderlist.com/api/v1/sync"},
    'tracking': {"host":"https://t.wunderlist.com"},
    'urlshortener': {"host":"https://www.wunderli.st"},
    'features': {},
    'business': {"host":"https://business.wunderlist.com"},
    'webSocketTimeout': "30000",
    'echo': {"host":"https://offer.wunderlist.com"},
    'bugsnagKey': "62adf1a89881cadfe0d5259ab71b7fe2"
  };
});
