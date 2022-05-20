define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'role', () => {
                return this._role;
            });
            defineSetter(this, 'role', value => {
              this._role = value;
              const i18n = value === 'lob' ? 'i18n.challenge.submitter' : 'i18n.challenge.reviewer';
              this.view.lblField.text = voltmx.i18n.getLocalizedString(i18n);
            });
            defineGetter(this, 'email', () => {
                return this.view.lblEmail.text;
            });
            defineSetter(this, 'email', value => {
              this.view.lblDash.isVisible = !!value;
              this.view.lblEmail.text = value;
            });
        }
	};
});