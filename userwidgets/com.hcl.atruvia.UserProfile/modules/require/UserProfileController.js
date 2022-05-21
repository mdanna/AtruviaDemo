define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.dropdownFieldLanguage.onSelection = () => {
            const language = this.view.dropdownFieldLanguage.selection;
            voltmx.i18n.setCurrentLocaleAsync(language, () => {
              voltmx.store.setItem(`language_${this.email}`, language);
              new voltmx.mvc.Navigation('frmRedirect').navigate({user: this.email, filter: this.filter});
            }, (error) => alert(JSON.stringify(error)));
          };
          this.initDone = true;
        }
      };
    },
    
    initGettersSetters() {
            defineGetter(this, 'username', () => {
                return this._username;
            });
            defineSetter(this, 'username', value => {
                this._username = value;
                this.view.displayFieldName.text = value;
            });
            defineGetter(this, 'usertitle', () => {
                return this._usertitle;
            });
            defineSetter(this, 'usertitle', value => {
                this._usertitle = value;
                this.view.displayFieldTitle.text = value;
            });
            defineGetter(this, 'email', () => {
                return this._email;
            });
            defineSetter(this, 'email', value => {
                this._email = value;
                this.view.displayFieldEmail.text = value;
            });
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
        },
  };
});