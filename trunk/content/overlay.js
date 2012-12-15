 var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
        abManager = Components.classes["@mozilla.org/abmanager;1"] 
		.getService(Components.interfaces.nsIAbManager);
        allAddressBooks = abManager.directories;
        
var tzpush = {
  onLoad: function() {
     //You can place set-up code for the extension here
  },

  onMenuItemCommand: function() {
    window.open(
		"chrome://tzpush/content/pref.xul",
		"", 
		"chrome,centerscreen,modal,toolbar", 
		null, null
	);
    
  },
  
  onSync: function() {
    go();
  }
};
