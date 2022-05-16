define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.doLayout = () => {
        this.view.flxContentArea.width = `${this.view.frame.width - 160}dp`;
      };

      this.view.cmpLeftMenu.onItemSelected = (selection) => {
        this.view.flxDashboard.isVisible = selection === 'dashboard';
        this.view.flxStatistics.isVisible = selection === 'statistics';
        this.view.flxAlerts.isVisible = selection === 'alerts';
      };
    };

    this.view.preShow = () => {
      this.view.cmpLeftMenu.user = this.navigationContext.user;
      this.view.flxDashboard.isVisible = true;
      this.view.flxStatistics.isVisible = false;
      this.view.flxAlerts.isVisible = false;
    };


  }

});