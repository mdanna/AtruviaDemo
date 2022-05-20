define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.onClick = () => this.onRowClick();
          this.initDone = true;
        }
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'role', () => {
        return this._role;
      });
      defineSetter(this, 'role', value => {
        this._role = value;
        this.view.challengeActions.role = value;
      });
    },

    onRowClick(){}
  };
});