$(document).ready(function () {
  var head = $('#headspace');
  var datasets = [
  ['Well', ghostwriter.backspace.repeat(4), 'hello'],
  ['thanks', ghostwriter.backspace.repeat(6), 'for', ghostwriter.selectAll, 'visiting'],
  ['Glad', ghostwriter.backspace.repeat(4), 'you could', ghostwriter.selectAll, 'make it'],
  ['Good', ghostwriter.backspace.repeat(4), 'tidings'],
  ['To you', ghostwriter.backspace.repeat(6), 'and', ghostwriter.selectAll, 'yours'],
  ['Wishing', ghostwriter.backspace.repeat(7), 'you', ghostwriter.selectAll, 'a happy', ghostwriter.selectAll, 'day']
  ];

  function haunt(input, data) {
    ghostwriter.haunt({
      input: $(input),
      manuscript: data
    }).start();
    return;
  }

  function initAutoComplete(key, input) {
    var data = datasets[key];
    var timeout = ((key + 1) * 1000) * 0.5 * data.length;
    console.log(timeout);
    setTimeout(function() {
      haunt(input, data);
    }, timeout);
    return;
  }

  function init() {
    $('input').each(initAutoComplete);
    return;
  }

  init();

});
