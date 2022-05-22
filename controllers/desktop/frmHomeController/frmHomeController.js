define({ 
  filter: 'all',
  
  onViewCreated(){
    this.view.init = () => {
      this.view.doLayout = () => {
        this.view.flxContentArea.width = `${this.view.frame.width - 160}dp`;
      };
      
      this.view.flxDashboardContent.doLayout = () => {
        this.view.challengesList.height = `${this.view.flxDashboardContent.frame.height - 70}dp`;
      };

      this.view.dashboardHeader.onSearchChange = (searchFilter) => {
        this.searchFilter = searchFilter;
        this.view.challengesList.applySearchFilter(this.filter || 'all', searchFilter);
      };

      this.view.leftMenu.onItemSelected = (selection) => {
        this.view.challengeEditor.isVisible = false;
        this.view.flxDashboard.isVisible = selection === 'dashboard';
        this.view.flxStatistics.isVisible = selection === 'statistics';
        this.view.flxAlerts.isVisible = selection === 'alerts';
        if(selection === 'profile'){
          const user = this.navigationContext.user;
          this.view.userProfile.filter = this.filter;
          this.view.userProfile.searchFilter = this.searchFilter;
          this.view.userProfile.photo = users[user].photoLarge;
          this.view.userProfile.name = users[user].name;
          this.view.userProfile.username = users[user].name;
          this.view.userProfile.title = users[user].title;
          this.view.userProfile.usertitle = users[user].title;
          this.view.userProfile.email = user;
          this.view.userProfile.language = voltmx.store.getItem(`language_${user}`) || globals.DEFAULT_LANGUAGE;
          this.view.userProfile.isVisible = true;
        } else {
          this.view.userProfile.isVisible = false;
        }
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

      this.view.challengesList.onDelete = ({id}) => {
        this.view.cmpPopup.show({
          type: `delete_${id}`, 
          title: voltmx.i18n.getLocalizedString('i18n.dialog.challenge.delete.header'), 
          subtitle: voltmx.i18n.getLocalizedString('i18n.dialog.challenge.delete.info'), 
          buttonLeft: voltmx.i18n.getLocalizedString('i18n.dialog.challenge.delete.cancel'), 
          buttonCenter: "", 
          buttonRight: voltmx.i18n.getLocalizedString('i18n.dialog.challenge.delete.ok'),
          showButtonLeft: true, 
          showButtonCenter: false, 
          showButtonRight: true
        });
        
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
          case 'published':
            title = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.published.header');
            subtitle = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.published.info');
            buttonCenter = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.next');
            showButtonCenter = true;
            break;
          case 'denied':
            title = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.denied.header');
            subtitle = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.denied.info');
            buttonCenter = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.next');
            showButtonCenter = true;
            break;
          case 'unpublished':
            title = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.unpublish.header');
            subtitle = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.unpublish.info');
            buttonLeft = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.unpublish.cancel');
            buttonRight = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.unpublish.ok');
            showButtonLeft = true;
            showButtonRight = true;
            break;
          case 'closed':
            title = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.close.header');
            subtitle = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.close.info');
            buttonLeft = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.close.cancel');
            buttonRight = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.close.ok');
            showButtonLeft = true;
            showButtonRight = true;
            break;
          case 'pdf':
            title = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.pdfexport.header');
            subtitle = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.pdfexport.info');
            buttonLeft = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.pdfexport.find');
            buttonRight = voltmx.i18n.getLocalizedString('i18n.dialog.challenge.pdfexport.done');
            showButtonLeft = true;
            showButtonRight = true;
            break;
          default:
            break;
        }

        this.view.cmpPopup.show({type, title, subtitle, buttonLeft, buttonCenter, buttonRight,
                                 showButtonLeft, showButtonCenter, showButtonRight});
      };

      this.view.cmpPopup.onClickCenter = (type) => {
        this.view.challengeEditor.save(type);
        this.view.challengeEditor.isVisible = false;
        this.view.flxDashboard.isVisible = true;
      };

      this.view.cmpPopup.onClickRight = (type) => {
        switch(type){
          case 'unpublished':
          case 'closed':
            this.view.challengeEditor.save(status);
            this.view.challengeEditor.isVisible = false;
            this.view.flxDashboard.isVisible = true;
            break;
          default:
            if(type.startsWith('delete_')){
              this.deleteChallenge(type.replace('delete_', ''));
            }
            break;
        }
      };

      this.view.challengeEditor.onSave = (status) => {
        this.view.challengesList.loadData(this.filter);
      };
      
      eventManager.subscribe(globals.EVENT_OPTIONS_SELECT, ({selection}) => {
        this.filter = selection;
        this.view.challengesList.loadData(this.filter, this.searchFilter);
      });

    };

    this.view.preShow = () => {
      const user = this.navigationContext.user;
      this.filter = this.navigationContext.filter;
      this.searchFilter = this.navigationContext.searchFilter;
      
      this.view.leftMenu.user = user;
      this.view.dashboardHeader.userRole = users[user].role;
      this.view.challengesList.user = user;
      this.view.challengeEditor.user = user;

      this.view.flxDashboard.isVisible = true;
      this.view.flxStatistics.isVisible = false;
      this.view.flxAlerts.isVisible = false;
      this.view.challengeEditor.isVisible = false;
      this.view.userProfile.isVisible = false;
      this.view.challengesList.loadData(this.filter, this.searchFilter);
    };
  },

  deleteChallenge(id){
    var objSvc = VMXFoundry.getObjectService("ChallengeOS", {
      "access": "online"
    });

    var dataObject = new kony.sdk.dto.DataObject("Challenge");
    dataObject.addField("id", id);
    objSvc.deleteRecord({
      "dataObject": dataObject
    }, (response) => {
      this.view.challengesList.loadData(this.filter, this.searchFilter);        
    }, (error) => {
      kony.print("Error in record deletion: " + JSON.stringify(error));
    });        
  }

});