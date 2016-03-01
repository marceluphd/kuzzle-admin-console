angular.module('kuzzle.metrics')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('metrics', {
        parent: 'logged',
        views: {
          bodyView: {templateUrl: '/metrics'}
        },
        resolve: {
          index: ['indexesApi', function(indexesApi) {
            indexesApi.data.showSelector = false;
          }]
        }
      });
  }]);