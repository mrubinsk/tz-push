/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */

 prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
       
function onopen() {
    updateprefs()
	document.getElementById('passbox').value = PASSWORD
	localAbs()
}

function onclose() {

}

function getpassword() {
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
}
function setpassword() {
	PASSWORD=getpassword()
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
	updateprefs()
}
else if (PASSWORD === "" || typeof PASSWORD === 'undefined'){
	myLoginManager.addLogin(updateloginInfo);
	
}
else {myLoginManager.removeLogin(loginInfo)}
    }
}

function updateprefs() {
addressUrl = prefs.getCharPref("abname")
SSL = prefs.getBoolPref("https")
host = prefs.getCharPref("host")
if (SSL == true){hthost = "https://" + host}
else{hthost = "http://" + host}
if (SSL == true){SERVER = "https://" + host + "/Microsoft-Server-ActiveSync"}
else{SERVER = "http://" + host + "/Microsoft-Server-ActiveSync"}
USER = prefs.getCharPref("user")
PASSWORD = getpassword()
NEWPASSWORD = ''
deviceType = 'Thunderbird'
deviceId = prefs.getCharPref("deviceId")
if (deviceId == "")
{deviceId = Date.now();
prefs.setCharPref("deviceId",deviceId)}
polkey = prefs.getCharPref("polkey")
synckey = prefs.getCharPref("synckey")    
}

function localAbs() {
     prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
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
                        if (prefs.getCharPref('abname') == addressBook.URI){
			    
				select = count}
                      
			document.getElementById('localContactsFolder').appendChild(ab);
			
		}
	}
	
	if (select != -1) {document.getElementById('localContactsFolder').selectedIndex = select}
  }
  function reset() {
addressUrl = prefs.getCharPref("abname") 	
prefs.setCharPref("polkey",'0')
prefs.setCharPref("folderID","")
prefs.setCharPref("synckey","")
prefs.setCharPref("LastSyncTime","99999999999999")
prefs.setCharPref("deviceId","")
prefs.setCharPref("autosync","0")
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
}

function toggelgo() {
     //setpassword()

   if (prefs.getCharPref("go") == "0"){
       prefs.setCharPref("go","1") 
    }
    else (prefs.setCharPref("go","0"))
    }
    
function cape() {
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
}
function updatepass()
{
	
NEWPASSWORD = document.getElementById('passbox').value

setpassword()
}
function setselect(value){
//alert(value)
prefs.setCharPref('abname',value)}
