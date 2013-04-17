/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */
var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");

var timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
timer.cancel()
function javascript_abort()
{
   throw new Error('wbxml not returned. Check Username, Password, and conection.');
}



Contacts2= ({
'FirstName':0x5F,
'LastName':0x69,
'DisplayName':0x5E, 
//'Nickname':'
'PrimaryEmail':0x5B,
'SecondEmail':0x5C,
//'Screen Name':'
'WorkPhone':0x53,
'HomePhone':0x67,
'FaxNumber':0x66,
//'PagerNumber':'
'CellularNumber':0x6B,
'HomeAddress':0x65,
//'HomeAddress2':'
'HomeCity':0x61,
'HomeState':0x64,
'HomeZipCode':0x63,
'HomeCountry':0x62,
'WorkAddress':0x51,
//'WorkAddress2':'
'WorkCity':0x4D,
'WorkState':0x50,
'WorkZipCode':0x4F,
'WorkCountry':0x4E,
'JobTitle':0x68,
'Department':0x5A,
'Company':0x59,
'WebPage1':0x77,
//'WebPage2':'
'BirthYear':'',
'BirthMonth':'',
'BirthDay':'',
//'Custom1':'
//'Custom2':'
//'Custom3':'
//'Custom4':'
//'Notes':'
})
	
ToContacts = {
0x5F:'FirstName',
0x69:'LastName',
0x5E:'DisplayName', 
//'Nickname':'
0x5B:'PrimaryEmail',
0x5C:'SecondEmail',
//'Screen Name':'
0x53:'WorkPhone',
0x67:'HomePhone',
0x66:'FaxNumber',
//'PagerNumber':'
0x6B:'CellularNumber',
0x65:'HomeAddress',
//'HomeAddress2':'
0x61:'HomeCity',
0x64:'HomeState',
0x63:'HomeZipCode',
0x62:'HomeCountry',
0x41:'WorkAddress',
//'WorkAddress2':'
0x4D:'WorkCity',
0x50:'WorkState',
0x4F:'WorkZipCode',
0x4E:'WorkCountry',
0x68:'JobTitle',
0x5A:'Department',
0x59:'Company',
0x77:'WebPage1',
//'WebPage2':'
//'BirthYear':'
//'BirthMonth':'
//'BirthDay':'
//'Custom1':'
//'Custom2':'
//'Custom3':'
//'Custom4':'
//'Notes':'
}

function addphoto(data){
var photo = card.getProperty("PhotoName", "");
				
				
			Components.utils.import("resource://gre/modules/FileUtils.jsm");
 			var dir = FileUtils.getDir("ProfD", ["Photos"], true);
				
			
				photo = card.getProperty("ServerId", "") + '.jpg';
				card.setProperty("PhotoName", photo );
				
			
			var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
				.createInstance(Components.interfaces.nsIFileOutputStream);
			var file = Components.classes["@mozilla.org/file/directory_service;1"]
						         .getService(Components.interfaces.nsIProperties)
						         .get("ProfD", Components.interfaces.nsIFile);
			file.append("Photos");
			file.append(photo); 
			foStream.init(file, 0x02 | 0x08 | 0x20, 0600, 0);   // write, create, truncate
				var binary = atob(data);
				foStream.write(binary, binary.length);
			foStream.close();
			card.setProperty("PhotoType", "file" );
			var filePath = 'file:///' + file.path.replace(/\\/g, '\/').replace(/^\s*\/?/, '').replace(/\ /g, '%20');
			card.setProperty("PhotoURI", filePath );
			
			return filePath

}


