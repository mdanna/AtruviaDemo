define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'selection', () => {
                return this.view.lbDropdown.selectedKey;
            });
            defineSetter(this, 'selection', value => {
                this.view.lbDropdown.selectedKey = value;
            });
        }
	};
});