angular.module('cgGrid.autoUpdateRunner', ['cgGrid.service'])
    .factory('AutoUpdateRunner', function ($log, $interval, GridService) {

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
            var done = function (resp) {
                var httpResp = resp.data
                scope.gridRows = httpResp.data.rows.length
            }
            var fail = function () {
                $log.error('Error while fetching data ')
            }
            GridService.getData().then(done, fail)

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