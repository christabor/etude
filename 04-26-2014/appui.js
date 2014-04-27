var $dbs           = $('#dbs');
var $servers       = $('#servers');
var $frontends     = $('#frontends');
var $datamines     = $('#datamines');
var $dbs_out       = $('#output-db');
var $servers_out   = $('#output-server');
var $frontends_out = $('#output-frontend');
var $datamines_out = $('#output-datamine');
var $options       = $('#options-add');

function addItem(el, html, options) {
    var del = '<a href="#" class="fa fa-times-circle"></a>';
    el.append('<div class="item">' + html + del + '</div>');
}

function removeType(e) {
    e.preventDefault();
    $(this).parent().remove();
}

function addDB(e) {
    e.preventDefault();
    addItem($dbs_out, $(this).parent().find('select').val());
}

function addServer(e) {
    e.preventDefault();
    addItem($servers_out, $(this).parent().find('select').val());
}

function addFrontend(e) {
    e.preventDefault();
    addItem($frontends_out, $(this).parent().find('select').val());
}

function addDatamine(e) {
    e.preventDefault();
    addItem($datamines_out, $(this).parent().find('input').val());
}

function init() {
    $dbs.find('.btn').on('click', addDB);
    $servers.find('.btn').on('click', addServer);
    $frontends.find('.btn').on('click', addFrontend);
    $datamines.find('.btn').on('click', addDatamine);
    $options.on('click', '.fa-times-circle', removeType);
}

$(document).ready(init);
