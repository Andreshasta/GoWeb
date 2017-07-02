'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:LloronaCtrl
 * @description
 * # LloronaCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller('LloronaCtrl', function ($scope, $http) {
    $scope.juego = 2;
    $scope.Id=1;
    $http.get(api_path + 'puntaje?limit=0').then(function(response) {
      $scope.data = response.data;
      var ini= 0;
      var jni=0;
      $http.get(api_path + 'jugador?limit=0').then(function(responses){
        $scope.dataUsuario = responses.data;
      });
      if($scope.dataUsuario!=null){
        var numeroUs= $scope.dataUsuario.length;
        for(ini=0; ini<$scope.data.length;ini++){
          for(jni=0; jni < numeroUs; jni++){
            if($scope.data[ini].IdJugador.Id== $scope.dataUsuario[jni].Id){
              $scope.data[ini].IdJugador.NNombrejugador = $scope.dataUsuario[jni].NNombrejugador;
            }
          }
        }
      }
      $scope.dataFinal=new Array();
      var num=0;
      for(ini=0; ini<$scope.data.length;ini++){
        if($scope.data[ini].IdJuego.Id == $scope.juego){
          $scope.dataFinal[num]  = $scope.data[ini];
          num++;
        }
      }
    });
    $scope.load=function(){
      $http.get(api_path + 'jugador?limit=0').then(function(responses) {
        $scope.datas = responses.data;
        $scope.add();
      });
    }
    $scope.add = function(){
      if($scope.NNombrejugador == null){
        return;
      }
      var n=0;
      var verificar=false;
      if($scope.datas != null){
        for( n=0 ; n < $scope.datas.length ; n++){
          if($scope.datas[n].NNombrejugador ==  $scope.NNombrejugador){
            verificar = true;
            $scope.Id = $scope.datas[n].Id ;
          }
        }
        if(!verificar){
          var data = {
            NNombrejugador : $scope.NNombrejugador,
          };
          $http.post(api_path +'jugador',data);
          var numero = $scope.datas.length;
          $scope.Id = numero+1;
        }
      } else {
        var data = {
          NNombrejugador : $scope.NNombrejugador,
        };
        $http.post(api_path +'jugador',data);
        $scope.Id = 1;
      }
      var data1 = {
        VPuntaje : parseInt($('input:text[name=VPuntaje]').val()),
        IdJuego :{Id:  $scope.juego} ,
        IdJugador: {Id:  $scope.Id},
      };
      $http.post(api_path + 'puntaje',data1);
    }
  });
