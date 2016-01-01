

angular.module('githubApp',[])

.config(function ($httpProvider){
	var interceptor = function($q){
   return {
   	request :  function(config){
   		console.log(config);
   		return config;
   	},
   	response : function(result){
   		console.log("starts");
   		result.data.forEach(function(repo){
   			console.log(repo.name);
   		})
   		return result;
   	},
   	responseError : function(rejection){
   		console.log('Reason',rejection.status);
   		return $q.reject(rejection);
   	}
   }
};
       $httpProvider.interceptors.push(interceptor);
})

.controller("MainController",function($scope,$http){
	$scope.title = "Test App";
	$http({method: 'GET', url: 'https://api.github.com/users/hamdiceylan/repos'}).success(function(data, status, headers, config) {
		$scope.repos = data;
		console.log(data.length);
	})
});
