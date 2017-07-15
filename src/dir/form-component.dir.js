(function() {
  angular
    .module('mdformComponent', ['formComponent.template', 'ngMaterial'])
    .directive('mdFormComponent', directive);

  directive.$inject = [];

  return directive;

  /**
   * Directive for Sale Form Component
   *
   * @public
   *
   * @memberof   titan.Directives
   *
   * @author     snehilmodani
   *
   */
  function directive() {

    controller.$inject = ['$scope'];

    return {
      restrict: 'EA',
      templateUrl: 'src/tpl/form-component.tpl.html',
      // transclude: false,
      // replace: true,
      scope: {
        config: '=',
        model: '=',
        editable: '='
      },
      controller: controller
    };

    // //////////////////////////////////////////////////////

    /**
     * Controller for the App Sidenav
     *
     * @public
     *
     * @method     controller
     *
     * @author     snehilmodani
     *
     * @param      {Object}    $scope    Angular scope
     */
    function controller($scope) {
      var ViewModel = $scope;

      init();

      // //////////////////////////////////////////////////////

      /**
       * Expand Sidebar if true, else collapse
       *
       * @public
       *
       * @author     snehilmodani
       *
       * @param      {Object}  action  Action to perform
       */
      function init() {
        if (ViewModel.config && ViewModel.config.type === 'autocomplete') {
          ViewModel.config.autocompleteConfig.searchText = ViewModel.model[ViewModel.config.code];
        } else if (ViewModel.config && ViewModel.config.type === 'date') {
          if(typeof ViewModel.model[ViewModel.config.code] === 'number' && ViewModel.model[ViewModel.config.code]) {
            ViewModel.model[ViewModel.config.code] = moment(ViewModel.model[ViewModel.config.code]).toDate();
          }
        }

        // Call changeFn in the beginning
        if(ViewModel.config.changeFn && typeof ViewModel.config.changeFn === 'function' && ViewModel.model[ViewModel.config.code] !== null && ViewModel.model[ViewModel.config.code] !== undefined) {
          ViewModel.config.changeFn(ViewModel.model[ViewModel.config.code], ViewModel.model);
        }
      }
    }
  }
})();