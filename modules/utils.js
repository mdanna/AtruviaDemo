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
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
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