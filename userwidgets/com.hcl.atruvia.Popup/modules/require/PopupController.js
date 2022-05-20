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
    
    show({type, title, subtitle, buttonLeft, buttonCenter, buttonRight, 
               showButtonLeft, showButtonCenter, showButtonRight}){
      this.type = type;
      this.title = title;
      this.subtitle = subtitle;
      this.buttonLeft = buttonLeft;
      this.buttonCenter = buttonCenter;
      this.buttonRight = buttonRight;
      this.view.isVisible = true;
      this.view.flxButtonLeft.isVisible = showButtonLeft;
      this.view.flxButtonCenter.isVisible = showButtonCenter;
      this.view.flxButtonRight.isVisible = showButtonRight;
      this.view.forceLayout();
    },
    
    onClickLeft(){},
    onClickCenter(){},
    onClickRight(){}
  };
});