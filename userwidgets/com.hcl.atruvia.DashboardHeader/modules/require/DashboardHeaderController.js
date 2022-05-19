define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        this.view.flxNewContainer.isVisible = this.userRole === 'lob';
        this.view.flxFilterContainer.isVisible = this.userRole === 'lob'|| this.userRole === 'hub';
        switch(this.userRole){
          case 'lob':
            this.view.flxSearchContainer.width = '32%';
            this.view.flxFilterContainer.width = '16%';
            this.view.flxNewContainer.width = '16%';
            break;
          case 'hub':
            this.view.flxSearchContainer.width = '32%';
            this.view.flxFilterContainer.width = '32%';
            break;
          default:
            this.view.flxSearchContainer.width = '64%';
            break;
        }
      };

      if(!this.initDone){
        this.view.flxNew.onClick = () => {
          this.onClickNewChallenge();
        };
        this.initDone = true;
      }

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'userRole', () => {
        return this._userRole;
      });
      defineSetter(this, 'userRole', value => {
        this._userRole = value;
      });
    },

    onClickNewChallenge(){}
  };
});