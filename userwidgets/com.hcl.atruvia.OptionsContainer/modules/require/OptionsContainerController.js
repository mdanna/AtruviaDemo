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
          this.view.onClick = () => {
            this.view.isVisible = false;
          };

          this.view.flxOptionShowAll.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'all'
            });
          };
          this.view.flxOptionSubmitted.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'submitted'
            });
          };
          this.view.flxOptionPublished.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'published'
            });
          };
          this.view.flxOptionClosed.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'closed'
            });
          };
          this.view.flxOptionDenied.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'denied'
            });
          };
          this.view.flxOptionDraft.onClick = () => {
            this.view.isVisible = false;
			eventManager.publish(globals.EVENT_OPTIONS_SELECT, {
              selection: 'draft'
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
      this.view.flxOptionShowAll.skin = SKIN_UNSELECTED;
      this.view.flxOptionSubmitted.skin = SKIN_UNSELECTED;
      this.view.flxOptionPublished.skin = SKIN_UNSELECTED;
      this.view.flxOptionClosed.skin = SKIN_UNSELECTED;
      this.view.flxOptionDenied.skin = SKIN_UNSELECTED;
      this.view.flxOptionDraft.skin = SKIN_UNSELECTED;
      switch(option){
        case 'submitted':
          this.view.flxOptionSubmitted.skin = SKIN_SELECTED;
          break;
        case 'published':
          this.view.flxOptionPublished.skin = SKIN_SELECTED;
          break;
        case 'closed':
          this.view.flxOptionClosed.skin = SKIN_SELECTED;
          break;
        case 'denied':
          this.view.flxOptionDenied.skin = SKIN_SELECTED;
          break;
        case 'draft':
          this.view.flxOptionDraft.skin = SKIN_SELECTED;
          break;
        default:
          this.view.flxOptionShowAll.skin = SKIN_SELECTED;
          break;
      }
    }
  };
});