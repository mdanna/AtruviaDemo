define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.doLayout = () => {
        this.view.flxContentArea.width = `${this.view.frame.width - 160}dp`;
      };

      this.view.leftMenu.onItemSelected = (selection) => {
        this.view.challengeEditor.isVisible = false;
        this.view.flxDashboard.isVisible = selection === 'dashboard';
        this.view.flxStatistics.isVisible = selection === 'statistics';
        this.view.flxAlerts.isVisible = selection === 'alerts';
      };
      
      this.view.dashboardHeader.onClickNewChallenge = () => {
        this.view.flxDashboard.isVisible = false;
        this.view.challengeEditor.mode = 'edit';
        this.view.challengeEditor.status = 'new';
        this.view.challengeEditor.show();
      };
      
      this.view.challengesList.onEdit = ({id, status, mode}) => {
        this.view.flxDashboard.isVisible = false;
        this.view.challengeEditor.mode = mode;
        this.view.challengeEditor.status = status;
        this.view.challengeEditor.show(id);
      };
      
      this.view.challengeEditor.onClickSave = (status) => {
        
        let type = status, title, subtitle, buttonLeft = "", buttonCenter = "", buttonRight = "",
          showButtonLeft = false, showButtonCenter = false, showButtonRight = false;
        
        switch(status){
          case 'draft':
            title = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.draftsaved.header');
            subtitle = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.draftsaved.info');
            buttonCenter = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.next');
            showButtonCenter = true;
            break;
          case 'submitted':
            title = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.submitted.header');
            subtitle = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.submitted.info');
            buttonCenter = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.next');
            showButtonCenter = true;
            break;
          default:
            break;
        }
        
        this.view.cmpPopup.show({type, title, subtitle, buttonLeft, buttonCenter, buttonRight,
          showButtonLeft, showButtonCenter, showButtonRight});
      };
      
      this.view.challengeEditor.onSave = (status) => {
        this.view.challengesList.loadData();
      };
      
      this.view.cmpPopup.onClickCenter = (type) => {
        this.view.challengeEditor.save(type);
        this.view.challengeEditor.isVisible = false;
        this.view.flxDashboard.isVisible = true;
      };
      
    };

    this.view.preShow = () => {
      const user = this.navigationContext.user;
      this.view.leftMenu.user = user;
      this.view.dashboardHeader.userRole = users[user].role;
      this.view.challengesList.user = user;
      this.view.challengeEditor.user = user;
      
      this.view.flxDashboard.isVisible = true;
      this.view.flxStatistics.isVisible = false;
      this.view.flxAlerts.isVisible = false;
      this.view.challengeEditor.isVisible = false;
      this.view.challengesList.loadData();
    };
  }

});