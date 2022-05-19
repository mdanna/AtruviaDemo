define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {},

    initGettersSetters() {
      defineGetter(this, 'content', () => {
        return this.view.txtField.text;
      });
      defineSetter(this, 'content', value => {
        this.view.txtField.text = value;
        this.view.lblContent.text = value;
      });
    },

    setReadOnly(readOnly){
      this.view.txtField.isVisible = !readOnly;
      this.view.lblContent.isVisible = !!readOnly;
      this.view.forceLayout();
    }
  };
});