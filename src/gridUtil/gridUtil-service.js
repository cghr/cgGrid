angular.module('cgGrid.GridUtil', ['cgGrid.service', 'cgGrid.jsonUtil'])
    .factory('GridUtil', function (GridService, $compile, JsonUtil) {

        var renderGrid = function (config, scope) {

            config.gridElement.style.height = config.height
            config.gridElement.style.width = config.width
            config.pagingElement.style.width = config.width

            var grid = new dhtmlXGridObject(config.gridElement)

            grid.setImagePath(config.imagePath)
            grid.enablePaging(config.paging, config.recordsPerPage, 5, config.pagingElement, true)
            grid.setPagingSkin(config.pagingSkin)
            grid.setSkin(config.skin)
            grid.setHeader(config.headings)
            grid.attachHeader(config.filters)
            grid.setColSorting(config.sortings || '')
            grid.init()
            grid.parse(config.data, 'json')
            $compile(angular.element(config.gridElement).contents())(scope)
        }

        var remoteInitialize = function (config, scope) {


            var self = this
            var success = function (resp) {
                angular.extend(config, resp.data)
                self.renderGrid(config, scope)
            }
            var fail = function () {
                $log.error('Grid Service:Failed to fetch data from server')

            }
            GridService.getData().then(success, fail)


        }

        var resolveLocalInitialize = function (config, scope) {

            _.extend(config, scope.options)
            _.isUndefined(scope.options.data) ? this.remoteInitialize(config, scope) : this.resolveDataFormatAndRenderGrid(config, scope)

        }

        var resolveDataFormatAndRenderGrid = function (config, scope) {

            if (_.isArray(config.data))
                config.data = {rows: JsonUtil.jsonToArray(config.data)}

            this.renderGrid(config, scope)

        }


        return{

            /* Renders grid from a given config */
            renderGrid: renderGrid,

            /* Downloads config and data remotely and renders grid */
            remoteInitialize: remoteInitialize,

            /* Resolve local data format */
            resolveLocalInitialize: resolveLocalInitialize,

            /* Resolve data format to jsArray or json to render grid */
            resolveDataFormatAndRenderGrid: resolveDataFormatAndRenderGrid
        }


    })
