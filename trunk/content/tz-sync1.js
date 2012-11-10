function go() {

function FindFolder(wbxml)
{
start = 0
contact = wbxml.indexOf('Contacts')
//tmp = wbxml.indexOf(String.fromCharCode(0x48,0x03)
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

function Send()
{
var req = new XMLHttpRequest(); 
	req.mozBackgroundRequest = true; 
	req.open("POST", SERVER +'?Cmd=' + command +'&User='+ USER +'&DeviceId=TZ-PUSH', false);
	req.overrideMimeType('application/vnd.ms-sync.wbxml'); 
	req.setRequestHeader("User-Agent", deviceType+' ActiveSync');
	req.setRequestHeader("Content-Type", 'application/vnd.ms-sync.wbxml');
	req.setRequestHeader("Authorization", 'Basic '+btoa(USER+':'+PASSWORD));
	req.setRequestHeader("MS-ASProtocolVersion", '2.5');
	req.setRequestHeader("Content-Length", wbxml.length);
        req.sendAsBinary(wbxml);
        wbxml = req.responseText;
        return wbxml;
}


function GetFolderId()
{
command = 'FolderSync'
wbxml = String.fromCharCode(0x03,0x01,0x6a,0x00,0x00,0x07,0x56,0x52,0x03,0x30,0x00,0x01,0x01)
var request = new XMLHttpRequest();


wbxml = Send()
synckey = FindKey(wbxml)
folderID = FindFolder(wbxml)

wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x30,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x01,0x01,0x01)
wbxml = wbxml.replace('Id2Replace',folderID)
//what = FindFolder(wbxml)
//alert(wbxml)
command = 'Sync'
wbxml = Send()
synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)
prefs.setCharPref("folderID", folderID)
}

function Addressbook(){
wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x1E,0x13,0x55,0x03,0x31,0x30,0x30,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x01,0x01,0x01)
folderID = prefs.getCharPref("folderID")
synckey = prefs.getCharPref("synckey")
wbxml = wbxml.replace('SyncKeyReplace',synckey)
wbxml = wbxml.replace('Id2Replace',folderID)
command = "Sync"
//while more available here?
var moreavilable = 1

wbxml = Send()

abManager = Components.classes["@mozilla.org/abmanager;1"]
		.getService(Components.interfaces.nsIAbManager);
addressBook = abManager.getDirectory("moz-abmdbdirectory://abook.mab");
alert("about to start")
// CodePage = Code[0]
var stack = new Array();
num = 4
xml = ''
data = ''
var x = 0
popval = 2
FirstName = '*'
LastName = '*'
MobilePhone = '*'
EmailAddress ='*'
moreavilable = 0
while (num < wbxml.length){
        token = wbxml.substr(num,1);
        tokencontent = token.charCodeAt(0) & 0xbf
            if (token == String.fromCharCode(0x00))
         { 
                num = num + 1
                x = (wbxml.substr(num,1)).charCodeAt(0)
   //             CodePage = Code[x]
              //  writeln('codepage = ' + x)
          }             
            else if (token == String.fromCharCode(0x03) )
         {      temptoken = (wbxml.substr(num - 1,1)).charCodeAt(0) & 0xbf
                data = (wbxml.substring(num + 1, wbxml.indexOf(String.fromCharCode(0x00),num))) 
                num = wbxml.indexOf(String.fromCharCode(0x00),num)
                // if (x === 0x01) {writeln(CodePage[temptoken] + data)
                
                 propname = Contact2[temptoken]
                card.setProperty(propname, data);
             }
                
            //    switch (temptoken)
            //   {
            //   case 0x1f: FirstName = data
            //        break;
            //   case 0x29: LastName = data
            //        break;
            //   case 0x2b: MobilePhone = data
            //       break;
            //   case 0x1b: EmailAddress = data
            //        break;
            //   case 0x1e: DisplayName = data
            //        break;
            //   default: break
            //   }
                
          //}
                       
            else if (token == String.fromCharCode(0x01))
         {
             popval = stack.pop()
          // alert(popval + ' ' + x)
             if (popval === 500) {
         // alert(popval + ' ' + x)
             card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);
             //card.setProperty("FirstName", FirstName);
             //card.setProperty("LastName", LastName);
             //card.setProperty("CellularNumber", MobilePhone);
             //card.setProperty("DisplayName", DisplayName)
             //card.primaryEmail = EmailAddress; 
             var newCard = addressBook.addCard(card);
           //  alert(FirstName +' '+ LastName +' '+ MobilePhone +' '+ EmailAddress);
             FirstName = '*';
             LastName = '*';
             MobilePhone = '*';
             EmailAddress = '*';
             DisplayName = '*' ;
                } //here do address add
          }
             else if (tokencontent == 7 & x == 0 )
         {        
                //  alert(x)
                  // prepare addressbook ie if codepage =1 and email
                  stack.push(500)
                  // writeln(CodePage[tokencontent])
          }
             else if (tokencontent)
         {
                  stack.push(tokencontent)
          }
          else if (token == 20 & x == 0) {
          alert("MoreAvailable")
          moreavilable = 1}
          
             else{}
             num = num + 1
          }
          }
         
 


var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");
        
host = prefs.getCharPref("host")
USER = prefs.getCharPref("user")
PASSWORD = prefs.getCharPref("password")
SERVER = "http://" + host + "/Microsoft-Server-ActiveSync"
deviceType = 'Thunderbird'
synckey = prefs.getCharPref("synckey")

if (synckey == ''){
    GetFolderId()
    Addressbook()
}
else {Addressbook()}


synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)
alert('DONE')
}