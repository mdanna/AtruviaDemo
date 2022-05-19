define(function() {

  return {
    constructor(baseConfig, layoutConfig, pspConfig) {},

    initGettersSetters() {
      defineGetter(this, 'content', () => {
        return this.view.calField.dateComponents;
      });
      defineSetter(this, 'content', (value) => {
        this.view.calField.dateComponents = value || null;
        this.view.lblContent.text = value ? utils.displayDateFromDateComponents(value) : "";
      });
    },

    setReadOnly(readOnly){
      this.view.calField.isVisible = !readOnly;
      this.view.lblContent.isVisible = !!readOnly;
      this.view.forceLayout();
    }
  };
});