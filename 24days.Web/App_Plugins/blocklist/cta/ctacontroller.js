angular.module("umbraco").controller("ctaController", function ($scope, mediaResource) {

    $scope.$watch('block.data', function(oldVal,newVal) {
        $scope.bgcolor = $scope.block.data.backgroundColor !== null && $scope.block.data.backgroundColor.label !== undefined ? $scope.block.data.backgroundColor.label : 'indigo';
        $scope.blockbgcolor = $scope.block.settingsData.backgroundColor.label !== undefined ? $scope.block.settingsData.backgroundColor.label + '-200' : 'white';
        var imageUdi = $scope.block.data.image;

        if (imageUdi !== null && imageUdi !== '') {
            mediaResource.getById(imageUdi)
                .then(function (media) {
                    console.log(media);
                    $scope.imageUrl = media.mediaLink;
                });
        }

    }, true);

    $scope.$watch('block.settingsData', function (oldVal, newVal) {
        $scope.blockbgcolor = $scope.block.settingsData.backgroundColor !== null && $scope.block.settingsData.backgroundColor.label !== undefined ? $scope.block.settingsData.backgroundColor.label + '-200' : 'white';
    },true );
});