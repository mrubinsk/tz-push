/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */

if (typeof tzpush == "undefined") {
    var tzpush ={}
}

var tzpush = {
prefs : Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService).getBranch("extensions.tzpush."),

onMenuItemCommand: function() {
    window.open(
		"chrome://tzpush/content/pref.xul",
		"", 
		"chrome,centerscreen,resizable,toolbar", 
		null, null
	);
    
  },

go : function() {
    tzpush.time = tzpush.prefs.getCharPref("LastSyncTime") / 1000
    tzpush.time2 = Date.now() / 1000
    
if (tzpush.prefs.getBoolPref("prov")) { tzpush.Polkey() }
else {
if (tzpush.prefs.getCharPref("synckey") == '')
    {tzpush.GetFolderId()
     }

else {tzpush.fromzpush()
      }
}
 },
                        
Contacts2 : ({
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
}),
	
ToContacts : {
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
},

Polkey : function() {
    polkey = tzpush.prefs.getCharPref("polkey")
if (isNaN(polkey)) {polkey = 0}
if (polkey == "0")
{
wbxml= String.fromCharCode(0x03,0x01,0x6A,0x00,0x00,0x0E,0x45,0x46,0x47,0x48,0x03,0x4D,0x53,0x2D,0x57,0x41,0x50,0x2D,0x50,0x72,0x6F,0x76,0x69,0x73,0x69,0x6F,0x6E,0x69,0x6E,0x67,0x2D,0x58,0x4D,0x4C,0x00,0x01,0x01,0x01,0x01)
command = "Provision"
wbxml = tzpush.Send(wbxml,polcallback,command)

}
else {
if (tzpush.prefs.getCharPref("synckey") == '')
    {tzpush.GetFolderId()
    }

else {tzpush.fromzpush()
     }
}
 

function polcallback(returnedwbxml) {
wbxml=returnedwbxml
polkey = FindPolkey(wbxml)
tzpush.prefs.setCharPref("polkey",polkey)
wbxml= String.fromCharCode(0x03,0x01,0x6A,0x00,0x00,0x0E,0x45,0x46,0x47,0x48,0x03,0x4D,0x53,0x2D,0x57,0x41,0x50,0x2D,0x50,0x72,0x6F,0x76,0x69,0x73,0x69,0x6F,0x6E,0x69,0x6E,0x67,0x2D,0x58,0x4D,0x4C,0x00,0x01,0x49,0x03,0x50,0x6F,0x6C,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x4B,0x03,0x31,0x00,0x01,0x01,0x01,0x01)
wbxml = wbxml.replace('PolKeyReplace',polkey)
command = "Provision"
wbxml = tzpush.Send(wbxml,polcallback1,command)
}
function polcallback1(returnedwbxml) {
wbxml=returnedwbxml
polkey = FindPolkey(wbxml)
tzpush.prefs.setCharPref("polkey",polkey)
wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x00,0x0E,0x45,0x46,0x47,0x48,0x03,0x4D,0x53,0x2D,0x57,0x41,0x50,0x2D,0x50,0x72,0x6F,0x76,0x69,0x73,0x69,0x6F,0x6E,0x69,0x6E,0x67,0x2D,0x58,0x4D,0x4C,0x00,0x01,0x49,0x03,0x50,0x6F,0x6C,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x4B,0x03,0x31,0x00,0x01,0x01,0x01,0x01)
wbxml = wbxml.replace('PolKeyReplace',polkey)
command = "Provision"
wbxml = tzpush.Send(wbxml,polcallback2,command)
}
function polcallback2(returnedwbxml) {
wbxml=returnedwbxml
polkey = FindPolkey(wbxml)
tzpush.prefs.setCharPref("polkey",polkey)
tzpush.GetFolderId()
}
function FindPolkey(wbxml) {
x = String.fromCharCode(0x49,0x03) //<PolicyKey> Code Page 14
start = wbxml.indexOf(x) + 2
end = wbxml.indexOf(String.fromCharCode(0x00),start)
polkey = wbxml.substring(start,end)
return polkey
}

},
                        
