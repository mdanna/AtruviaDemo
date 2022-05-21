define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.flxCheckboxContainer.onClick = () => {
        this.view.lblCheckbox.isVisible = !this.view.lblCheckbox.isVisible;
      };

      this.view.flxLoginButton.onClick = () => {
        const user = this.view.lbUser.selectedKey;
        voltmx.i18n.setCurrentLocaleAsync(voltmx.store.getItem(`language_${user}`) || globals.DEFAULT_LANGUAGE, () => {
          new voltmx.mvc.Navigation('frmHome').navigate({user});
        }, (error) => alert(JSON.stringify(error)));
      };
    };

  }

});