// Google Writing Tracker Lite

// Google Writing Tracker Lite by Steven Laidlaw is licensed under a Creative Commons Attribution-ShareAlike

// Derived heavily from Google Writing Tracker -- https://github.com/jamietr1/google-docs-writing-tracker
// Google Writing Tracker by Jamie Todd Rubin is licensed under a Creative Commons Attribution-ShareAlike

// ------------------------------------------------------------------------------------------------------
// GOLBAL VARIABLES
// ------------------------------------------------------------------------------------------------------

// The following section sets variables that are customizable by user. Be sure to read the documentation
// as the code is written for a very specific process.

// Your email address goes below. This is used to email daily writing to your account.
var en_add = "<INSERT_EMAIL_HERE>"

// The FOLDER ID of your writing folder goes below. This is the folder in which your working files go.
var SANDBOX = "<FOLDER_ID_HERE>";

// The FILE ID  of your Google Spreadsheet containing your writing data goes here
var QS_FILE = "<FILE_ID_HERE>";


// -----------------------------------------------------------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------------------------------------------------------


// Function: getWordCount
// Purpose:  Given a text string, returns the number of words in that text string.

function getWordCount(text) {
  text = text.replace(/(^\s*)|(\s*$)/gi,"");
  text = text.replace(/[ ]{2,}/gi," ");
  text = text.replace(/\n /,"\n");
  return text.split(' ').length;
}

// Function: getDailyWordCount
// Purpose:  Loops through all files in SANDBOX and gets teh total word count. Also compares to yesterdays to get your daily count, consecutive days writing, and emails all these results to you

function getDailyWordCount() {
  // Get the files
  var folder = DriveApp.getFolderById(SANDBOX);
  var files = folder.getFilesByType(MimeType.GOOGLE_DOCS)
  var today = Utilities.formatDate(new Date(), "EST", "yyyy-MM-dd");
  var totalCount = 0;

  // Get the total word count for all files
  while (files.hasNext()) {
    var file = files.next();
    var doc = DocumentApp.openById(file.getId());
    var content = doc.getBody().getText();
    totalCount += getWordCount(content);
  }

  // Open spreadsheet
  var qsDoc = SpreadsheetApp.openById(QS_FILE);
  var sheet = qsDoc.getSheetByName("Writing");
  var range = sheet.getLastRow();
  // Get words written since last check
  var wordCount = totalCount - sheet.getRange("c" + range).getValue();
  // Add to range to get input all new data
  range++;
  var dateCell = sheet.getRange("a" + range);
  var wordCell = sheet.getRange("b" + range);
  var totalCell = sheet.getRange("c" + range);
  var consecutiveCell = sheet.getRange("f2");

  // Get daily goal
  var dailyGoal = sheet.getRange("g2");
  dailyGoal = dailyGoal.getValue();
  var bestStreak = sheet.getRange("e2");
  bestStreak = bestStreak.getValue();

  // Push the data to the spreadsheet
  dateCell.setValue(today);
  wordCell.setValue(wordCount);
  totalCell.setValue(totalCount);

  if (wordCount > 0) {
    consecutiveCell.setValue(consecutiveCell.getValue() + 1);
  }
  else {
    consecutiveCell.setValue(0);
  }

  if (bestStreak < consecutiveCell) {
    sheet.getRange("e2").setValue(consecutiveCell.getValue());
  }

  // Send email
  var message = "<html><body>";
  message = message + "<p>On the " + today + " you wrote " + wordCount + " words.</p>";
  if (wordCount == 0) {
    message = message + "<p>Wow, you really don't want to be a successful writer, do you?</p>";
  } else if (wordCount < dailyGoal) {
    message = message + "You didn't hit your daily goal of " + dailyGoal + ". You were " + (dailyGoal - wordCount) + " words short. :(";
  } else {
    message = message + "You achieved your daily goal of " + dailyGoal + ", beating it by " + (wordCount - dailyGoal) + "words! :D";
  }
  message = message + "<p>You have written for " + consecutiveCell.getValue() + " days in a row.</p>";
  message = message + "<hr/><p>Your current total word count is: " + totalCount + "</p><p>Remember to always do your best!</p></body></html>";


  // Send the changes to iinet
  Logger.log("  -> Sending email");
  var subject = "Daily writing for " + today;
  MailApp.sendEmail(en_add, subject, "", {htmlBody: message});
}
