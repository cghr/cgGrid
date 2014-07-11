angular.module('cgGrid.dhtmlxGrid', ['cgGrid.config', 'cgGrid.jsonUtil', 'cgGrid.GridUtil', 'cgGrid.lodash', 'cgGrid.autoUpdateRunner'])
    .directive('dhtmlxGrid', function (GridConfig, $compile, JsonUtil, $interval, $log, GridUtil, AutoUpdateRunner, _) {


        function postLink(scope, element) {

            var childNodes = element.children()
            var config = {
                gridElement: childNodes[0],
                pagingElement: childNodes[1]
            }

            _.extend(config, GridConfig)
            _.isUndefined(scope.options) ? GridUtil.remoteInitialize(config, scope) : GridUtil.resolveLocalInitialize(config, scope)

            if (config.autoUpdate)
                AutoUpdateRunner.startAutoUpdate(scope, config)

            /*
             Watch for Changes in Grid Rows
             */
            scope.$watch('gridRows', function () {

                if (config.autoUpdate && _.isUndefined(scope.options))
                    GridUtil.remoteInitialize(config, scope)

            })
            /*
             Kill Auto Update when View is destroyed
             */
            scope.$on('$destroy', function () {

                if (config.autoUpdate)
                    AutoUpdateRunner.killAutoUpdate(scope)

                $log.info('killed auto update')
            })

        }

        return {
            template: '<div></div><div></div>',
            scope: { options: '=' },
            restrict: 'E',
            link: postLink
        }
    })