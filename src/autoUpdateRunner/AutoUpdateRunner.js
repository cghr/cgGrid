angular.module('cgGrid.autoUpdateRunner', ['cgGrid.service'])
    .factory('AutoUpdateRunner', function ($log, $interval, GridService) {

        var startAutoUpdate = function (scope, config) {

            $log.info('started auto update')
            var self = this
            scope.intervalPromise = $interval(function () {
                self.checkForUpdates(scope)
            }, config.autoUpdateInterval)

        }

        var checkForUpdates = function (scope) {

            $log.info('checking for updates')
            var done = function (resp) {
                scope.gridRows = resp.data.data.rows.length
            }
            var fail = function () {
                $log.error('Error while fetching data ')
            }
            GridService.getData().then(done, fail)

        }

        var killAutoUpdate = function (scope) {

            $log.info('killed auto update')
            if ($interval.cancel(scope.intervalPromise) === false) {
                throw 'Failed to Cancel $interval'
            }

        }

        return {
            startAutoUpdate: startAutoUpdate,
            checkForUpdates: checkForUpdates,
            killAutoUpdates: killAutoUpdate

        }

    })