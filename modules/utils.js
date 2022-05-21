const utils = {
  addZero(num){
    num = num + '';
    return num.length > 1 ? num : `0${num}`;
  },
  
  formatDate(dateComponents){
    let ret = "";
    if(dateComponents){
      ret = `${dateComponents[2]}-${utils.addZero(dateComponents[1])}-${utils.addZero(dateComponents[0])}`;
    }
    return ret;
  },
  
  displayDate(d){
    return `${utils.addZero(d.getDate())}/${utils.addZero(d.getMonth() + 1)}/${d.getFullYear()}`;
  },
  
  displayDateTime(d){
    return `${utils.displayDate(d)} ${utils.addZero(d.getHours())}:${utils.addZero(d.getMinutes())}`;
  },
  
  displayDateFromDateComponents(dateComponents){
    return `${utils.addZero(dateComponents[0])}/${utils.addZero(dateComponents[1])}/${dateComponents[2]}`;
  },
  
  getDateComponents(d){
    let ret = null;
    if(d){
      const date = new Date(d);
      ret = [date.getDate(), date.getMonth() + 1, date.getFullYear(),0,0,0];
    }
    return ret;
  }
};

