angular.module('cgGrid.dhtmlxGrid', ['cgGrid.config', 'cgGrid.service', 'cgGrid.jsonUtil', 'cgGrid.GridUtil', 'cgGrid.lodash', 'cgGrid.autoUpdateRunner'])
    .directive('dhtmlxGrid', function (GridConfig, GridService, $compile, JsonUtil, $interval, $log, GridUtil, AutoUpdateRunner, _) {
        return {
            template: '<div></div><div></div>',
            scope: {
                options: '='
            },
            restrict: 'E',
            link: function postLink(scope, element) {

                var childNodes = element.children()
                var config = {
                    gridElement: childNodes[0],
                    pagingElement: childNodes[1]
                }
                _.extend(config, GridConfig)
                _.isUndefined(scope.options) ? GridUtil.remoteInitialize(config) : GridUtil.resolveLocalInitialize(config)

                if (config.autoUpdate === true)
                    AutoUpdateRunner.startAutoUpdate(scope, config)

                /*
                 Watch for Changes in Grid Rows
                 */
                scope.$watch('gridRows', function () {

                    if (config.autoUpdate === true && _.isUndefined(scope.options))
                        GridUtil.remoteInitialize(config)

                })
                /*
                 Kill Auto Update when View is destroyed
                 */
                scope.$on('$destroy', function () {

                    if (config.autoUpdate === true)
                        AutoUpdateRunner.killAutoUpdate(scope)
                    
                    $log.info('killed auto update')
                })

            }
        }
    })