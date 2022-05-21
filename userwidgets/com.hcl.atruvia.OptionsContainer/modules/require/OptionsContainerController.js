define(function() {
  const SKIN_SELECTED = 'sknFlxOptionSelected';
  const SKIN_UNSELECTED = 'sknFlxWhite';


  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe(globals.EVENT_OPTIONS_OPEN, ({option}) => {
        this.view.isVisible = true;
        this.setSkins(option);
      });

      this.view.preShow = () => {
        if(!this.initDone){
          this.view.flxBackground.onClick = () => this.view.isVisible = false;

          this.view.flxOptionShowAll.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: voltmx.i18n.getLocalizedString('i18n.overview.header.filter.status')
            });
          };
          this.view.flxOptionSubmitted.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'Submitted'
            });
          };
          this.view.flxOptionPublished.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'Published'
            });
          };
          this.view.flxOptionClosed.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'Closed'
            });
          };
          this.view.flxOptionDenied.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'Denied'
            });
          };
          this.view.flxOptionDraft.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'Draft'
            });
          };

          this.initDone = true;
        }
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    setSkins(option){
      this.view.flxOptionShawAll.skin = SKIN_UNSELECTED;
      this.view.flxOptionSubmitted.skin = SKIN_UNSELECTED;
      this.view.flxOptionPublished.skin = SKIN_UNSELECTED;
      this.view.flxOptionClosed.skin = SKIN_UNSELECTED;
      this.view.flxOptionDenied.skin = SKIN_UNSELECTED;
      this.view.flxOptionDraft.skin = SKIN_UNSELECTED;
      switch(option){
        case 'Submitted':
          this.view.flxOptionSubmitted.skin = SKIN_SELECTED;
          break;
        case 'Published':
          this.view.flxOptionPublished.skin = SKIN_SELECTED;
          break;
        case 'Closed':
          this.view.flxOptionClosed.skin = SKIN_SELECTED;
          break;
        case 'Denied':
          this.view.flxOptionDenied.skin = SKIN_SELECTED;
          break;
        case 'Draft':
          this.view.flxOptionDraft.skin = SKIN_SELECTED;
          break;
        default:
          this.view.flxOptionShawAll.skin = SKIN_SELECTED;
          break;
      }
    }
  };
});