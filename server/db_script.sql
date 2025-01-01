-- mysql

DROP DATABASE IF EXISTS meedea_db;
CREATE DATABASE meedea_db;

USE meedea_db;

CREATE TABLE Users(
userID INT PRIMARY KEY AUTO_INCREMENT,
userInfo TEXT,
userName VARCHAR(15) UNIQUE,
kickedUntil DATE
);

CREATE TABLE Channels(
channelID INT PRIMARY KEY AUTO_INCREMENT,
channelName VARCHAR(30) UNIQUE,
channelDescription TEXT
);

CREATE TABLE Conversations(
conversationID INT PRIMARY KEY AUTO_INCREMENT,
conversationTopic TEXT,
originalPosterID INT,  
FOREIGN KEY (originalPosterID) REFERENCES Users(userID),
channelID INT,
FOREIGN KEY (channelID) REFERENCES Channels(channelID)
);

CREATE TABLE Messages(
messageID INT PRIMARY KEY AUTO_INCREMENT,
conversationID TEXT,
answerToMessage INT,  
senderUserID INT,
messageBody TEXT,
messageTime DATETIME,
FOREIGN KEY (senderUserID) REFERENCES Users(userID),
FOREIGN KEY (conversationID) REFERENCES Conversations(conversationID),
FOREIGN KEY (answerToMessage) REFERENCES Messages(messageID)
);

CREATE TABLE Reports (
reportID INT PRIMARY KEY AUTO_INCREMENT,
reporterUserID INT,
reportedUserID INT,
reportBody TEXT,
FOREIGN KEY (reporterUserID) REFERENCES Users(userID),
FOREIGN KEY (reportedUserID) REFERENCES Users(userID)
);

CREATE TABLE Notices (
noticeID INT PRIMARY KEY AUTO_INCREMENT,
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
userRole TEXT,
FOREIGN KEY (channelID) REFERENCES Channels(channelID),
FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE JoinRequests(
channelID INT,
userID INT,
FOREIGN KEY (channelID) REFERENCES Channels(channelID),
FOREIGN KEY (userID) REFERENCES Users(userID)
);