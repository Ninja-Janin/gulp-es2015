// import common     from './common/module'
// import components from './components/module'

// common();
// components();
// guest();
import angular from 'angular';


angular.module('app', [])
	.controller('AppCtrl', ['$scope', function($scope) {
		$scope.title = 'ES 2015';
		$scope.myHandler = function() {
			$scope.title = 'test';
		};
	}])
