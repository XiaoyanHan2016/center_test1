(function () {
    var Urlbap={
        usrl:"http://192.168.1.31:5000",
        urlt:""
    }


    var app = angular.module('storeApp', ['ui.router', 'ngCookies']);
    app.run(function ($rootScope, $state, $stateParams, $cookieStore) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.isLogin = $cookieStore.get('isLogin');

        //console.log("password:"+$scope.user.password);
    });
    app.config(function ($stateProvider, $urlRouterProvider) {
        //$urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/static/page/login.html'
            })
            .state('index', {
                url: '/index',
                templateUrl: 'index.html',
                controllerProvider: function ($rootScope) {
                    //if (!$rootScope.isLogin) {
                        $rootScope.$state.go('login');
                    //}
                }
            })
            .state('detail', {
                url: '/detail',
                templateUrl: './page/SetUp/ShareholderManagement/ShareholderManagement.html'
            })
            .state('Share', {
                url: '/Share',
                templateUrl: './page/SetUp/StoreManagement/StoreManagement.html'
            })
            .state('ProjectM', {
                url: '/ProjectM',
                templateUrl: './page/SetUp/ProjectManagement/ProjectManagement.html'
            })
            .state('AddShare', {
                url: '/AddShare',
                templateUrl: './page/SetUp/ShareholderManagement/AddShareholderMan.html'
            })
            .state("Exit",{
                url:"/Exit",
                templateUrl:'./page/SetUp/ShareholderManagement/ShareholderManagement.html'
            })
            .state("Sevise",{
                url:"/Sevise",
                templateUrl:'./page/SetUp/ShareholderManagement/SeviseShare.html'
            })
            .state('AddStore', {
                url: '/AddStore',
                templateUrl: './page/SetUp/StoreManagement/AddStore.html'
            })
            .state("Accountent",{
                url:"/Accountent",
                templateUrl:'./page/AccountedFor/AccountedFor.html'
            })
            .state("StoresAccountedFor",{
                url:"/StoresAccountedFor",
                templateUrl:'./page/AccountedFor/StoresAccountedFor.html'
            })
            .state("Headquarters",{
                url:"/Headquarters",
                templateUrl:'./page/AccountedFor/Headquarters.html'
            })

    });
    app.controller('loginCtrl', ['$scope', '$rootScope', '$cookieStore', function ($scope, $rootScope, $cookieStore,$http) {
        $scope.login = function () {

            $cookieStore.put('name',$scope.user);
            $rootScope.$state.go("detail");

        }
        $scope.getCookieinfo= function () {
            var favoriteCookie = $cookieStore.get('name');
            console.log(favoriteCookie.username);
            console.log(favoriteCookie.password);
        }

        $scope.removeCookieinfo= function () {
            $cookieStore.remove('name');
        }
        $scope.Store=function(){
            $rootScope.$state.go("Share");
        }
        $scope.Shareholder=function(){
            $rootScope.$state.go("detail");
        }
        $scope.Project=function(){
            $rootScope.$state.go("ProjectM");
        }
        $scope.addShare=function(){

            $rootScope.$state.go("AddShare");
        }
        $scope.Exit=function(){
            $rootScope.$state.go("Exit");
        }
        $scope.Sevise=function(){
            $rootScope.$state.go("Sevise");
        }

        $scope.Exitshare=function(){
            $rootScope.$state.go("Share");
        }
        //»Î’À
        $scope.Accountent=function(){
            $rootScope.$state.go("Accountent");

        };
        $scope.StoresAccountedFor=function(){
            $rootScope.$state.go("StoresAccountedFor");
        };
        $scope.SetUp=function(){
            $rootScope.$state.go("detail");
        }
        $scope.myvar=false;
        $scope.holderman="";

        $scope.addmontyd = function() {
            $scope.myvar = !$scope.myvar;

        }
        var arwt= Array();

        $scope.addholderman=function(m){
            if (arwt[m] != m)
                arwt[m] = m;
            else
            {
                arwt[m]="";
            }

            $scope.holderman="";
            for (a in arwt) {

                if ($scope.holderman != "" && arwt[a]!="") {
                    $scope.holderman += "," + arwt[a];
                } else {
                    $scope.holderman += arwt[a]
                }
            }



        }


    }]);

    app.controller('customersCtrl', function($scope,$rootScope, $http) {
        //http://localhost:63342/ZTApp/ajax/package.json
        $http.get(Urlbap.usrl+"/api/v1/stores")
            .success(function(response) {
                var jsonBook=JSON.parse(response);
                $scope.datas=JSON.parse(jsonBook);

            });

        $scope.AddStore=function(){
            $rootScope.$state.go("AddStore");
        }
        $scope.removeCookieinfo= function () {
            $cookieStore.remove('name');
        }
        $scope.Store=function(){
            $rootScope.$state.go("Share");
        }
        $scope.Shareholder=function(){
            $rootScope.$state.go("detail");
        }
        $scope.Project=function(){
            $rootScope.$state.go("ProjectM");
        }
        $scope.addShare=function(){

            $rootScope.$state.go("AddShare");
        }
        $scope.Exit=function(){
            $rootScope.$state.go("Exit");
        }
        $scope.Sevise=function(){
            $rootScope.$state.go("Sevise");
        }

        $scope.Exitshare=function(){
            $rootScope.$state.go("Share");
        }
        $scope.SetUp=function(){
            $rootScope.$state.go("detail");
        }

    });
    app.controller('loginCtrlAccountedFor',function($scope,$rootScope,$http)
        {
            $scope.StoresAccountedFor=function(){
                $rootScope.$state.go("StoresAccountedFor");
            }
            $scope.Accountent=function(){
                $rootScope.$state.go("Accountent");

            };
            $scope.Headquarters=function(){
                $rootScope.$state.go("Headquarters");

            };
            $scope.SetUp=function(){
                $rootScope.$state.go("detail");
            }

        }
    )
    app.controller('loginCtrlcommt', function($scope,$rootScope,$http) {
        var arraya5= [
            'false',
            'false',
            'false',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'false',
            'false',
            'false',
            'true',
            'false',
            'true',
            'true',
            'false'
        ];
        //http://localhost:63342/ZTApp/ajax/login.json

        $http.get(Urlbap.usrl+"/api/v1/branchaccountbook/USA/2015/1")
            .success(function(response) {

                var jsonBook=response;

                var p = jsonBook.data;
                function P(name,value,type)
                {
                    this.name= name;
                    this.value= value;
                    this.type=type;
                }
                var lits= Array();
                var j=0;
                for(var i in p)
                {

                    lits.push(new P(i,p[i],arraya5[j]))
                    j++;
                }

                $scope.datas=lits;
           });



        $scope.Accountent=function(){
            $rootScope.$state.go("Accountent");

        };
        $scope.SetUp=function(){
            $rootScope.$state.go("detail");
        }
        $scope.myVar = false;
        $scope.myVar1 = false;
        $scope.myVar2 = false;
        $scope.toggle = function() {
            $scope.myVar = !$scope.myVar;
        }
        $scope.toggle1 = function() {
            $scope.myVar1 = !$scope.myVar1;
        }
        $scope.toggle2 = function() {
            $scope.myVar2 = !$scope.myVar2;
        }
        $scope.addrname="";
        $scope.year1="";
        $scope.mouth2="";
        $scope.getname=function(m)
        {

            $scope.addrname=m;
        }
        $scope.year=function(y)
        {

            $scope.year1=y;
        }
        $scope.mouth=function(m)
        {

            $scope.mouth2=m;
        }


        $scope.processForm = function() {
         var datas = $("#ptat").find("input") ;

            $scope.formData= {
                "data"
                    :
                {

                }
                ,
                "month"
                    :
                   parseInt($("#moutd").html())
                   ,
                "storename"
                    :
                    $("#addr").html(),
                "year"
                    :
                    $("#yeart").html()
            }
            var gd=[];
            for (var t in datas)
            {

                gd[datas.eq(t).attr("name")]= datas.eq(t).val();
            }
            $scope.formData.data=gd;
            $http({
                method  : 'POST',
                //url     : "http://localhost:63342/ZTApp/ajax/login.json",
               url     : Urlbap.usrl+"/api/v1/branchaccountbook/USA/2015/1",
                data    : $.param($scope.formData),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function(data) {
                    console.log(data);

                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        $scope.errorName = data.errors.name;
                        $scope.errorSuperhero = data.errors.superheroAlias;
                    } else {
                        // if successful, bind success message to message
                       console.log(data);
                    }
                });

        }



    })

    app.controller('loginCtrlcommtH', function($scope,$rootScope,$http) {
        var arraya5= [
            'false',
            'false',
            'false',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'false',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'false',
            'false',
            'false',
            'true',
            'false',
            'true',
            'true',
            'false'
        ];

        $http.get(Urlbap.usrl+"/api/v1/branchaccountbook/USA/2015/1")
            .success(function(response) {

                var jsonBook=response;

                var p = jsonBook.data;
                function P(name,value,type)
                {
                    this.name= name;
                    this.value= value;
                    this.type=type;
                }
                var lits= Array();
                var j=0;
                for(var i in p)
                {

                    lits.push(new P(i,p[i],arraya5[j]))
                    j++;
                }
                console.log(lits.length)
                $scope.datas=lits;
            });



        $scope.Accountent=function(){
            $rootScope.$state.go("Accountent");

        };
        $scope.SetUp=function(){
            $rootScope.$state.go("detail");
        }
        $scope.myVar = false;
        $scope.myVar1 = false;
        $scope.myVar2 = false;
        $scope.toggle = function() {
            $scope.myVar = !$scope.myVar;
        }
        $scope.toggle1 = function() {
            $scope.myVar1 = !$scope.myVar1;
        }
        $scope.toggle2 = function() {
            $scope.myVar2 = !$scope.myVar2;
        }
        $scope.addrname="";
        $scope.year1="";
        $scope.mouth2="";
        $scope.getname=function(m)
        {

            $scope.addrname=m;
        }
        $scope.year=function(y)
        {

            $scope.year1=y;
        }
        $scope.mouth=function(m)
        {

            $scope.mouth2=m;
        }


    })



    app.controller('Resport', function($scope,$rootScope,$http) {


       /* $http.get()
            .success(function(response) {

                var jsonBook=response;

                var p = jsonBook.data;
                function P(name,value,type)
                {
                    this.name= name;
                    this.value= value;
                    this.type=type;
                }
                var lits= Array();
                var j=0;
                for(var i in p)
                {

                    lits.push(new P(i,p[i],arraya5[j]))
                    j++;
                }
                console.log(lits.length)
                $scope.datas=lits;
            });

*/

        $scope.Accountent=function(){
            $rootScope.$state.go("Accountent");

        };
        $scope.SetUp=function(){
            $rootScope.$state.go("detail");
        }
        $scope.myVar = false;
        $scope.myVar1 = false;
        $scope.myVar2 = false;
        $scope.toggle = function() {
            $scope.myVar = !$scope.myVar;
        }
        $scope.toggle1 = function() {
            $scope.myVar1 = !$scope.myVar1;
        }
        $scope.toggle2 = function() {
            $scope.myVar2 = !$scope.myVar2;
        }
        $scope.holders="";
        $scope.year1="";

        $scope.holders=function(m)
        {

            $scope.holders=m;
        }
        $scope.year=function(y)
        {

            $scope.year1=y;
        }



    })


})();
