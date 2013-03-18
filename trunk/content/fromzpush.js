/* Copyright (c) 2006 YourNameHere
   See the file LICENSE.txt for licensing information. */

function fromzpush() {
var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService);
	prefs = prefs.getBranch("extensions.tzpush.");

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
//'BirthYear':'
//'BirthMonth':'
//'BirthDay':'
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
card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);    
moreavilable = 1
while (moreavilable == 1) {   
wbxml = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x1E,0x13,0x55,0x03,0x31,0x30,0x30,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x01,0x01,0x01)
folderID = prefs.getCharPref("folderID")
synckey = prefs.getCharPref("synckey")
wbxml = wbxml.replace('SyncKeyReplace',synckey)
wbxml = wbxml.replace('Id2Replace',folderID)
//alert(toxml(wbxml))
command = "Sync"
wbxml = Send(wbxml)
synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)

abManager = Components.classes["@mozilla.org/abmanager;1"]
		.getService(Components.interfaces.nsIAbManager);
addressBook = abManager.getDirectory(addressUrl);
//alert("about to start")
// CodePage = Code[0]
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
   //             CodePage = Code[x]
              //  writeln('codepage = ' + x)
          }             
            else if (token == String.fromCharCode(0x03) )
          {     temptoken = (wbxml.substr(num - 1,1)).charCodeAt(0) // & 0xbf
	  //alert(temptoken)
                data = (wbxml.substring(num + 1, wbxml.indexOf(String.fromCharCode(0x00,0x01),num))) 
                num = wbxml.indexOf(String.fromCharCode(0x00),num)
                if ( x === 0x01 && temptoken === 0x7C) {
		 //alert("going to addphoto")
		//call photo handler
		filePath = addphoto(data)
		//alert(filePath)
		photo = card.getProperty("ServerId", "") + '.jpg';
		}
		else if (x === 0x01) {                
                 propname = ToContacts[temptoken]
                 //alert(propname + ' ' + data)
                card.setProperty(propname, data)}
               else if (x === 0 && temptoken === 0x4D) {
		card.setProperty('ServerId',data)
                 //alert(temptoken)
		 //alert('ServerId = ' + data)
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
            //alert(FirstName +' '+ LastName +' '+ CellularNumber +' '+ PrimaryEmail);
             card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);
                }
              else if (popval === 600)
              {card = addressBook.getCardFromProperty("ServerId",data,false);
               // alert(data)
               cardsToDelete = Components.classes["@mozilla.org/array;1"]
                         .createInstance(Components.interfaces.nsIMutableArray);
                        // alert(card.getProperty("ServerId",""))
                        // alert(card.getProperty("FirstName",""))        
               cardsToDelete.appendElement(card,"");
               addressBook.deleteCards(cardsToDelete)
               }
	       
	       else if (popval === 700)
	       {ServerId = card.getProperty("ServerId","")
	       //alert(ServerId)
		modcard = addressBook.getCardFromProperty("ServerId",ServerId,false)
		for (y in Contacts2){
		if (card.getProperty(y,"") != '') {
		tmpProp = card.getProperty(y,"")
		//alert(y + " " + tmpProp)
		modcard.setProperty(y,tmpProp)
		
		
		}

		}
		//PhotoName=card.getProperty("PhotoName", '' );
		//PhotoType=card.getProperty("PhotoType", '' )
		//PhotoURI=card.getProperty("PhotoURI", '' )
		if (photo) {
		modcard.setProperty("PhotoName", photo );
		modcard.setProperty("PhotoType", "file" )
		modcard.setProperty("PhotoURI", filePath )
		photo = ''}
		//alert(modcard.getProperty("PrimaryEmail",""))
		var newCard = addressBook.modifyCard(modcard);
                // alert(modcard.getProperty("FirstName",""))
	      card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);
               }
	       
          }
             else if (tokencontent == 7 & x == 0 )
         {        
                //  alert(x)
                  // prepare addressbook ie if codepage =1 and email
                  stack.push(500)
                  // writeln(CodePage[tokencontent])
          }
          
              else if (tokencontent == 9 & x == 0 )
         {        
                //  alert(x)
                  // prepare addressbook ie if codepage =1 and email
                  stack.push(600)
                  // writeln(CodePage[tokencontent])
          }
	  
	  else if (tokencontent == 8 & x == 0 )
         {        
                //  alert(x)
                  // prepare addressbook ie if codepage =1 and email
                  stack.push(700)
                  // writeln(CodePage[tokencontent])
          }
          
          else if (token.charCodeAt(0) === 0x14 & x == 0) {
           //alert("MoreAvailable")
           moreavilable = 1} 
       
          
             else if (tokencontent)
         {
                  stack.push(tokencontent)
          }
           
          
             else{}
             num = num + 1
             //alert(token.charCodeAt(0))
          }}
          }