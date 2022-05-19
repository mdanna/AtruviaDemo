define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              const userData = users[this.user];
              this.view.imgUser.src = userData.photo;
              this.view.lblUsername.text = userData.name;
              this.view.lblCompany.text = userData.company;
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'user', () => {
                return this._user;
            });
            defineSetter(this, 'user', value => {
                this._user = value;
            });
        }
	};
});