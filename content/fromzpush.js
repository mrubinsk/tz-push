/* Copyright (c) 2012 Mark Nethersole
   See the file LICENSE.txt for licensing information. */

function fromzpush() {



function mycallback(returnedwbxml) {
wbxml=returnedwbxml

synckey = FindKey(wbxml)
prefs.setCharPref("synckey",synckey)

abManager = Components.classes["@mozilla.org/abmanager;1"]
		.getService(Components.interfaces.nsIAbManager);
addressBook = abManager.getDirectory(addressUrl);

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
                 propname = ToContacts[temptoken]
                
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
	       catch(err) {}
               }
	       
	       else if (popval === 700)
	       {ServerId = card.getProperty("ServerId","")
	        modcard = addressBook.getCardFromProperty("ServerId",ServerId,false)
		for (y in Contacts2){
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
           
          
             //else{}
             num = num + 1
           
          }
	  
	  
	  if (moreavilable == 1) {
		wbxml = wbxmlsend.replace('SyncKeyReplace',synckey)
		wbxml = wbxml.replace('Id2Replace',folderID)
		command = "Sync"
		Send(wbxml,mycallback)}
		
		tozpush()
	  }
	  

	  
	  card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);    
moreavilable = 1
//while (moreavilable == 1) {   
wbxmlsend = String.fromCharCode(0x03,0x01,0x6A,0x00,0x45,0x5C,0x4F,0x50,0x03,0x43,0x6F,0x6E,0x74,0x61,0x63,0x74,0x73,0x00,0x01,0x4B,0x03,0x53,0x79,0x6E,0x63,0x4B,0x65,0x79,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x52,0x03,0x49,0x64,0x32,0x52,0x65,0x70,0x6C,0x61,0x63,0x65,0x00,0x01,0x1E,0x13,0x55,0x03,0x31,0x30,0x30,0x00,0x01,0x57,0x5B,0x03,0x31,0x00,0x01,0x62,0x03,0x30,0x00,0x01,0x01,0x01,0x01,0x01)
folderID = prefs.getCharPref("folderID")
synckey = prefs.getCharPref("synckey")
wbxml = wbxmlsend.replace('SyncKeyReplace',synckey)
wbxml = wbxml.replace('Id2Replace',folderID)
command = "Sync"
Send(wbxml,mycallback)

	  
}        