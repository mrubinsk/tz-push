/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */

if (typeof tzpush == "undefined") {
    var tzpush ={}
}

tzpush.myPrefObserver = {
    prefs : Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService).getBranch("extensions.tzpush."),
  register: function() {
    var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefService);
    this.branch = prefService.getBranch("extensions.tzpush.");
    this.branch.addObserver("", this, false);
    
  },
 
  unregister: function() {
    this.branch.removeObserver("", this);
  },
 
  observe: function(aSubject, aTopic, aData) {
      switch (aData) {
      case "autosync":
	tzpush.Timer.auto()
        break;
      case "go":
        switch(tzpush.prefs.getCharPref("go")){
        case "0":
        tzpush.go()
        break;
        case "1":
        tzpush.go()
        break;
         }
    }
  }
}


  
tzpush.AbListener = {
 
  onItemRemoved: function AbListener_onItemRemoved(aParentDir, aItem) {
    aParentDir.QueryInterface(Components.interfaces.nsIAbDirectory);
     if (aItem instanceof Components.interfaces.nsIAbCard ) {
        
    deleted = aItem.getProperty("ServerId","")

Components.utils.import("resource://gre/modules/FileUtils.jsm");
file = FileUtils.getFile("ProfD", ["DeletedCards"]);
file.append(deleted)
file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, FileUtils.PERMS_FILE);


    }
  },
  
  add: function AbListener_add() {
    Components.utils.import("resource://gre/modules/FileUtils.jsm");
    var dir = FileUtils.getDir("ProfD", ["DeletedCards"], true);
    var flags;
    if (Components.classes["@mozilla.org/abmanager;1"]) { // Thunderbird 3
      flags = Components.interfaces.nsIAbListener.directoryItemRemoved;
      Components.classes["@mozilla.org/abmanager;1"]
                .getService(Components.interfaces.nsIAbManager)
                .addAddressBookListener(tzpush.AbListener, flags);
    }
    else { // Thunderbird 2
      flags = Components.interfaces.nsIAddrBookSession.directoryItemRemoved;
      Components.classes["@mozilla.org/addressbook/services/session;1"]
                .getService(Components.interfaces.nsIAddrBookSession)
                .addAddressBookListener(tzpush.AbListener, flags);
    }
  },
  /**
   * Removes this listener.
   */
  remove: function AbListener_remove() {
    if (Components.classes["@mozilla.org/abmanager;1"]) // Thunderbird 3
      Components.classes["@mozilla.org/abmanager;1"]
                .getService(Components.interfaces.nsIAbManager)
                .removeAddressBookListener(tzpush.AbListener);
    else // Thunderbird 2
      Components.classes["@mozilla.org/addressbook/services/session;1"]
                .getService(Components.interfaces.nsIAddrBookSession)
                .removeAddressBookListener(tzpush.AbListener);
  }
  }
 
 
tzpush.Timer = {
  timer : Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer),
  auto : function() {
     synctime = tzpush.prefs.getCharPref("autosync") * 1000 * 60
     this.timer.cancel()
     if (tzpush.prefs.getCharPref("autosync") != 0 ) {         
         this.timer.initWithCallback(this.event,synctime,3);
            }
            },
start : function () {if (tzpush.prefs.getCharPref("autosync") != 0 ) {tzpush.go()}
tzpush.Timer.auto()
},
event : {
  notify: function(timer) {
    tzpush.go();
      }
}
}
tzpush.Timer.start()
tzpush.myPrefObserver.register();
tzpush.AbListener.add()
