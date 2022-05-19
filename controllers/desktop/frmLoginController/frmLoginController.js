define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.flxCheckboxContainer.onClick = () => {
        this.view.lblCheckbox.isVisible = !this.view.lblCheckbox.isVisible;
      };
      
      this.view.flxLoginButton.onClick = () => new voltmx.mvc.Navigation('frmHome').navigate({
        user: this.view.lbUser.selectedKey
      });
    };
  }

});