GetFolderId : function() {
command = 'FolderSync'
wbxml = String.fromCharCode(0x03,0x01,0x6a,0x00,0x00,0x07,0x56,0x52,0x03,0x30,0x00,0x01,0x01)
wbxml = tzpush.Send(wbxml,callback1,command)

function callback1(returnedwbxml) {
wbxml=returnedwbxml
synckey = tzpush.FindKey(wbxml)
tzpush.prefs.setCharPref("folderSynckey",synckey)
folderID = tzpush.FindFolder(wbxml)
wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x30,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x01,0x01,0x01)
wbxml = wbxml.replace('Id2Replace',folderID)
command = 'Sync'
wbxml = tzpush.Send(wbxml,callback2,command)
}

function callback2(returnedwbxml) {
wbxml=returnedwbxml
synckey = tzpush.FindKey(wbxml)
tzpush.prefs.setCharPref("synckey",synckey)
tzpush.prefs.setCharPref("folderID", folderID)
tzpush.fromzpush()
}

},

fromzpush : function() {
card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);    
moreavilable = 1
//while (moreavilable == 1) {   
wbxmlsend = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x1E,0x13,0x55,0x03,0x31,0x30,0x30,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x01,0x01,0x01)
folderID = tzpush.prefs.getCharPref("folderID")
synckey = tzpush.prefs.getCharPref("synckey")
wbxml = wbxmlsend.replace('SyncKeyReplace',synckey)
wbxml = wbxml.replace('Id2Replace',folderID)
command = "Sync"
tzpush.Send(wbxml,callback,command)   


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



function callback(returnedwbxml) {
wbxml=returnedwbxml
synckey = tzpush.FindKey(wbxml)
tzpush.prefs.setCharPref("synckey",synckey)
abManager = Components.classes["@mozilla.org/abmanager;1"]
		.getService(Components.interfaces.nsIAbManager);
addressBook = abManager.getDirectory(tzpush.prefs.getCharPref("abname"));

var stack = new Array();
num = 4
xml = ''
data = ''
var x = 0
popval = 2
moreavilable = 0
photo = ''
while (num < wbxml.length){
        token = wbxml.substr(num,1);
        tokencontent = token.charCodeAt(0) & 0xbf
            if (token == String.fromCharCode(0x00))
         { 
                num = num + 1
                x = (wbxml.substr(num,1)).charCodeAt(0)
   
          }             
            else if (token == String.fromCharCode(0x03) )
          {     temptoken = (wbxml.substr(num - 1,1)).charCodeAt(0) // & 0xbf
	 
                data = (wbxml.substring(num + 1, wbxml.indexOf(String.fromCharCode(0x00,0x01),num))) 
                num = wbxml.indexOf(String.fromCharCode(0x00),num)
                if ( x === 0x01 && temptoken === 0x7C) {
		 
		
		filePath = addphoto(data)
		
		photo = card.getProperty("ServerId", "") + '.jpg';
		}
		else if ( x === 0x01 && temptoken === 0x48){
		year = data.substr(0,4)
		month = data.substr(5,2)
		day = data.substr(8,2)	
		card.setProperty("BirthYear",year)
		card.setProperty("BirthMonth",month)
		card.setProperty("BirthDay",day)
		}
		
		else if (x === 0x01) {                
                 propname = tzpush.ToContacts[temptoken]
                
                card.setProperty(propname, data)}
               else if (x === 0 && temptoken === 0x4D) {
		card.setProperty('ServerId',data)
                
		}
	      
             }
                
         
                       
            else if (token == String.fromCharCode(0x01))
         {
             popval = stack.pop()
            if (popval === 500) {
		if (photo) {
		card.setProperty("PhotoName", photo );
		card.setProperty("PhotoType", "file" )
		card.setProperty("PhotoURI", filePath )
		photo = ''}
             var newCard = addressBook.addCard(card);
                     card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);
                }
              else if (popval === 600)
              {card = addressBook.getCardFromProperty("ServerId",data,false);
            
               cardsToDelete = Components.classes["@mozilla.org/array;1"]
                         .createInstance(Components.interfaces.nsIMutableArray);
                              
               cardsToDelete.appendElement(card,"");
               try {addressBook.deleteCards(cardsToDelete)} 
               catch (e) {}
               
               Components.utils.import("resource://gre/modules/FileUtils.jsm")
				file1 = FileUtils.getFile("ProfD", ["DeletedCards"],true);
				file1.append(data)
				file1.QueryInterface(Components.interfaces.nsIFile)
				try{file1.remove("true")}
				catch (e) {}
	                     }
	       
	       else if (popval === 700)
	       {ServerId = card.getProperty("ServerId","")
	        modcard = addressBook.getCardFromProperty("ServerId",ServerId,false)
		for (y in tzpush.Contacts2){
		if (card.getProperty(y,"") != '') {
		tmpProp = card.getProperty(y,"")
		modcard.setProperty(y,tmpProp)
		
		
		}

		}
		
		if (photo) {
		modcard.setProperty("PhotoName", photo );
		modcard.setProperty("PhotoType", "file" )
		modcard.setProperty("PhotoURI", filePath )
		photo = ''}
		
		var newCard = addressBook.modifyCard(modcard);
		
                
	      card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);
               }
	       
          }
             else if (tokencontent == 7 & x == 0 )
         {      
            stack.push(500)
          }
           else if (tokencontent == 9 & x == 0 )
         {        
            stack.push(600)     
          }
	  else if (tokencontent == 8 & x == 0 )
         {        
           stack.push(700)              
          }
          else if (token.charCodeAt(0) === 0x14 & x == 0) {
           moreavilable = 1} 
             else if (tokencontent)
         {
                  stack.push(tokencontent)
          }
             num = num + 1
          } 
	  if (moreavilable == 1) {
		wbxml = wbxmlsend.replace('SyncKeyReplace',synckey)
		wbxml = wbxml.replace('Id2Replace',folderID)
		command = "Sync"
		tzpush.Send(wbxml,callback,command) }
		else{tzpush.tozpush()}
		//tzpush.prefs.setCharPref("go","tozpush")
}
},

