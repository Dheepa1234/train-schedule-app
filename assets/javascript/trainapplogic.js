//Steps to complete:

//1. Initialize Firebase
//2. Create button for adding new train information - then update the html+ update the database
//3. Code this app to calculate when the next train will arive; this should be relative to th current times.

$(document).ready(function(){

// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyAiMxJDLnAhi2-y6_JXe5VeU4BRZzvMAfg",
    authDomain: "scs-bootcamp-june2018.firebaseapp.com",
    databaseURL: "https://scs-bootcamp-june2018.firebaseio.com",
    projectId: "scs-bootcamp-june2018",
    storageBucket: "scs-bootcamp-june2018.appspot.com",
    messagingSenderId: "1008508740858"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  // 2. Button for adding train information
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var empTrainName = $("#train-name-input").val().trim();
    var empDestination= $("#destination-input").val().trim();
    var empFirstTrainTime = moment($("#first-train-time-input").val().trim(), "MM/DD/YYYY").format("X");
    var empFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      train: emptrainName,
      destination: empDestination
      firstTrain: empfirsttrainTIme,
      trainFrequency: empFrequency,
    };

   
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.trainFrequency);
  
    alert("Train information successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var emptrainName = childSnapshot.val().name;
  var empDestination = childSnapshot.val().role;
  var empfirstTrainTime = childSnapshot.val().start;
  var empFrequency = childSnapshot.val().rate;

  // Employee Info
  console.log(emptrainName);
  console.log(empDestination);
  console.log(empfirstTrainTime);
  console.log(empFrequency);

  // Prettify the train start
  var empStartPretty = moment.unix(empFrequency).format("minutes");

   
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(emptrainName),
    $("<td>").text(empDestination),
    $("<td>").text(empStartPretty),
    $("<td>").text(empfirstTrainTime),
    $("<td>").text(empFrequency),
  

      //Code this app to calculate when the next train will arrive; this should be relative to the current time.

    });      
});