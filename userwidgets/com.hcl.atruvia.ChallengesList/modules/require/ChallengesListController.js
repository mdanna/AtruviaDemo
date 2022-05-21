define(function() {

  return {
    constructor(baseConfig, layoutConfig, pspConfig) {
		this.view.preShow = () => {
          if(!this.initDone){
            this.view.onClick = () => this.onRowClick(this.id);
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

    loadData(filter){
      this.view.flxChallengesList.removeAll();
      
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
        response.records.forEach((record) => {
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
          challengesListRow.onViewPdf = () => this.onDelete({id: record.id});
          this.view.flxChallengesList.add(challengesListRow);
        });
        
        eventManager.publish(globals.EVENT_DATA_LOADED, ({count: response.records.length, filter: filter}));
      }, (error) => {
        alert("Failed to fetch challenges: " + JSON.stringify(error));
      });
      
      this.view.forceLayout();
    },
    
    onEdit({id, status, mode}){},
    onDelete({id, status}){},
    onViewPdf({id}){},
  };
});