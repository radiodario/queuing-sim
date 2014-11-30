var moment = require('moment');
var Spinner = require('spin.js');

var positionNumberSpan = document.querySelector('span#positionNumber');
var positionTotalSpan = document.querySelector('span#positionTotal');
var percentSpan = document.querySelector('span#percent');
var timeSpan = document.querySelector('span#timeLeft');

var progressBar = document.querySelector('.progress .bar');

var numberOfPeople = Math.random() * 100000 | 0;
var position = numberOfPeople - Math.random() * 100 | 0;
var accessDate = new Date(new Date().getTime() + 25 * 60 * 1000);

var timeLastProcessed = 0;
var timeStarted = moment();

var opts = {
  lines: 13, // The number of lines to draw
  length: 10, // The length of each line
  width: 5, // The line thickness
  radius: 20, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '60%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

var spinTarget = document.querySelector('div.spin');
var spinner = new Spinner(opts).spin(spinTarget);


function tick() {

  personLeavesQueue();
  personArrivesToQueue();
  personIsProcessed();

  var percent = 100 - ((position/numberOfPeople) * 100 | 0);

  progressBar.style.width = percent + "%";

  positionTotalSpan.innerHTML = numberOfPeople;
  positionNumberSpan.innerHTML = position;
  percentSpan.innerHTML = percent;

  timeSpan.innerHTML = moment(moment().diff(timeStarted)).format("HH:mm:ss");

  if (position === 0) {
    window.location.href = "http://www.alolo.co/blog";
  }



}

function personLeavesQueue() {
  // most likely outcome is that people stay in
  // the queue, but sometimes they leave randomly
  if (Math.random() > 0.1) return;

  var personNumber = Math.random() * numberOfPeople | 0;

  if (personNumber === position) {
    personNumber++;
  }

  if (personNumber < position) {
    position--;
  }

  numberOfPeople--;

}

function personArrivesToQueue() {
  if (Math.random() > 0.25)
    numberOfPeople++;
}

function personIsProcessed() {

  if (timeLastProcessed === 1 * 60) {
    numberOfPeople--;
    position--;
    timeLastProcessed = 0;
  } else {
    timeLastProcessed++;
  }

}

setInterval(tick, 1000);