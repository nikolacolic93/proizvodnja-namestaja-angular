var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('MyCtrl', function($scope, $window, $http, $uibModal) {
    var vm = this;

    vm.searchText = "";
    vm.svi_proizvodi = [];
    vm.proizvodi = [];
    vm.page = "home";
    vm.naslov = "Kvalitetan nameštaj za Vaš dom";


    vm.filterNamestaja = function (vrsta) {
        vm.page = "namestaj";
        vm.kategorija = vrsta;
        vm.proizvod = null;
        vm.proizvodi = vm.kategorijeProizvoda[vrsta];
        vm.totalItems = vm.proizvodi.length;
        vm.naslov = vrsta;
    };

    vm.saloni = {
        "Srbija": [{ mesto: "Aleksinac", naziv: "Stari Hrast", adresa: "7.juli BB", telefon: "018 801 720", email: "/" , edit:false },
                 { mesto: "Arilje", naziv: "Steteks", adresa: "Stevana Čolovića bb", telefon: "031 896 562", email: "stetex.grujovic@gmail.com" , edit:false },
                 { mesto: "Bačka Topola", naziv: "EM Commerce", adresa: "Edvarda Kardelja bb", telefon: "024 711 018 ", email: "emc.salon@gmail.com" , edit:false },
                 { mesto: "Beograd", naziv: "Vitorog", adresa: "Autoput 18, TC Zmaj", telefon: "011 65 56 334", email: "miranabavka@vitorogpromet.rs" , edit:false },
                 { mesto: "Beograd", naziv: "Metalica commerce Doo", adresa: "Jurija Gagarina 15/a, TC Piramida", telefon: "011 2276075", email: "doobojan@mts.rs" , edit:false }
        ],
        "Crna Gora": [{ mesto: "Berane", naziv: "Novi dom - Simpo", adresa: "Beranselo BB", telefon: "00 382 51 230 459", email: "novidomsimpoba@gmail.com" , edit:false },
                 { mesto: "Bijelo Polje", naziv: "Naš dom - Simpo", adresa: "Slobodana Penezića BB", telefon: "00 382 50 432 151", email: "mevrodizajn@yahoo.com" , edit:false },
                 { mesto: "Podgorica", naziv: "Grand", adresa: "Oktobarskih revolucija", telefon: "00 382 20 622 054", email: "nenagrand@gmail.com" , edit:false },
                 { mesto: "Herceg Novi", naziv: "Kaza DOO", adresa: "Njegoševa 140", telefon: "00 382 31 324 804", email: "kandjela09@t-com.me" , edit:false }
        ],
        "Makedonija": [{ mesto: "Bitola", naziv: "Evrodizajn", adresa: "Pitu Guli 20", telefon: "00 389 47 241 241", email: "mevrodizajn@yahoo.com" , edit:false },
                 { mesto: "Gevgelija", naziv: "Jivi", adresa: "Železnička", telefon: "00 389 34 214 299", email: "milena@jivi.mk" , edit:false },
                 { mesto: "Kičevo", naziv: "Jetmir", adresa: "Maršala Tita 244", telefon: "00 389 45 224 064", email: "jjetmir@yahoo.com" , edit:false },
                 { mesto: "Skopje", naziv: "Kristina Damil", adresa: "Gorče Petrov 117", telefon: "00 389 22 050 755", email: "kristina-damil@mt.net.mk" , edit:false },
                 { mesto: "Strumica", naziv: "11. Septembri", adresa: "Vasilevo", telefon: "00 389 34 354 100", email: "mirijanamentinova@yahoo.com" , edit:false }
        ],
    };

    vm.salon = null;
    vm.original = null;

    vm.selektujDrzavu = function (drzava, podaci) {
        vm.page = "saloni";
        vm.selektovanaDrzava = [];
        vm.selektovanaDrzava = podaci;
        vm.naslov = "Saloni " + drzava;
    };

    vm.selektujSalon = function (salon) {
        salon.edit = true;
        vm.salon = salon;
        vm.original = angular.copy(salon);
        console.log(vm.original);
    };

    vm.cancel = function (salon) {
        salon.edit = false;
        salon.mesto = vm.original.mesto;
        salon.naziv = vm.original.naziv;
        salon.adresa = vm.original.adresa;
        salon.telefon = vm.original.telefon;
        salon.email = vm.original.email;
    };

    vm.save = function (salon) {
        vm.salon = null;
        salon.edit = false;
        delete vm.original;
    };


    vm.users = [
      {username: "nikola@singi.ac.rs", password: "123"}
    ];
    vm.user = null;

    vm.username = 'nikola@singi.ac.rs';

    vm.listaKategorija = [];
    vm.kategorijeProizvoda = {};
    vm.stiloviProizvoda = {};
    vm.stil = [];
    vm.order = null;

    vm.prikaziSve = function () {
        vm.proizvodi = [];
        for (var i in vm.svi_proizvodi) {
            vm.proizvodi.push(vm.svi_proizvodi[i])
        }
        vm.proizvod = null;
    };

    vm.filterStil = function(stil){
      vm.proizvodi = [];
      for(var i in vm.svi_proizvodi){
        if (vm.svi_proizvodi[i].stil === stil) {
          vm.proizvodi.push(vm.svi_proizvodi[i])
        }
      }
      vm.proizvod = null;
    };

    vm.ponistiSort = function () {
        vm.order = null;
    };

    vm.oNama = function () {
        vm.page = "about";
        vm.naslov = "O nama";
        $("a").blur();
    };

    vm.kontakt = function () {
        vm.page = "contact";
        vm.naslov = "Kontakt";
        $("a").blur();
    }


    vm.kategorija = null;
    vm.proizvod = null;

    vm.login = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: function($uibModalInstance, parent){
            var $ctrl = this;

            $ctrl.stanje = 'Login';

            $ctrl.user = parent.user;
            $ctrl.username = parent.username;
            $ctrl.password;

            $ctrl.login = function(){
              for(var i in parent.users){
                console.log(parent.users[i]);
                if(parent.users[i].username === $ctrl.username 
                  && parent.users[i].password === $ctrl.password){
                    $ctrl.user = parent.user = parent.users[i];
                    console.log("Ulogovan korisnik "+ $ctrl.user.username);
                }
              }
              $uibModalInstance.close($ctrl.username);
            };

            $ctrl.register = function(){
              var newUser = {};
              var names = [];
              for(var i in parent.users){
                names.push(parent.users[i].username);
              };
              if(names.indexOf($ctrl.username) === -1){
                  if ($ctrl.password === $ctrl.confirmPassword) {
                      newUser.username = $ctrl.username;
                      newUser.password = $ctrl.password;
                      parent.users.push(newUser);
                      alert('Kreiran korisnik ' + $ctrl.username);
                      $ctrl.username=null;
                      $ctrl.password=null;
                      $ctrl.confirmPassword=null;
                      console.log('Kreiran korisnik ' + $ctrl.username);
                      }
                  else {
                  $uibModalInstance.close($ctrl.username);
                    }
              }
              else { 
                $uibModalInstance.close($ctrl.username);
              }
            };

            $ctrl.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
        },
        controllerAs: '$ctrl',
        resolve: {
          parent: function () {
            return vm;
          }
        }
      });

      modalInstance.result.then(function (username) {
        console.log(username);
      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });
    };

    vm.logout = function(){
      console.log('Izlogovan korisnik ' + vm.user.username);
      vm.user = null;
    };


    vm.home = function(){
      vm.kategorija = null;
      vm.proizvod = null;
      vm.proizvodi = vm.svi_proizvodi;
      vm.totalItems = vm.proizvodi.length;
    }
    vm.filterKategorije = function(kategorija){
      vm.kategorija = kategorija;
      vm.proizvod = null;
      vm.proizvodi = vm.kategorijeProizvoda[kategorija];
      vm.totalItems = vm.proizvodi.length;
    }

    vm.selektujProizvod = function(el){
      vm.proizvod = el;
      vm.kategorija = el.kategorija;
    }

    vm.init = function(){
      var req = {
          method: "GET",
          url: "namestaj.json"
      }
      $http(req).then(
          function(resp){
            console.log(resp);
            var lista = [];
            vm.svi_proizvodi = resp.data;
            vm.kategorijeProizvoda = {};
            vm.listaKategorija = [];
            vm.stiloviProizvoda = {};
            vm.stil = [];
            for(var i in vm.svi_proizvodi){
              var proizvod = vm.svi_proizvodi[i];
              if(!(proizvod.kategorija in vm.kategorijeProizvoda)){
                vm.listaKategorija.push(proizvod.kategorija);
                vm.kategorijeProizvoda[proizvod.kategorija] = [proizvod];
              }else{
                vm.kategorijeProizvoda[proizvod.kategorija].push(proizvod);
              }
              if(!(proizvod.stil in vm.stiloviProizvoda)){
                  vm.stil.push(proizvod.stil);
                  vm.stiloviProizvoda[proizvod.stil] = [proizvod];
              } else {
                  vm.stiloviProizvoda[proizvod.stil].push(proizvod);
              }
                
              if(proizvod.naziv.toLowerCase().indexOf(vm.searchText.toLowerCase())!=-1){
                lista.push(proizvod);
              }
            }
            vm.totalItems = lista.length;
            vm.proizvodi = lista;
          }, function(resp){
              vm.message = 'error';
          });
    };

    vm.init();


});