tozpush : function() { 
   folderID = tzpush.prefs.getCharPref("folderID")
   synckey = tzpush.prefs.getCharPref("synckey")
wbxmlouter = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x56,0x72,0x65,0x70,0x6C,0x61,0x63,0x65,0x68,0x65,0x72,0x65,0x01,0x01,0x01,0x01)

wbxml= ''
abManager = Components.classes["@mozilla.org/abmanager;1"]
		.getService(Components.interfaces.nsIAbManager);
addressBook = abManager.getDirectory(tzpush.prefs.getCharPref("abname"));

count = 0
numofcards = 0
var cardArr = new Array();
mbd = 0
cards = addressBook.childCards;
while (cards.hasMoreElements()) {
    card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){
if (card.getProperty('ServerId','') == '' && !card.isMailList){
	
numofcards = numofcards + 1
wbxml = wbxml + String.fromCharCode(0x47,0x4C,0x03) + card.localId + String.fromCharCode(0x00,0x01,0x5D,0x00,0x01)
for (x in tzpush.Contacts2){
     
     if (card.getProperty(x,"") != '')
     { 	  if (x == 'BirthYear' || x == 'BirthMonth' || x == 'BirthDay'){
	       
	  if (x == 'BirthYear')
	  {
	       birthy = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	   else if (x == 'BirthMonth')
	  {		  
	       birthm = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	  
	  else if (x == 'BirthDay')
	  {
	       birthd = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	  if (mbd == 3){birthymd = birthy + "-" + birthm + "-" + birthd + "T00:00:00.000Z";
	  mbd = 0
	  if (tzpush.prefs.getBoolPref("birthday") == true){
	  wbxml = wbxml + String.fromCharCode(0x48) + String.fromCharCode(0x03) + birthymd +String.fromCharCode(0x00,0x01)
	  }
	  }}
          
 else {
    
    wbxml = wbxml + String.fromCharCode(tzpush.Contacts2[x]) + String.fromCharCode(0x03) + utf8Encode(card.getProperty(x,'')) +String.fromCharCode(0x00,0x01)
       }

}

}

cardArr.push(card) 


wbxml = wbxml + String.fromCharCode(0x01,0x01,0x00,0x00)
}
}

newcards = numofcards }
cards = addressBook.childCards;

while (cards.hasMoreElements()) {
card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){
if (card.getProperty("LastModifiedDate","") > tzpush.time && card.getProperty("LastModifiedDate","") < tzpush.time2 ) {
    numofcards = numofcards + 1     
name = card.getProperty("FirstName","")

 
wbxml = wbxml + String.fromCharCode(0x48,0x4D,0x03) + card.getProperty("ServerId","") + String.fromCharCode(0x00,0x01,0x5D,0x00,0x01)
for (x in tzpush.Contacts2){
     if (card.getProperty(x,"") != '') {
if (x == 'BirthYear' || x == 'BirthMonth' || x == 'BirthDay'){
	       
	  if (x == 'BirthYear')
	  {
	       birthy = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	   else if (x == 'BirthMonth')
	  {		  
	       birthm = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	  
	  else if (x == 'BirthDay')
	  {
	       birthd = card.getProperty(x,"")
	       mbd = mbd + 1
	  }
	  if (mbd == 3){birthymd = birthy + "-" + birthm + "-" + birthd + "T00:00:00.000Z";
	  mbd = 0
	  if (tzpush.prefs.getBoolPref("birthday") == true){
	  wbxml = wbxml + String.fromCharCode(0x48) + String.fromCharCode(0x03) + birthymd +String.fromCharCode(0x00,0x01)
	  }
	  }}
	  else {
wbxml = wbxml + String.fromCharCode(tzpush.Contacts2[x]) + String.fromCharCode(0x03) + card.getProperty(x,'') +String.fromCharCode(0x00,0x01)
	  }
	  }

}
wbxml = wbxml + String.fromCharCode(0x01,0x01,0x00,0x00)
}
}
}
if (numofcards != 0){
wbxmlinner = wbxml
wbxml = wbxmlouter.replace('replacehere',wbxmlinner)
wbxml = wbxml.replace('SyncKeyReplace',synckey)
wbxml = wbxml.replace('Id2Replace',folderID)
command = "Sync"
wbxml = tzpush.Send(wbxml,callback,command)
}
//else {tzpush.prefs.setCharPref("go","senddel")}
else {tzpush.senddel()}


function callback(returnedwbxml) {
wbxml=returnedwbxml

synckey = tzpush.FindKey(wbxml)
tzpush.prefs.setCharPref("synckey",synckey)


cId = String.fromCharCode(0x4c,0x03) // 0x0C:'<ClientId>', 
sId = String.fromCharCode(0x4d,0x03) // 0x0D:'<ServerId>'
start = 0
for (var i=0; i< newcards; i++){
start = wbxml.indexOf(cId,start)
end = wbxml.indexOf(String.fromCharCode(0x00),start)
ClientId = wbxml.substring(start + 2,end)

start = wbxml.indexOf(sId,end)
end = wbxml.indexOf(String.fromCharCode(0x00),start)
ServerId = wbxml.substring(start +2,end)

addressBook = abManager.getDirectory(tzpush.prefs.getCharPref("abname"));
cards = addressBook.childCards;
while (cards.hasMoreElements()) {
card = cards.getNext()
if (card instanceof Components.interfaces.nsIAbCard){

if (card.localId === ClientId){ 
card.setProperty('ServerId', ServerId)
addressBook.modifyCard(card)
}}}
}}


function utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utf8string = "";
    for (var n = 0; n < string.length; n++) {
   	 var c = string.charCodeAt(n);
   	 if (c < 128) {
   		 utf8string += String.fromCharCode(c);
   	 }
   	 else if((c > 127) && (c < 2048)) {
   		 utf8string += String.fromCharCode((c >> 6) | 192);
   		 utf8string += String.fromCharCode((c & 63) | 128);
   	 }
   	 else {
   		 utf8string += String.fromCharCode((c >> 12) | 224);
   		 utf8string += String.fromCharCode(((c >> 6) & 63) | 128);
   		 utf8string += String.fromCharCode((c & 63) | 128);
   	 }
    }
    return utf8string;
  }

},

senddel : function() {
folderID = tzpush.prefs.getCharPref("folderID")
synckey = tzpush.prefs.getCharPref("synckey")
wbxmlouter = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x56,0x72,0x65,0x70,0x6C,0x61,0x63,0x65,0x68,0x65,0x72,0x65,0x01,0x01,0x01,0x01)
wbxml= ''
numofdel = 0
Components.utils.import("resource://gre/modules/FileUtils.jsm")
file = FileUtils.getFile("ProfD", ["DeletedCards"],true);
entries = file.directoryEntries;
while (entries.hasMoreElements())
{
numofdel = numofdel + 1
entry = entries.getNext()
entry.QueryInterface(Components.interfaces.nsIFile)
deletedcards = entry.leafName
wbxml = wbxml + String.fromCharCode(0x49,0x4D,0x03) + deletedcards + String.fromCharCode(0x00,0x01,0x01)
}
wbxmlinner = wbxml
wbxml = wbxmlouter.replace('replacehere',wbxmlinner)
wbxml = wbxml.replace('SyncKeyReplace',synckey)
wbxml = wbxml.replace('Id2Replace',folderID)
if (numofdel > 0) {
command = "Sync"
wbxml = tzpush.Send(wbxml,callback,command)
}
else {tzpush.prefs.setCharPref("go","all done")}

function callback(returnedwbxml) {
wbxml=returnedwbxml
synckey = tzpush.FindKey(wbxml)
tzpush.prefs.setCharPref("synckey",synckey)
var entries = file.directoryEntries;
while (entries.hasMoreElements()){
entry = entries.getNext()   
entry.QueryInterface(Components.interfaces.nsIFile)
entry.remove("true")
tzpush.prefs.setCharPref("go","all done")
}
}
    
},

