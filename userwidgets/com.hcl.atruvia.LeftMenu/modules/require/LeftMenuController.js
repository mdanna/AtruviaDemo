define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.flxLogout.onClick = () => new voltmx.mvc.Navigation('frmLogin'). navigate();

          this.view.buttonDashboard.onButtonClicked = () => {
			this.unselectButton(this.view.buttonStatistics);
			this.unselectButton(this.view.buttonAlerts);
            this.onItemSelected('dashboard');
          };
          
          this.view.buttonStatistics.onButtonClicked = () => {
			this.unselectButton(this.view.buttonDashboard);
			this.unselectButton(this.view.buttonAlerts);
            this.onItemSelected('statistics');
          };
          
          this.view.buttonAlerts.onButtonClicked = () => {
			this.unselectButton(this.view.buttonDashboard);
			this.unselectButton(this.view.buttonStatistics);
            this.onItemSelected('alerts');
          };
          
          this.view.flxProfile.onClick = () => this.onItemSelected('profile');
          
        }

        this.view.cmpUserMenu.user = this.user;
        const userRole = users[this.user].role;
        
        this.view.buttonStatistics.isVisible = userRole === 'lob' || userRole === 'hub';
        this.view.buttonAlerts.isVisible = userRole === 'lob' || userRole === 'hub';
        
        this.selectButton(this.view.buttonDashboard);
        this.unselectButton(this.view.buttonStatistics);
        this.unselectButton(this.view.buttonAlerts);
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
    },
    
    selectButton(button){
      button.skin = 'sknFlxVioletRoundedCorners';
      button.hoverSkin = 'sknFlxVioletRoundedCornersHover';
      button.skinIcon = 'sknLblIconWhite100';
      button.skinItem = 'sknLblWhite70';
    },
    
    unselectButton(button){
      button.skin = 'slFbox';
      button.hoverSkin = 'slFboxHover';
      button.skinIcon = 'sknLblIconDark100';
      button.skinItem = 'sknLblDark70';
    },

    onItemSelected(){}
  };
});