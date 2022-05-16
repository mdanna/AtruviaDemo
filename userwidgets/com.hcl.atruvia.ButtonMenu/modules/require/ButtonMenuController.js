define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              if(!this.initDone){
                this.view.onClick = () => {
                  this.view.skin = 'sknFlxVioletRoundedCorners';
                  this.view.lblIcon.skin = 'sknLblIconWhite100';
                  this.view.lblItem.skin = 'sknLblWhite70';
                  this.onButtonClicked();
                };
                this.initDone = true;
              }
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      
      onButtonClicked(){}
	};
});