function reset() {
addressUrl = prefs.getCharPref("abname") 	
prefs.setCharPref("polkey",'0')
prefs.setCharPref("folderID","")
prefs.setCharPref("synckey","")
prefs.setCharPref("LastSyncTime","99999999999999")
prefs.setCharPref("deviceId","")
prefs.setCharPref("autosync","0")
timer.cancel()
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

function polcallback(returnedwbxml) {
wbxml=returnedwbxml
if (prefs.getCharPref("debugwbxml") == 1){
myDump(toxml(wbxml),"Recieved XML: ")
writewbxml(wbxml)}
polkey = FindPolkey(wbxml)
wbxml= String.fromCharCode(0x03,0x01,0x6A,0x00,0x00,0x0E,0x45,0x46,0x47,0x48,0x03,0x4D,0x53,0x2D,0x57,0x41,0x50,0x2D,0x50,0x72,0x6F,0x76,0x69,0x73,0x69,0x6F,0x6E,0x69,0x6E,0x67,0x2D,0x58,0x4D,0x4C,0x00,0x01,0x49,0x03,0x50,0x6F,0x6C,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x4B,0x03,0x31,0x00,0x01,0x01,0x01,0x01)
wbxml = wbxml.replace('PolKeyReplace',polkey)

wbxml = Send(wbxml,polcallback1)

}

function polcallback1(returnedwbxml) {
wbxml=returnedwbxml
if (prefs.getCharPref("debugwbxml") == 1){
myDump(toxml(wbxml),"Recieved XML: ")
writewbxml(wbxml)}
polkey = FindPolkey(wbxml)
wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x00,0x0E,0x45,0x46,0x47,0x48,0x03,0x4D,0x53,0x2D,0x57,0x41,0x50,0x2D,0x50,0x72,0x6F,0x76,0x69,0x73,0x69,0x6F,0x6E,0x69,0x6E,0x67,0x2D,0x58,0x4D,0x4C,0x00,0x01,0x49,0x03,0x50,0x6F,0x6C,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x4B,0x03,0x31,0x00,0x01,0x01,0x01,0x01)
wbxml = wbxml.replace('PolKeyReplace',polkey)
wbxml = Send(wbxml,polcallback2)

}

function polcallback2(returnedwbxml) {
wbxml=returnedwbxml
if (prefs.getCharPref("debugwbxml") == 1){
myDump(toxml(wbxml),"Recieved XML: ")
writewbxml(wbxml)}
polkey = FindPolkey(wbxml)
prefs.setCharPref("polkey",polkey)
GetFolderId()
}

function PolKey() {
polkey = prefs.getCharPref("polkey")
if (isNaN(polkey)) {polkey = 0}
if (polkey == "0")
{
wbxml= String.fromCharCode(0x03,0x01,0x6A,0x00,0x00,0x0E,0x45,0x46,0x47,0x48,0x03,0x4D,0x53,0x2D,0x57,0x41,0x50,0x2D,0x50,0x72,0x6F,0x76,0x69,0x73,0x69,0x6F,0x6E,0x69,0x6E,0x67,0x2D,0x58,0x4D,0x4C,0x00,0x01,0x01,0x01,0x01)
command = "Provision"
wbxml = Send(wbxml,polcallback)

}
else {
if (synckey == '')
    {GetFolderId()
    //fromzpush()
    //tozpush()
    }

else {fromzpush()
     // tozpush()
     // senddel()
     }

}


}

function FindFolder(wbxml)
{
start = 0
Scontact = String.fromCharCode(0x4A,0x03) + '9' + String.fromCharCode(0x00,0x01)
contact = wbxml.indexOf(Scontact)
while (wbxml.indexOf(String.fromCharCode(0x48,0x03),start) < contact)
{
start = wbxml.indexOf(String.fromCharCode(0x48,0x03),start) + 2
end = wbxml.indexOf(String.fromCharCode(0x00),start)
folderID = wbxml.substring(start,end)
}
return folderID
}

function FindKey(wbxml)
{
x = String.fromCharCode(0x4b,0x03) //<SyncKey> Code Page 0
if (wbxml.substr(5,1) == String.fromCharCode(0x07))
{
x = String.fromCharCode(0x52,0x03) //<SyncKey> Code Page 7
}
start = wbxml.indexOf(x) + 2
end = wbxml.indexOf(String.fromCharCode(0x00),start)
synckey = wbxml.substring(start,end)
return synckey

}

function FindPolkey(wbxml)
{
x = String.fromCharCode(0x49,0x03) //<PolicyKey> Code Page 14
start = wbxml.indexOf(x) + 2
end = wbxml.indexOf(String.fromCharCode(0x00),start)
polkey = wbxml.substring(start,end)
return polkey

}

