# TZ-PUSH #

Thunderbird extension to sync addressbook to Z-Push, Zentyal/Zarafa.

And outlook office360? (It does work for outlook.com)

# Installation #
Download and install xpi from mozilla add-on to Thunderbird or Seamonkey (tzpush1.2 and tzpush2.0.2 onward)

The downloads on this page are old versions.

# Provisioning #
z-push is normally setup to require provisioning as default. So tick the box if you can not get a sync. see http://www.zarafa.com/wiki/index.php/Z-Push_Provisioning

# Mozilla Addons #
Now at https://addons.mozilla.org/addon/tzpush/

# Discussion #
https://groups.google.com/forum/?fromgroups#!forum/tzpush

# Latest Version #
Newest version is at Mozilla Addons

You can add a tz-sync button to main window or addressbook window. Right click in toolbar and click customise. Drag button to toolbar.

Fixed a problem with Horde. Horde will reject a duplicate contact. Tzpush will now mark this to not send again unless it is changed. (It will take 2 sync cycles, First to mark as ok to send, second to send. I'll look in to this.)

Added a tzpush status indicator in the status bar. You can also right click for "Sync", "Settings"

Fixed a bug where moving address cards to and from different address books would retain previous sync information.

It will now limit number of address cards sent at once. It still sends them all but 50 at a time. It is set to 50 can be changed in thunderbird pref maxnumbertosend. 50 seems a safe number. It works much better with outlook.com.

# tzpush2 #
Latest version of tzpush2 (multiple address books) is at
> https://addons.mozilla.org/en-us/thunderbird/addon/tzpush/versions/


# Don't Forget #

Please visit http://www.c-a-p-e.co.uk and chick on Just Giving button.