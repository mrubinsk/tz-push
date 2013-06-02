/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */
if (typeof tzpush == "undefined") {
    var tzpush ={}
}

var tzpush = {
prefs : Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService).getBranch("extensions.tzpush."),
	
       
onopen : function() {
        tzpush.updateprefs();
	document.getElementById('passbox').value = PASSWORD;
	tzpush.localAbs();
}, 

onclose : function() {

},

getpassword : function() {
        var myLoginManager = Components.classes["@mozilla.org/login-manager;1"].
        getService(Components.interfaces.nsILoginManager);
       
      var logins = myLoginManager.findLogins({}, hthost, SERVER, null);
       password = ''
       for (var i = 0; i < logins.length; i++) {
        if (logins[i].username == USER) {
            password = logins[i].password;
            break;
        }
       
    }
 
if (typeof password === 'undefined') {password = ""}  
return password
},

setpassword : function() {
	PASSWORD=tzpush.getpassword()
	if (NEWPASSWORD != PASSWORD) {
        
 var nsLoginInfo = new Components.Constructor(
    "@mozilla.org/login-manager/loginInfo;1",
    Components.interfaces.nsILoginInfo,
    "init");
    var loginInfo = new nsLoginInfo(hthost,SERVER,null,USER,PASSWORD,"USER","PASSWORD");
    
    var updateloginInfo = new nsLoginInfo(hthost,SERVER,null,USER,NEWPASSWORD,"USER","PASSWORD");
    var myLoginManager = Components.classes["@mozilla.org/login-manager;1"].
        getService(Components.interfaces.nsILoginManager);

if  (NEWPASSWORD != ''){
if (NEWPASSWORD != PASSWORD) {
	if (PASSWORD !== ''){
		
	myLoginManager.removeLogin(loginInfo)}
	}
	myLoginManager.addLogin(updateloginInfo)
	tzpush.updateprefs()
}
else if (PASSWORD === "" || typeof PASSWORD === 'undefined'){
	myLoginManager.addLogin(updateloginInfo);
	
}
else {myLoginManager.removeLogin(loginInfo)}
    }
},

updateprefs : function() {
  
addressUrl = tzpush.prefs.getCharPref("abname")
SSL = tzpush.prefs.getBoolPref("https")
host = tzpush.prefs.getCharPref("host")
if (SSL == true){hthost = "https://" + host}
else{hthost = "http://" + host}
if (SSL == true){SERVER = "https://" + host + "/Microsoft-Server-ActiveSync"}
else{SERVER = "http://" + host + "/Microsoft-Server-ActiveSync"}
USER = tzpush.prefs.getCharPref("user")
PASSWORD = tzpush.getpassword()
NEWPASSWORD = ''
deviceType = 'Thunderbird'
deviceId = tzpush.prefs.getCharPref("deviceId")
if (deviceId == "")
{deviceId = Date.now();
tzpush.prefs.setCharPref("deviceId",deviceId)}
polkey = tzpush.prefs.getCharPref("polkey")
synckey = tzpush.prefs.getCharPref("synckey")    
},

localAbs : function() {
     
    count = -1
	while (document.getElementById('localContactsFolder').children.length > 0)
		{document.getElementById('localContactsFolder').removeChild(document.getElementById('localContactsFolder').firstChild)};
	let abManager = Components.classes["@mozilla.org/abmanager;1"] 
		.getService(Components.interfaces.nsIAbManager);
	let allAddressBooks = abManager.directories;
	while (allAddressBooks.hasMoreElements()) {  
		let addressBook = allAddressBooks.getNext();
		if (addressBook instanceof Components.interfaces.nsIAbDirectory && 
			!addressBook.isRemote && !addressBook.isMailList && addressBook.fileName != 'history.mab') 
			{
			var ab = document.createElement('listitem');
			ab.setAttribute('label', addressBook.dirName);
			ab.setAttribute('value', addressBook.URI);
			 count=count+1 
                        if (tzpush.prefs.getCharPref('abname') == addressBook.URI){
			    
				select = count}
                      
			document.getElementById('localContactsFolder').appendChild(ab);
			
		}
	}
	
	if (select != -1) {document.getElementById('localContactsFolder').selectedIndex = select}
  },
  
reset : function() {
addressUrl = tzpush.prefs.getCharPref("abname") 	
tzpush.prefs.setCharPref("polkey",'0')
tzpush.prefs.setCharPref("folderID","")
tzpush.prefs.setCharPref("synckey","")
tzpush.prefs.setCharPref("LastSyncTime","99999999999999")
tzpush.prefs.setCharPref("deviceId","")
tzpush.prefs.setCharPref("autosync","0")
//timer.cancel()
abManager = Components.classes["@mozilla.org/abmanager;1"]
		.getService(Components.interfaces.nsIAbManager);
addressBook = abManager.getDirectory(addressUrl);

cards = addressBook.childCards;
while (cards.hasMoreElements()) {
card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){

card.setProperty('ServerId','')
card.setProperty("LastModifiedDate",'')
addressBook.modifyCard(card)

}
}
},

toggelgo : function() {
     //setpassword()
//tzpush.prefs.setCharPref("go","fromzpush")
   if (tzpush.prefs.getCharPref("go") == "0"){
       tzpush.prefs.setCharPref("go","1") 
    }
    else (tzpush.prefs.setCharPref("go","0"))
    },
    
cape : function() {
    function openTBtab (tempURL) {
//---------------------------------------------------------
var tabmail = null;

var mail3PaneWindow =
Components.classes["@mozilla.org/appshell/window-mediator;1"]
   .getService(Components.interfaces.nsIWindowMediator)
   .getMostRecentWindow("mail:3pane");
if (mail3PaneWindow) {
   tabmail = mail3PaneWindow.document.getElementById("tabmail");
   mail3PaneWindow.focus();
   tabmail.openTab("contentTab", {contentPage: tempURL});
}
   return (tabmail != null)
};

openTBtab("http://www.c-a-p-e.co.uk")
},

updatepass : function() {
	
NEWPASSWORD = document.getElementById('passbox').value

tzpush.setpassword()
},

setselect : function(value){
//alert(value)
tzpush.prefs.setCharPref('abname',value)}

}