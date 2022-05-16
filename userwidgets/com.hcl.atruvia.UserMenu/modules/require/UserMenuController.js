define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        const user = users[this.user];
        this.view.imgUser.src = user.photo;
        this.view.lblUser.text = user.name;
        this.view.lblCompany.text = user.company;
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