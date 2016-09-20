

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success)
          success(JSON.parse(xhr.responseText));
      } else {
        if (error)
          error(xhr);
      }
    }
  };

  xhr.open("GET", path, true);
  xhr.send();
}

loadJSON('../fazenda.json', function(data) {
  var ranking = document.getElementById('ranking');

  for ( var i = 0; i < data.data.length; i++ ) {
    var positiveVote      = data.data[i].positive;
    var negativeVote      = data.data[i].negative;
    var totalPerPerson    = calculateVotes(negativeVote, positiveVote);
    var like              = calculatePercentage(totalPerPerson, negativeVote);
    var dontLike          = calculatePercentage(totalPerPerson, positiveVote);
    var content           =
         '<li>' +
           '<figure class="ranking__artist">' +
              '<img class="ranking__artist-avatar" src=" '+ data.data[i].picture +' " alt="">' +
              '<figcaption class="ranking__artist-info">' +
                '<h1 class="ranking__artist-name">' + data.data[i].name + '</h1>' +
                '<p class="ranking__artist-descripton">' + data.data[i].description + '</p>' +
              '</figcaption>' +
              '<span class="indice">' + i + '</span>' +
            '</figure>' +

            '<div class="tooltip">' +
              '<div class="tooltip__like">' +
                '<div class="tooltip__title">Gostam</div>' +
                '<div class="tooltip__count">' + like + '%</div>' +
              '</div>' +
              '<span class="divisor"></span>' +
              '<div class="tooltip__dontlike">' +
                '<div class="tooltip__title">Não Gostam</div>' +
                '<div class="tooltip__count">' + dontLike + '%</div>' +
              '</div>' +
            '</div>' +
          '</li>';


         ranking.innerHTML += content;
  }
}, function(xhr) {
  console.error(xhr);
});

function calculateVotes(refPositive, refNegative) {

  if ( refPositive === null || refPositive === "undefined" ) {
      refPositive = 0;
  }
  if ( refNegative === null || refNegative === "undefined") {
      refNegative = 0;
  }
  return parseInt(refPositive) + parseInt(refNegative);
}

function calculatePercentage(refSum, refVotes) {
  if ( refVotes === null || refVotes === "undefined" ) {
    refVotes = 0;
  }
  var calculate = ((refVotes * 100) / refSum);
  if ( isNaN(calculate) ) {
    calculate = 0;
    return calculate;
  }
  return parseFloat(calculate.toFixed(2));
}