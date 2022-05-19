define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              if(!this.initDone){
                this.view.flxPdf.onClick = () => this.onClickPdf();
                this.view.flxEdit.onClick = () => this.onClickEdit();
                this.view.flxDelete.onClick = () => this.onClickDelete();
                
                this.initDone = true;
              }
              this.view.flxActions.width = this.role === 'xpa' ? '25dp' : '75dp';
              this.view.flxEdit.isVisible = this.role !== 'xpa';
              this.view.flxDelete.isVisible = this.role !== 'xpa';
            };
		},
		
		initGettersSetters: function() {
            defineGetter(this, 'role', () => {
                return this._role;
            });
            defineSetter(this, 'role', value => {
                this._role = value;
            });
        },
      
      onClickPdf(){},
      onClickEdit(){},
      onClickDelete(){}
	};
});