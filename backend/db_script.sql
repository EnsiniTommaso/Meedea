DROP DATABASE IF EXISTS meedea_db;
CREATE DATABASE meedea_db;

CREATE TABLE Users(
userID INT PRIMARY KEY AUTOINCREMENT,
userInfo TEXT,
userName VARCHAR(15) UNIQUE,
kickedUntil DATE
);

CREATE TABLE Channels(
channelID PRIMARY KEY AUTOINCREMENT,
channelName VARCHAR(30),
channelDescription TEXT
);

CREATE TABLE Conversations(
conversationID PRIMARY KEY AUTOINCREMENT,
conversationTopic TEXT,
originalPoster INT,  
FOREIGN KEY (originalPoster) REFERENCES Users(userID),
channelID INT,
FOREIGN KEY (channelID) REFERENCES Channels(channelID)
);

CREATE TABLE Messages(
messageID PRIMARY KEY AUTOINCREMENT,
conversationID TEXT,
answerToMessage INT,  
senderUser INT,
messageBody TEXT,
messageTime DATETIME,
FOREIGN KEY (senderUser) REFERENCES Users(userID),
FOREIGN KEY (conversationID) REFERENCES Conversations(conversationID),
FOREIGN KEY (answerToMessage) REFERENCES Messages(messageID)
);

CREATE TABLE Reports (
reportID INT PRIMARY KEY AUTOINCREMENT,
reporterUserID INT,
reportedUserID INT,
reportBody TEXT,
FOREIGN KEY (reporterUserID) REFERENCES Users(userID),
FOREIGN KEY (reportedUserID) REFERENCES Users(userID)
);

CREATE TABLE Notices (
noticeID INT PRIMARY KEY AUTOINCREMENT,
toUserID INT,
noticeBody TEXT,
hasBeenRead BOOL,
FOREIGN KEY (toUserID) REFERENCES Users(userID)
);

CREATE TABLE Blocking(
blockerUserID INT,
blockedUserID INT,
FOREIGN KEY (blockerUserID) REFERENCES Users(userID),
FOREIGN KEY (blockedUserID) REFERENCES Users(userID)
);

CREATE TABLE Friends(
firstFriendID INT,
secondFriendID INT,
FOREIGN KEY (firstFriendID) REFERENCES Users(userID),
FOREIGN KEY (secondFriendID) REFERENCES Users(userID)
);

CREATE TABLE ChannelMembers(
channelID INT,
userID INT,
role TEXT,
FOREIGN KEY (channelID) REFERENCES Channels(channelID),
FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE JoinRequests(
channelID INT,
userID INT,
FOREIGN KEY (channelID) REFERENCES Channels(channelID),
FOREIGN KEY (userID) REFERENCES Users(userID)
);