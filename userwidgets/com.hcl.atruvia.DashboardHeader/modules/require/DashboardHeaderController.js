define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.flxFilter.onClick = () => {
            eventManager.publish(globals.EVENT_OPTIONS_OPEN, {
              option: this.view.lblFilterKey.text
            });
          };

          eventManager.subscribe(globals.EVENT_OPTIONS_SELECT, ({selection}) => {
            selection = selection || 'all';
            this.view.lblFilter.text = voltmx.i18n.getLocalizedString(this.getI18nKeyForFilter(selection));
            this.view.lblFilterKey.text = selection;
          });

          eventManager.subscribe(globals.EVENT_DATA_LOADED, ({count, filter}) => {
            let infoText;
              const keyword = (count === 1 ? 'challenge' : 'challenges');
            if(filter === 'all'){
              infoText = `${count} ${voltmx.i18n.getLocalizedString(`i18n.overview.info.${keyword}`)}`;
            } else {
              const filterName = voltmx.i18n.getLocalizedString(this.getI18nKeyForFilter(filter));
              infoText = `${count} ${voltmx.i18n.getLocalizedString(`i18n.overview.info.${keyword}.filter`)} '${filterName}'`;
            }
            this.view.lblChallengesInfo.text = infoText;
          });

          this.view.flxNew.onClick = () => {
            this.onClickNewChallenge();
          };

          this.view.txtSearch.onTextChange = () => {
            this.onSearchChange(this.view.txtSearch.text);
          };

          this.initDone = true;
        }

        this.view.txtSearch.text = '';
        this.view.lblFilter.text = voltmx.i18n.getLocalizedString(this.getI18nKeyForFilter('all'));
        this.view.lblFilterKey.text = 'all';
        
        this.view.flxNewContainer.isVisible = this.userRole === 'lob';
        this.view.flxFilterContainer.isVisible = this.userRole === 'lob' || this.userRole === 'hub';
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

    onClickNewChallenge(){},
    onSearchChange(){},

    getI18nKeyForFilter(selection){
      let i18nKey = null;
      switch(selection){
        case 'all':
          i18nKey = 'i18n.overview.header.filter.all';
          break;
        case 'draft':
          i18nKey = 'i18n.overview.header.filter.draft';
          break;
        case 'submitted':
          i18nKey = 'i18n.overview.header.filter.submitted';
          break;
        case 'published':
          i18nKey = 'i18n.overview.header.filter.published';
          break;
        case 'closed':
          i18nKey = 'i18n.overview.header.filter.closed';
          break;
        case 'denied':
          i18nKey = 'i18n.overview.header.filter.denied';
          break;
        default:
          break;
      }
      return i18nKey;

    }
  };
});