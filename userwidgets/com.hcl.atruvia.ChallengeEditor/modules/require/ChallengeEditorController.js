define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          
          this.view.lblDashboard.onTouchEnd = () => this.onClickDashboard();

          this.view.editFieldName.onTextChange = () => {
            this.setFormComplete(this.checkFormComplete());
          };

          this.view.editFieldMotivation.onTextChange = () => {
            this.setFormComplete(this.checkFormComplete());
          };

          this.view.editFieldIssues.onTextChange = () => {
            this.setFormComplete(this.checkFormComplete());
          };

          this.view.editFieldSolution.onTextChange = () => {
            this.setFormComplete(this.checkFormComplete());
          };

          this.view.editFieldSchedule.onTextChange = () => {
            this.setFormComplete(this.checkFormComplete());
          };

          this.view.dateFieldResolution.onSelection = () => {
            this.setFormComplete(this.checkFormComplete());
          };

          this.view.flxAction.onClick = () => {
            if(this.status === 'new' || ((this.status === 'draft' || this.status === 'denied') && this.mode === 'edit')){
              this.checkFormComplete() && (this.onClickSave('draft'));
            } else if(this.status === 'draft' && this.mode === 'readOnly'){
              this.mode = 'edit';
              this.initEditor();
              this.updateFieldsForMode();
            } else if(this.status === 'submitted' && this.mode === 'readOnly' && this.role === 'hub'){
              this.mode = 'edit';
              this.initEditor();
              this.updateFieldsForMode();
            } else if(this.status === 'submitted' && this.mode === 'edit' && this.role === 'hub'){
              this.checkFormComplete() && (this.onClickSave('submitted'));
            } else if((this.status === 'denied' || this.status === 'closed') && this.mode === 'readOnly'){
              this.mode = 'edit';
              this.initEditor();
              this.updateFieldsForMode();
            } else if(this.status === 'published' && this.role !== 'xpa'){
              this.onClickSave('unpublished');
            } else if(this.status === 'published' && this.role === 'xpa'){
              this.onClickSave('pdf');
            }
          };

          this.view.flxButtonSubmit.onClick = () => {
            this.checkFormComplete() && (this.onClickSave('submitted'));
          };

          this.view.flxButtonSaveToDraft.onClick = () => {
            this.checkFormComplete() && (this.onClickSave('draft'));
          };

          this.view.flxButtonPublish.onClick = () => {
            this.checkFormComplete() && (this.onClickSave('published'));
          };

          this.view.flxButtonDeny.onClick = () => {
            this.checkFormComplete() && (this.onClickSave('denied'));
          };

          this.view.flxButtonUnpublish.onClick = () => {
            this.onClickSave('unpublished');
          };

          this.view.flxButtonClose.onClick = () => {
            this.onClickSave('closed');
          };

          this.view.flxButtonSaveToCurrentStatus.onClick = () => {
            this.checkFormComplete() && (this.onClickSave('submitted'));
          };

          this.initDone = true;
        }
        this.role = users[this.user].role;
      };
    },

    initGettersSetters: function() {
      defineGetter(this, 'mode', () => {
        return this._mode;
      });
      defineSetter(this, 'mode', value => {
        this._mode = value;
      });
      defineGetter(this, 'status', () => {
        return this._status;
      });
      defineSetter(this, 'status', value => {
        this._status = value;
      });
      defineGetter(this, 'user', () => {
        return this._user;
      });
      defineSetter(this, 'user', value => {
        this._user = value;
        value && (this.role = users[value].role);
      });
      defineGetter(this, 'challengeId', () => {
        return this._challengeId;
      });
      defineSetter(this, 'challengeId', value => {
        this._challengeId = value;
      });
    },

    show(id){
      this.challengeId = id;
      this.initEditor();
      this.status === 'new' || this.setFields(id);
      this.view.isVisible = true;
    },

    initEditor(){
      voltmx.print(`role:'${this.role}' mode:'${this.mode}' status:'${this.status}'`);
      this.updateFieldsForMode();
      if(this.status === 'new'){
        this.view.lblAction.skin = 'sknLblGrey70';
        this.view.lblChallengeInfo.text = voltmx.i18n.getLocalizedString('i18n.overview.header.new');
        this.view.lblAction.text =  voltmx.i18n.getLocalizedString('i18n.challenge.actions.draft');
        this.view.flxButtonsDraft.isVisible = true;
        this.view.flxButtonsSubmitted.isVisible = false;
        this.view.flxButtonsPublished.isVisible = false;
        this.view.flxButtonTeams.isVisible = false;
        this.resetFields();
      } else if(this.status === 'draft' && this.mode === 'readOnly'){
        this.view.lblAction.skin = 'sknLblBlue70';
        this.view.lblChallengeInfo.text = voltmx.i18n.getLocalizedString('i18n.challenge.title');
        this.view.lblAction.text =  voltmx.i18n.getLocalizedString('i18n.challenge.edit');
        this.view.flxButtonsDraft.isVisible = false;
        this.view.flxButtonsSubmitted.isVisible = false;
        this.view.flxButtonsPublished.isVisible = false;
        this.view.flxButtonTeams.isVisible = true;
      } else if((this.status === 'draft' || this.status === 'denied' || this.status === 'closed') && this.mode === 'edit'){
        this.view.lblAction.skin = 'sknLblBlue70';
        this.view.lblChallengeInfo.text = voltmx.i18n.getLocalizedString('i18n.challenge.title');
        this.view.lblAction.text =  voltmx.i18n.getLocalizedString('i18n.challenge.actions.draft');
        this.setFormComplete(this.checkFormComplete());
        this.view.flxButtonsDraft.isVisible = true;
        this.view.flxButtonsSubmitted.isVisible = false;
        this.view.flxButtonsPublished.isVisible = false;
        this.view.flxButtonTeams.isVisible = false;
      } else if(this.status === 'submitted' && this.mode === 'readOnly' && this.role === 'lob'){
        this.view.lblAction.skin = 'sknLblGrey70';
        this.view.lblChallengeInfo.text = voltmx.i18n.getLocalizedString('i18n.challenge.title');
        this.view.lblAction.text =  voltmx.i18n.getLocalizedString('i18n.challenge.edit');
        this.view.flxButtonsDraft.isVisible = false;
        this.view.flxButtonsSubmitted.isVisible = false;
        this.view.flxButtonsPublished.isVisible = false;
        this.view.flxButtonTeams.isVisible = true;
      } else if(this.status === 'submitted' && this.mode === 'readOnly' && this.role === 'hub'){
        this.view.lblAction.skin = 'sknLblBlue70';
        this.view.lblChallengeInfo.text = voltmx.i18n.getLocalizedString('i18n.challenge.title');
        this.view.lblAction.text =  voltmx.i18n.getLocalizedString('i18n.challenge.edit');
        this.view.flxButtonsDraft.isVisible = false;
        this.view.flxButtonsSubmitted.isVisible = false;
        this.view.flxButtonsPublished.isVisible = false;
        this.view.flxButtonTeams.isVisible = true;
      } else if(this.status === 'submitted' && this.mode === 'edit' && this.role === 'hub'){
        this.view.lblAction.skin = 'sknLblBlue70';
        this.view.lblChallengeInfo.text = voltmx.i18n.getLocalizedString('i18n.challenge.title');
        this.view.lblAction.text =  voltmx.i18n.getLocalizedString('i18n.challenge.actions.save');
        this.view.flxButtonsDraft.isVisible = false;
        this.view.flxButtonsSubmitted.isVisible = true;
        this.view.flxButtonsPublished.isVisible = false;
        this.view.flxButtonTeams.isVisible = false;
      } else if((this.status === 'denied' || this.status === 'closed') && this.mode === 'readOnly'){
        this.view.lblAction.skin = 'sknLblBlue70';
        this.view.lblChallengeInfo.text = voltmx.i18n.getLocalizedString('i18n.challenge.title');
        this.view.lblAction.text =  voltmx.i18n.getLocalizedString('i18n.challenge.edit');
        this.view.flxButtonsDraft.isVisible = false;
        this.view.flxButtonsSubmitted.isVisible = false;
        this.view.flxButtonsPublished.isVisible = false;
        this.view.flxButtonTeams.isVisible = true;
      } else if(this.status === 'published' && this.mode === 'readOnly' && this.role !== 'xpa'){
        this.view.lblAction.skin = 'sknLblBlue70';
        this.view.lblChallengeInfo.text = voltmx.i18n.getLocalizedString('i18n.challenge.title');
        this.view.lblAction.text =  voltmx.i18n.getLocalizedString('i18n.challenge.actions.unpublish');
        this.view.flxButtonsDraft.isVisible = false;
        this.view.flxButtonsSubmitted.isVisible = false;
        this.view.flxButtonsPublished.isVisible = true;
        this.view.flxButtonTeams.isVisible = false;
      } else if(this.status === 'published' && this.mode === 'readOnly' && this.role === 'xpa'){
        this.view.lblAction.skin = 'sknLblBlue70';
        this.view.lblChallengeInfo.text = voltmx.i18n.getLocalizedString('i18n.challenge.title');
        this.view.lblAction.text =  voltmx.i18n.getLocalizedString('i18n.challenge.actions.exportpdf');
        this.view.flxButtonsDraft.isVisible = false;
        this.view.flxButtonsSubmitted.isVisible = false;
        this.view.flxButtonsPublished.isVisible = false;
        this.view.flxButtonTeams.isVisible = false;
      }
    },

    resetFields(){
      this.view.editFieldName.content = '';
      this.view.editFieldMotivation.content = '';
      this.view.editFieldIssues.content = '';
      this.view.editFieldSolution.content = '';
      this.view.editFieldAssumptions.content = '';
      this.view.editFieldKpis.content = '';
      this.view.editFieldSchedule.content = '';
      this.view.displayFieldStatus.status = '';
      this.view.displayFieldChallengeId.text = voltmx.i18n.getLocalizedString('i18n.challenge.notassigned');
      this.view.displayFieldSubmitted.text = voltmx.i18n.getLocalizedString('i18n.challenge.notassigned');
      this.view.dateFieldResolution.content = null;
      this.view.displayLOB.role = 'lob';
      this.view.displayLOB.name = users[this.user].name;
      this.view.displayLOB.email = this.user;
      this.view.displayReviewer.role = 'hub';
      this.view.displayReviewer.name = voltmx.i18n.getLocalizedString('i18n.challenge.notassigned');
      this.view.displayReviewer.email = '';
    },

    setFields(id){
      var objSvc = VMXFoundry.getObjectService("ChallengeOS", {
        "access": "online"
      });

      var dataObject = new voltmx.sdk.dto.DataObject("Challenge");
      dataObject.odataUrl = `$filter=id eq ${id}`;

      objSvc.fetch({
        "dataObject": dataObject
      }, (response) => {
        const record = response.records[0];
        this.view.editFieldName.content = record.name;
        this.view.editFieldMotivation.content = record.motivation;
        this.view.editFieldIssues.content = record.issues;
        this.view.editFieldSolution.content = record.solution;
        this.view.editFieldAssumptions.content = record.assumptions;
        this.view.editFieldKpis.content = record.indicators;
        this.view.editFieldSchedule.content = record.schedule;
        this.view.displayFieldStatus.status = record.status;
        this.view.displayFieldChallengeId.text = record.id;
        this.view.displayFieldSubmitted.text = record.submission ? utils.displayDateTime(new Date(record.submission)) : voltmx.i18n.getLocalizedString('i18n.challenge.notassigned');
        this.view.dateFieldResolution.content = utils.getDateComponents(record.resolution);
        this.view.displayLOB.role = 'lob';
        this.view.displayLOB.name = users[record.lob].name;
        this.view.displayLOB.email = record.lob;
        this.view.displayReviewer.role = 'hub';
        this.view.displayReviewer.name = users[record.reviewer].name;
        this.view.displayReviewer.email = record.reviewer;
        this.view.displayFieldChatLink.text = record.chat;
      }, (error) => {
        alert("Failed to fetch challenges: " + JSON.stringify(error));
      });
    },

    updateFieldsForMode(){
      this.view.editFieldName.setReadOnly(this.mode === 'readOnly');
      this.view.editFieldMotivation.setReadOnly(this.mode === 'readOnly');
      this.view.editFieldIssues.setReadOnly(this.mode === 'readOnly');
      this.view.editFieldSolution.setReadOnly(this.mode === 'readOnly');
      this.view.editFieldAssumptions.setReadOnly(this.mode === 'readOnly');
      this.view.editFieldKpis.setReadOnly(this.mode === 'readOnly');
      this.view.editFieldSchedule.setReadOnly(this.mode === 'readOnly');
      this.view.dateFieldResolution.setReadOnly(this.mode === 'readOnly');
      this.view.displayFieldStatus.setReadOnly(this.mode === 'readOnly');
    },

    checkFormComplete(){
      return this.view.editFieldName.content &&
        this.view.editFieldMotivation.content &&
        this.view.editFieldIssues.content &&
        this.view.editFieldSolution.content &&
        this.view.editFieldSchedule.content &&
        this.view.dateFieldResolution.content;
    },

    setFormComplete(formComplete){
      this.view.lblAction.skin = formComplete ? 'sknLblBlue70' : 'sknLblGrey70';

      this.view.flxButtonSubmit.skin = formComplete ? 'sknFlxBlue' : 'sknFlxGrey';
      this.view.flxButtonSaveToDraft.skin = formComplete ? 'sknFlxWhiteBorderBlue' : 'sknFlxWhiteBorderGrey';
      this.view.lblButtonSaveToDraft.skin = formComplete ? 'sknLblBlue60' : 'sknLblGrey60';

      this.view.flxButtonPublish.skin = formComplete ? 'sknFlxBlue' : 'sknFlxGrey';
      this.view.flxButtonDeny.skin = formComplete ? 'sknFlxRed' : 'sknFlxGrey';
      this.view.flxButtonSaveToCurrentStatus.skin = formComplete ? 'sknFlxWhiteBorderBlue' : 'sknFlxWhiteBorderGrey';
      this.view.lblButtonSaveToCurrentStatus.skin = formComplete ? 'sknLblBlue60' : 'sknLblGrey60';
    },

    //this event is caught by the controller to display the confirmation alert
    onClickSave(status){},

    //this is called by the controller on the alert handler
    save(status){
      var objSvc = VMXFoundry.getObjectService("ChallengeOS", {access: "online"});
      var dataObject = new voltmx.sdk.dto.DataObject("Challenge");
      dataObject.addField("id", this.challengeId || new Date().getTime() + '');
      dataObject.addField("name", this.view.editFieldName.content);
      let submission = null;
      if(status === 'submitted'){
        submission = new Date();
      } else if(status === 'denied'){
        submission = null;
      } else {
        submission = new Date(utils.formatDate(this.view.dateFieldResolution.content));
      }
      dataObject.addField("submission", submission);
      dataObject.addField("lob", this.view.displayLOB.email);
      dataObject.addField("resolution", new Date(utils.formatDate(this.view.dateFieldResolution.content)));
      dataObject.addField("status", status === 'unpublished' ? 'submitted' : status);
      dataObject.addField("reviewer", 'alan.paul@atruvia.de');
      dataObject.addField("motivation", this.view.editFieldMotivation.content);
      dataObject.addField("issues", this.view.editFieldIssues.content);
      dataObject.addField("solution", this.view.editFieldSolution.content);
      dataObject.addField("assumptions", this.view.editFieldAssumptions.content);
      dataObject.addField("schedule", this.view.editFieldSchedule.content);
      dataObject.addField("indicators", this.view.editFieldKpis.content);
      dataObject.addField("chat", `${this.view.editFieldName.content} Chat Group | Microsoft Teams`);
      if(this.challengeId){
        objSvc.update({
          "dataObject": dataObject
        }, (response) => {
          this.onSave(status);
        }, (error) => {
          alert(JSON.stringify(error));
          voltmx.print("Error in record creation: " + JSON.stringify(error));
        });
      } else {
        objSvc.create({
          "dataObject": dataObject
        }, (response) => {
          this.onSave(status);
        }, (error) => {
          alert(JSON.stringify(error));
          voltmx.print("Error in record creation: " + JSON.stringify(error));
        });
      }
    },

    //this is the callback of the save action, caught by the controller to reload the data
    onSave(status){},
    
    onClickDashboard(){}
    
  };
});