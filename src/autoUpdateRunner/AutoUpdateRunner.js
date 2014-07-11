angular.module('cgGrid.autoUpdateRunner', ['cgGrid.gridFactory'])
    .factory('AutoUpdateRunner', function ($log, $interval, GridFactory) {

        function startAutoUpdate(scope, config) {

            $log.info('started auto update')
            var self = this
            var updateInterval = config.autoUpdateInterval

            scope.intervalPromise = $interval(function () {
                self.checkForUpdates(scope)
            }, updateInterval)

        }
        

        function checkForUpdates(scope) {

            $log.info('checking for updates')

            function success() {
                scope.gridRows = (GridFactory.data).data.rows.length
            }

            GridFactory.getData().then(success)

        }

        function killAutoUpdate(scope) {

            $log.info('killed auto update')
            if ($interval.cancel(scope.intervalPromise) === false)
                throw 'Failed to Cancel $interval'


        }

        return {
            startAutoUpdate: startAutoUpdate,
            checkForUpdates: checkForUpdates,
            killAutoUpdate: killAutoUpdate

        }

    })