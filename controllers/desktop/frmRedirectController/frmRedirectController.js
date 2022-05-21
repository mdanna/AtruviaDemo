define({ 

	onViewCreated(){
      this.view.preShow = () => {
        new voltmx.mvc.Navigation('frmHome').navigate(this.navigationContext);
      };
    }

});