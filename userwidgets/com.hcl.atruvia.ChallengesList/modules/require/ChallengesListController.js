define(function() {

  return {
    constructor(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.onClick = () => this.onRowClick(this.id);
          
          this.view.doLayout = () => {
            this.view.flxChallengesList.height = `${this.view.frame.height - 45}dp`;
          };
          
          this.initDone = true;
        }
      };
    },

    initGettersSetters: function() {
      defineGetter(this, 'user', () => {
        return this._user;
      });
      defineSetter(this, 'user', value => {
        this._user = value;
      });
    },

    loadData(filter, searchFilter){
      voltmx.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
      
      const role = users[this.user].role;

      var objSvc = VMXFoundry.getObjectService("ChallengeOS", {
        "access": "online"
      });

      var dataObject = new voltmx.sdk.dto.DataObject("Challenge");
      var odataUrl = `$filter=`;
      if(role === 'lob'){
        odataUrl += `lob eq ${this.user}`;
        odataUrl += filter !== 'all' ? ` and status eq '${filter}'` : '';
      } else if(role === 'hub'){
        odataUrl += (filter !== 'all' && filter !== 'draft')? `status eq '${filter}'` : `status ne 'draft'`;
      } else if(role === 'xpa'){
        odataUrl += `status eq 'published'`;
      }

      dataObject.odataUrl = odataUrl;

      objSvc.fetch({
        "dataObject": dataObject
      }, (response) => {
        this.data = response.records;
        this.applySearchFilter(filter, searchFilter);
        voltmx.application.dismissLoadingScreen();
      }, (error) => {
        voltmx.application.dismissLoadingScreen();
        alert("Failed to fetch challenges: " + JSON.stringify(error));
      });
    },

    applySearchFilter(filter, searchFilter){
      searchFilter = searchFilter || '';
      let filteredData = this.data.filter((record) => {
        return record.name.toLowerCase().includes(searchFilter.toLowerCase()) || record.id.toLowerCase().includes(searchFilter.toLowerCase());
      });
      
      filteredData.sort((a, b) => {
        return (a.CreatedDateTime > b.CreatedDateTime) ? -1 : (a.CreatedDateTime < b.CreatedDateTime ? 1 : 0);
      });

      this.view.flxChallengesList.removeAll();
      filteredData.forEach((record) => {
        const challengesListRow = new com.hcl.atruvia.ChallengesListRow({
          id: `challengeListRow${new Date().getTime()}`
        }, {}, {});
        challengesListRow.challengeId = record.id;
        challengesListRow.name = record.name;
        challengesListRow.submission = record.submission ? utils.displayDate(new Date(record.submission)) : "";
        challengesListRow.user = record.lob;
        challengesListRow.resolution = record.resolution ? utils.displayDate(new Date(record.resolution)) : "";
        challengesListRow.status = record.status;
        challengesListRow.role = users[this.user].role;
        challengesListRow.onRowClick = () => this.onEdit({id: record.id, status: record.status, mode: 'readOnly'});
        challengesListRow.onClickEdit = () => this.onEdit({id: record.id, status: record.status, mode: 'edit'});
        challengesListRow.onClickDelete = () => this.onDelete({id: record.id, status: record.status});
        challengesListRow.onViewPdf = () => this.onViewPdf({id: record.id});
        this.view.flxChallengesList.add(challengesListRow);
      });
      eventManager.publish(globals.EVENT_DATA_LOADED, ({count: filteredData.length, filter: filter}));
    },
    
    

    onEdit({id, status, mode}){},
    onDelete({id, status}){},
    onViewPdf({id}){},
  };
});