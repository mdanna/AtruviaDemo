define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.dropdownFieldLanguage.onSelection = () => {
            const language = this.view.dropdownFieldLanguage.selection;
            voltmx.i18n.setCurrentLocaleAsync(language, () => {
              voltmx.store.setItem(`language_${this.email}`, language);
              new voltmx.mvc.Navigation('frmRedirect').navigate({
                user: this.user, 
                filter: this.filter || 'all', 
                searchFilter: this.searchFilter || ''
              });
            }, (error) => alert(JSON.stringify(error)));
          };
          this.initDone = true;
        }
      };
    },

    show(user){
      this.user = user;
      this.view.lblUserProfile.text = voltmx.i18n.getLocalizedString('i18n.overview.nav.profile');
      this.view.lblUserProfileLabel.text = voltmx.i18n.getLocalizedString('i18n.overview.nav.profile');
      this.view.imgPhoto.src = users[user].photoLarge;
      this.view.lblName.text = users[user].name;
      this.view.lblTitle.text = users[user].title;
      this.view.displayFieldName.label = voltmx.i18n.getLocalizedString('i18n.profile.name');
      this.view.displayFieldName.text = users[user].name;
      this.view.displayFieldTitle.label = voltmx.i18n.getLocalizedString('i18n.profile.title');
      this.view.displayFieldTitle.text = users[user].title;
      this.view.displayFieldEmail.label = voltmx.i18n.getLocalizedString('i18n.profile.email');
      this.view.displayFieldEmail.text = user;
      this.view.dropdownFieldLanguage.label = voltmx.i18n.getLocalizedString('i18n.profile.language');
      this.view.isVisible = true;
    },

    initGettersSetters() {
      defineGetter(this, 'language', () => {
        return this._language;
      });
      defineSetter(this, 'language', value => {
        this._language = value || globals.DEFAULT_LANGUAGE;
        this.view.dropdownFieldLanguage.selection = this._language;
      });
      defineGetter(this, 'filter', () => {
        return this._filter;
      });
      defineSetter(this, 'filter', value => {
        this._filter = value;
      });
      defineGetter(this, 'searchFilter', () => {
        return this._searchFilter;
      });
      defineSetter(this, 'searchFilter', value => {
        this._searchFilter = value;
      });
      defineGetter(this, 'user', () => {
        return this._user;
      });
      defineSetter(this, 'user', value => {
        this._user = value;
      });
    },
  };
});