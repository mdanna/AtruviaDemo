define(function() {
  const statusInfo = {
    draft: {
      i18n: 'i18n.overview.col.status.draft',
      flex: 'sknFlxStatusDraft',
      label: 'sknLblStatusDraft'
    },
    submitted: {
      i18n: 'i18n.overview.col.status.submitted',
      flex: 'sknFlxStatusSubmitted',
      label: 'sknLblStatusSubmitted'
    },
    published: {
      i18n: 'i18n.overview.col.status.published',
      flex: 'sknFlxStatusPublished',
      label: 'sknLblStatusPublished'
    },
    closed: {
      i18n: 'i18n.overview.col.status.closed',
      flex: 'sknFlxStatusClosed',
      label: 'sknLblStatusClosed'
    },
    denied: {
      i18n: 'i18n.overview.col.status.denied',
      flex: 'sknFlxStatusDenied',
      label: 'sknLblStatusDenied'
    }

  };

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.view.preShow = () => {
            if(!this.initDone){
              this.view.lblStatus.doLayout = () => {
				this.view.flxStatus.width = `${this.view.lblStatus.frame.width + 10}dp`;
              };
              this.initDone = true;
            }
            
            this.view.flxStatus.skin = statusInfo[this.status].flex;
            this.view.lblStatus.skin = statusInfo[this.status].label;
          };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'status', () => {
                return this._status;
            });
            defineSetter(this, 'status', value => {
              this._status = value;
              this.view.lblStatus.text = statusInfo[value] ? voltmx.i18n.getLocalizedString(statusInfo[value].i18n) : value;
            });
        }
	};
});