define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.flxButtonLeft.onClick = () => {
            this.view.isVisible = false;
            this.onClickLeft(this.type);
          };
          this.view.flxButtonCenter.onClick = () => {
            this.view.isVisible = false;
            this.onClickCenter(this.type);
          };
          this.view.flxButtonRight.onClick = () => {
            this.view.isVisible = false;
            this.onClickRight(this.type);
          };
          
          this.view.flxBackground.onClick = () => this.view.isVisible = false;
          
          this.initDone = true;
        }
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'type', () => {
        return this._type;
      });
      defineSetter(this, 'type', value => {
        this._type = value;
      });
    },
    
    show({type, title, subtitle, buttonLeft = '', buttonCenter, buttonRight = '', 
               showButtonLeft = false, showButtonCenter = true, showButtonRight = false}){
      this.type = type;
      this.title = title;
      this.subtitle = subtitle;
      this.buttonLeft = buttonLeft;
      this.buttonCenter = buttonCenter;
      this.buttonRight = buttonRight;
      this.showButtonLeft = showButtonLeft;
      this.showButtonCenter = showButtonCenter;
      this.showButtonRight = showButtonRight;
      this.view.isVisible = true;
    },
    
    onClickLeft(){},
    onClickCenter(){},
    onClickRight(){}
  };
});