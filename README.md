# google-docs-writing-tracker-lite

## Overview

Derived heavily from https://github.com/jamietr1/google-docs-writing-tracker

_**Authors Note** I designed this to be much simpler and give a little extra information than Jamie's script. It doesn't get the file diff, and doesn't keep backups, because I found little use for that. I just wanted the basic stats so I could graph my writing journey easier._

The Google Docs Writing Tracker Lite automates the process of logging how much you write each day. It does four main things:

1. Gets a total word count for the day and logs the word count to a Google Spreadsheet.
2. Gets total word count for whole project.
3. Gets consecutive days written.
4. Sends an email with the above information.

The result is a spreadsheet containing the raw numbers, how much you wrote each day, total word count, and consecutive writing days. Also you get a daily email showing with this information.

The writing tracker depends on a very specific configuration so please be sure to read the setup instructions
below.

## Configuration

The writing tracker depends on you doing all of your writing within a single folder in Google Docs. you can use whichever foled you like. Inside your folder you should keep all of your working documents.

Finally, the system uses a Google Spreadsheet. You can call this spreadsheet whatever you want. The scripts 
refer to it by it's file ID as opposed to its name. However, the spreadsheet MUST have a tab nammed "Writing".
This is where the daily word counts will be recorded.

## Setup

Please follow these instructions carefully. Getting a step wrong will likely cause the scripts to fail.

I. File System Setup

  1. Create a Google Spreadsheet to store your writing data.

      a. Name the first tab in the spreadsheet "Writing"
      b. Give cell A1 the label "Date"
      c. Give cell B1 the label "Words"
      d. Give cell C1 the label "Total"
      e. Give cell F1 the label "Consecutive Days"
      f. Record the file ID of the spreadsheet. You can do this by copying it from the file URL:
      
         If your URL looks like this:
         
            https://docs.google.com/spreadsheet/ccc?key=0AmEvY6JjICyzHUWEkdivZmxmT18584hY#gid=0
            
         the file ID is the part between key= and #gid:
         
            0AmEvY6JjICyzHUWEkdivZmxmT18584hY
            
  2. Get the folder ID folder of your folder using the same method as above

II. Script Setup

The following steps take place in Goolge Drive. If you do not see a Script option when you click 
on "Create" to create a new Google Doc, follows these one-time instructions (if you already have the
Script app in your menu, you can skip to item B below.

A. One-time Google App Script install:

  1. Click on the Connect More Apps link at the bottom of the Create menu.
  2. Search for "Script"
  3. Select "Google App Script" from the search results
  4. Install the Google App Scripts

You should now have a "Script" option when you click on the Create menu in Google Drive.

Proceed with the following steps to complete the setup.

B. Google Doc Writing Tracker script setup:

  1. Create a new Script file called "WritingStats"
  2. When prompted for the type of project, select "Blank Project"
  3. Copy the code from "writing_stats.gs" (in GitHub) and paste it into the code.gs file.
  4. Create a new script file (File->New->Script File) and call it diff.gs.
  5. Copy the code from "diff.gs" (in GitHub) and paste it into the diff.gs file.
  6. Go into the "code.gs" script. There are four values that must be updated:

      var en_add = ""               -- replace with the email address you want the daily writing to be sent

      var SANDBOX = "";             -- this is the folder ID of your writing folder

      var QS_FILE = "";             -- this is the file ID of your spreadsheet

You should have a Google App Script project now, with 1 script in it: code.gs.

III. Configuring the Automation

  1. In the script editor, select the code.gs file.
  2. From the Resources menu, select "Current Project's Triggers"
  3. Click the "No triggers setup. Click here to add one" link.
  4. Under "Run" select the "getDailyWordCount()" function.
  5. Under Events, select "Time-Driven" -> "Day Timer" -> "11pm - midnight"
  6. Click Save

This will call the getDailyWordCount() function once every day between 11pm and midnight. You won't have to
run the script manually. It will work automatically.

IV. Using the scripts

One you've set things up as listed above, all you should have to do it write. When you create a new document
that you want captured in your daily word count, but sure to put the document in your writing folder. This is
where the script looks for documents.

The script should run each night between 11pm and midnight. This is Eastern Time. To change the script to
your local time zone, search the code.gs for "EST" and made the proper substitution. I run the script at this time
because I am generally done for the day and I want the script to capture the day's work. Some people may be night
owls and want the script to run at other times. That's fine, but depending on when you run it, you might have to
alter the date of the files the script looks for. Again, this was written with me and my habits in mind.

I made my writing folder a starred folder and have a shortcut to that folder that I use so that I don't
accidentally edit the earlier version of the file and lose my changes.

<strong>Released under Creative Commons</strong>

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Google Writing Tracker Lite</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://github.com/stevenlaidlaw/" property="cc:attributionName" rel="cc:attributionURL">JSteven Laidlaw</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Google Writing Tracker</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.jamietoddrubin.com" property="cc:attributionName" rel="cc:attributionURL">Jamie Todd Rubin</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/deed.en_US">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.
