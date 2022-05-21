define(function() {
  
	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.view.preShow = () => {
            if(!this.initDone){
              this.view.lblStatus.doLayout = () => {
				this.view.flxStatus.width = `${this.view.lblStatus.frame.width + 10}dp`;
              };
              this.initDone = true;
            }
            
          };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'status', () => {
                return this._status;
            });
            defineSetter(this, 'status', value => {
              this._status = value;
              this.view.lblStatus.text = statusInfo[value] ? voltmx.i18n.getLocalizedString(statusInfo[value].i18n) : value;
              this.view.flxStatus.skin = statusInfo[value] ? statusInfo[value].flex : 'slFbox';
              this.view.lblStatus.skin = statusInfo[value] ? statusInfo[value].label: 'sknlblDrk60';
            });
        }
	};
});