define(function() {
  const SKIN_CHECKED = 'sknFlxBlueCircle';
  const SKIN_UNCHECKED = 'sknFlxWhiteBorderBlueCircle';
  const SKIN_DENIED = 'sknFlxRedCircle';

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'status', () => {
        return this._status;
      });
      defineSetter(this, 'status', value => {
        this._status = value;

        this.view.flxDraft.skin = SKIN_CHECKED;
        switch(value){
          case 'draft':
            this.view.flxSubmitted.skin = SKIN_UNCHECKED;
            this.view.flxPublished.skin = SKIN_UNCHECKED;
            this.view.flxClosed.skin = SKIN_UNCHECKED;
            this.view.flxDenied.skin = SKIN_UNCHECKED;
            break;
          case 'submitted':
            this.view.flxSubmitted.skin = SKIN_CHECKED;
            this.view.flxPublished.skin = SKIN_UNCHECKED;
            this.view.flxClosed.skin = SKIN_UNCHECKED;
            this.view.flxDenied.skin = SKIN_UNCHECKED;
            break;
          case 'published':
            this.view.flxSubmitted.skin = SKIN_CHECKED;
            this.view.flxPublished.skin = SKIN_CHECKED;
            this.view.flxClosed.skin = SKIN_UNCHECKED;
            this.view.flxDenied.skin = SKIN_UNCHECKED;
            break;
          case 'closed':
            this.view.flxSubmitted.skin = SKIN_CHECKED;
            this.view.flxPublished.skin = SKIN_CHECKED;
            this.view.flxClosed.skin = SKIN_CHECKED;
            this.view.flxDenied.skin = SKIN_UNCHECKED;
            break;
          case 'denied':
            this.view.flxSubmitted.skin = SKIN_CHECKED;
            this.view.flxPublished.skin = SKIN_CHECKED;
            this.view.flxClosed.skin = SKIN_UNCHECKED;
            this.view.flxDenied.skin = SKIN_DENIED;
            break;
          default:
            break;
        }
      });
    },

    setReadOnly(readOnly){
      this.view.lblToBeAssigned.isVisible = !this.status;
      this.view.challengeStatus.isVisible = this.status && !readOnly;
      this.view.flxStatusBar.isVisible = this.status && !!readOnly;
      this.view.forceLayout();
    }
  };
});