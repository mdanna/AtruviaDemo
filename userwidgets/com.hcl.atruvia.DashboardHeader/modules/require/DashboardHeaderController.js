define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        this.view.flxNewContainer.isVisible = this.userRole === 'lob';
        this.view.flxFilterContainer.isVisible = this.userRole === 'lob'|| this.userRole === 'hub';
        switch(this.userRole){
          case 'lob':
            this.view.flxSearchContainer.width = '50%';
            this.view.flxFilterContainer.width = '25%';
            this.view.flxNewContainer.width = '25%';
            this.view.flxFilter.width = '90%';
            break;
          case 'hub':
            this.view.flxSearchContainer.width = '50%';
            this.view.flxFilterContainer.width = '50%';
            this.view.flxFilter.width = '96%';
            break;
          default:
            this.view.flxSearchContainer.width = '100%';
            break;
        }
      };

      if(!this.initDone){
        this.view.flxFilter.onClick = () => {
          eventManager.publish(globals.EVENT_OPTIONS_OPEN, {
            option: this.view.lblFilter.text
          });
        };
        
        eventManager.subscribe(globals.EVENT_OPTIONS_SELECT, ({selection}) => {
          this.view.lblFilter.text = selection;
        });
        
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