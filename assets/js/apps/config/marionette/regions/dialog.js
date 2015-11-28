Marionette.Region.Dialog = Marionette.Region.extend({
   onShow: function(view){
	console.log(this);	
     this.listenTo(view, "dialog:close", this.closeDialog);
        var self = this;
   	    this.$el.dialog({
	      modal: true,
	      title: view.title,
	      width: "auto",
	      close: function(e, ui){
		    self.closeDialog();
	      }
        });
   },
   closeDialog: function(){
	console.log(this);
     this.stopListening();
     this.close();
     this.$el.dialog("destroy");	
   }	
});