Send : function(wbxml,callback,command){
SSL = tzpush.prefs.getBoolPref("https")
host = tzpush.prefs.getCharPref("host")
if (SSL == true){hthost = "https://" + host}
else{hthost = "http://" + host}
if (SSL == true){SERVER = "https://" + host + "/Microsoft-Server-ActiveSync"}
else{SERVER = "http://" + host + "/Microsoft-Server-ActiveSync"}
USER = tzpush.prefs.getCharPref("user")
PASSWORD = tzpush.getpassword()
deviceType = 'Thunderbird'
deviceId = tzpush.prefs.getCharPref("deviceId")
polkey = tzpush.prefs.getCharPref("polkey")

        req = new XMLHttpRequest(); 
	req.mozBackgroundRequest = true; 
	req.open("POST", SERVER +'?Cmd=' + command +'&User='+ USER +'&DeviceType=Thunderbird'+'&DeviceId=' + deviceId, true);
	req.overrideMimeType('application/vnd.ms-sync.wbxml'); 
        req.setRequestHeader("User-Agent", deviceType+' ActiveSync');
	req.setRequestHeader("Content-Type", 'application/vnd.ms-sync.wbxml');
	req.setRequestHeader("Authorization", 'Basic '+btoa(USER+':'+PASSWORD));
	req.setRequestHeader("MS-ASProtocolVersion", '2.5');
	req.setRequestHeader("Content-Length", wbxml.length);
        if (tzpush.prefs.getBoolPref("prov")) {
        req.setRequestHeader("X-MS-PolicyKey", polkey);
        }
	
      req.onreadystatechange = function()
    { 
        if (req.readyState == 4 && req.status == 200)
        {
	    LastSyncTime = Date.now()
	   
	tzpush.prefs.setCharPref("LastSyncTime",LastSyncTime)
	   wbxml = req.responseText
	   if(wbxml.substr(0,4) != String.fromCharCode(0x03,0x01,0x6A,0x00)){javascript_abort()}
            callback(req.responseText);
	}
	
	}
	
        try {req.sendAsBinary(wbxml)}
	catch(e) {
	    
	}  
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
return password
},
 
FindKey : function(wbxml){
x = String.fromCharCode(0x4b,0x03) //<SyncKey> Code Page 0
if (wbxml.substr(5,1) == String.fromCharCode(0x07))
{
x = String.fromCharCode(0x52,0x03) //<SyncKey> Code Page 7
}
start = wbxml.indexOf(x) + 2
end = wbxml.indexOf(String.fromCharCode(0x00),start)
synckey = wbxml.substring(start,end)
return synckey

},

FindFolder : function(wbxml){
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


}






