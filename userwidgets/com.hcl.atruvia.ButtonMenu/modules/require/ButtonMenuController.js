define(function() {

	return {
		constructor(baseConfig, layoutConfig, pspConfig) {
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
		
		initGettersSetters() {},
      
      onButtonClicked(){}
	};
});