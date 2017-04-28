namespace CarDealershipApp.Controllers {

    export class HomeController {
        public car;
        public make;
        public makeList;        
        public id;


        public showModal(searchId) {
            this.$uibModal.open({
                templateUrl: '/ngApp/views/dialog.html',
                controller: CarDealershipApp.Controllers.DialogController,
                controllerAs: 'controller',
                resolve: { id: () => searchId, },
                size: 'md'
            });
        }

        constructor(private $uibModal: angular.ui.bootstrap.IModalService, private $http: ng.IHttpService) {
            this.$http.get('/api/cars')
                .then((response) => {
                    this.car = response.data;
                })
                .catch((response) => {
                    console.error('Could not retrieve car.');
                });
            this.$http.get('/api/makes')
                .then((response) => {
                    this.make = response.data;
                })
                .catch((response) => {
                    console.error('Could not retrieve make.');
                });}
    }
    angular.module('CarDealershipApp').controller('HomeController', HomeController);

    export class DialogController {
        public carDetails;

        public ok() {
            this.$uibModalInstance.close();
        }

        constructor(private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, public id, private $http: ng.IHttpService) {
            this.$http.get('/api/cars/' + id).then((res) => {
                this.carDetails = res.data;
            })


        }
    }

    angular.module('CarDealershipApp').controller('DialogController', DialogController);

}
