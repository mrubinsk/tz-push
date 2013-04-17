/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */


AbListener = {
 
  onItemRemoved: function AbListener_onItemRemoved(aParentDir, aItem) {
    aParentDir.QueryInterface(Components.interfaces.nsIAbDirectory);

     if (aItem instanceof Components.interfaces.nsIAbCard ) {
      deleted = aItem.getProperty("ServerId","")
Components.utils.import("resource://gre/modules/FileUtils.jsm");
var dir = FileUtils.getDir("ProfD", ["DeletedCards"], true);

Components.utils.import("resource://gre/modules/FileUtils.jsm");
var file = FileUtils.getFile("ProfD", ["DeletedCards"]);
file.append(deleted)
file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, FileUtils.PERMS_FILE);


    }
  },
  
  add: function AbListener_add() {
    var flags;
    if (Components.classes["@mozilla.org/abmanager;1"]) { // Thunderbird 3
      flags = Components.interfaces.nsIAbListener.directoryItemRemoved;
      Components.classes["@mozilla.org/abmanager;1"]
                .getService(Components.interfaces.nsIAbManager)
                .addAddressBookListener(AbListener, flags);
    }
    else { // Thunderbird 2
      flags = Components.interfaces.nsIAddrBookSession.directoryItemRemoved;
      Components.classes["@mozilla.org/addressbook/services/session;1"]
                .getService(Components.interfaces.nsIAddrBookSession)
                .addAddressBookListener(AbListener, flags);
    }
  },
  /**
   * Removes this listener.
   */
  remove: function AbListener_remove() {
    if (Components.classes["@mozilla.org/abmanager;1"]) // Thunderbird 3
      Components.classes["@mozilla.org/abmanager;1"]
                .getService(Components.interfaces.nsIAbManager)
                .removeAddressBookListener(AbListener);
    else // Thunderbird 2
      Components.classes["@mozilla.org/addressbook/services/session;1"]
                .getService(Components.interfaces.nsIAddrBookSession)
                .removeAddressBookListener(AbListener);
  }
};
Components.utils.import("resource://gre/modules/FileUtils.jsm");
var dir = FileUtils.getDir("ProfD", ["DeletedCards"], true);
   AbListener.add() 