function Send(wbxml,callback)
{


if (prefs.getCharPref("debugwbxml") == 1) { 
writewbxml(wbxml)
myDump(toxml(wbxml),"Sending XML: ")}

        req = new XMLHttpRequest(); 
	req.mozBackgroundRequest = true; 
	req.open("POST", SERVER +'?Cmd=' + command +'&User='+ USER +'&DeviceType=Thunderbird'+'&DeviceId=' + deviceId, true);
	req.overrideMimeType('application/vnd.ms-sync.wbxml'); 
        req.setRequestHeader("User-Agent", deviceType+' ActiveSync');
	req.setRequestHeader("Content-Type", 'application/vnd.ms-sync.wbxml');
	req.setRequestHeader("Authorization", 'Basic '+btoa(USER+':'+PASSWORD));
	req.setRequestHeader("MS-ASProtocolVersion", '2.5');
	req.setRequestHeader("Content-Length", wbxml.length);
        if (prefs.getBoolPref("prov")) {
        req.setRequestHeader("X-MS-PolicyKey", polkey);
        }
	
      req.onreadystatechange = function()
    { 
        if (req.readyState == 4 && req.status == 200)
        {
	   if (prefs.getCharPref("debugwbxml") == 1){
           myDump(toxml(req.responseText),"Recieved XML: ")
           writewbxml(req.responseText)}
	   LastSyncTime = Date.now()
	   
	prefs.setCharPref("LastSyncTime",LastSyncTime)
	   wbxml = req.responseText
	   if(wbxml.substr(0,4) != String.fromCharCode(0x03,0x01,0x6A,0x00)){javascript_abort()}
            callback(req.responseText); // Another callback here
	}
	
	}
	
        try {req.send(wbxml)}
	catch(e) {
	    //ignore wbxml error 
	}
        
     



}

function mycallback4(returnedwbxml) {
wbxml=returnedwbxml
synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)
prefs.setCharPref("folderID", folderID)
fromzpush()
}

function mycallback3(returnedwbxml) {
wbxml=returnedwbxml
synckey = FindKey(wbxml)
folderID = FindFolder(wbxml)

wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x30,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x01,0x01,0x01)
wbxml = wbxml.replace('Id2Replace',folderID)

command = 'Sync'
wbxml = Send(wbxml,mycallback4)

}
function GetFolderId()
{
 
command = 'FolderSync'
wbxml = String.fromCharCode(0x03,0x01,0x6a,0x00,0x00,0x07,0x56,0x52,0x03,0x30,0x00,0x01,0x01)

wbxml = Send(wbxml,mycallback3)


}

function localAbs() {
    
	while (document.getElementById('localContactsFolder').children.length > 0)
		document.getElementById('localContactsFolder').removeChild(document.getElementById('localContactsFolder').firstChild);
	let abManager = Components.classes["@mozilla.org/abmanager;1"] 
		.getService(Components.interfaces.nsIAbManager);
	let allAddressBooks = abManager.directories;
	while (allAddressBooks.hasMoreElements()) {  
		let addressBook = allAddressBooks.getNext();
		if (addressBook instanceof Components.interfaces.nsIAbDirectory && 
			!addressBook.isRemote && !addressBook.isMailList && addressBook.fileName != 'history.mab') {
			var ab = document.createElement('listitem');
			ab.setAttribute('label', addressBook.dirName);
			ab.setAttribute('value', addressBook.URI);
                        if (prefs.getCharPref('abname') == addressBook.URI){
				ab.setAttribute('selected',true)}
                        
			document.getElementById('localContactsFolder').appendChild(ab);
			
		}
	}
	
  }

var myPrefObserver = {
  register: function() {
    // First we'll need the preference services to look for preferences.
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
	timer.cancel()	
	if (prefs.getCharPref("autosync") != '0' )
	    {
			if (prefs.getCharPref("autosync") != '' ){
	    synctime = prefs.getCharPref("autosync") * 1000 * 60
	    timer.initWithCallback(event, synctime, 3);
         }}
        break;
      case "go":
        go()
	break;
    }
  }
}
myPrefObserver.register();
