var tzpush = {
  onLoad: function() {
    //You can place set-up code for the extension here
  },

  onMenuItemCommand: function() {
    window.open("chrome://tzpush/content/pref.xul", "", "chrome, resizable=yes");
  },
  
  onSync: function() {
    recieve();
  }
};
