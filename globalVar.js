import React from "react";
import { Dimensions } from "react-native";


global.debugURL = "https://wadaily.co/api/schedule?date=9-2-22";
global.apiURL = "https://wadaily.co/api/schedule";
global.wadailyRed = "#E9281F";
global.wadailyOffRed = "#FFFFF";
global.offWhite = "#f3f2f8";
global.onPress = "#89898c";
global.vWidth = Dimensions.get("window").width;

global.nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

global.dateObj = new Date();
global.date = dateObj.getDate();
global.month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
][dateObj.getMonth()];
global.year = dateObj.getFullYear();

global.dateString = month + " " + date + nth(date);
global.numDate =
  parseInt(dateObj.getMonth() + 1) +
  "-" +
  dateObj.getDate() +
  "-" +
  dateObj.getFullYear();
global.lunchWeb = "https://wadaily.co/api/lunchList?date=";
global.apiLunchURL = lunchWeb + numDate;
global.fakeLunchURL = "https://wadaily.co/api/lunchList?date=8-19-22";
