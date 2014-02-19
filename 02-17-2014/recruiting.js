var spamJob = (function(){
    var dom = {
        container: $('#message'),
        btn: $('#new-message')
    };
    var text = {
        names: ['Jeff', '', 'Sue', 'Jane', 'Chris', 'Bob', 'Matthew', 'Rick', 'Charles', 'Kimberly'],
        greetings: ['Good morning', 'Good day', 'Hello', 'Howdy', 'Good afternoon', 'Hi friends'],
        recruiter: ['Vinkat', 'James', 'Jeff', 'Ranjameer', 'Srinkath', 'Mark', 'Ahmed', 'Wendy', 'Benjamin'],
        jobs: ['SAP consultant', 'UNIX engineer', 'Application Developer', 'LAMP Developer', 'WordPress theme developer','Oracle Developer', 'Business Analyst', 'XML Developer', 'Agile Developer', 'UI/UX Designer', 'Portal Developer', 'Sharepoint Developer', 'Front End Engineer'],
        job_word: ['gig', 'job', 'role'],
        locations: ['Vancouver, BC', 'Houston, TX', 'Seattle, WA'],
        company: ['IntelliCorp', 'Global Elite Solutions', 'NeatoCorp', 'RadSoft', 'PeopleTelecorp', 'Globalsyscom', 'Sweetr', 'Apptr', 'Appr.ly'],
        flattery: ['perfect fit', 'development ninja', 'unique candidate', 'great background', 'rockstar'],
        looking_for: ['development ninja'],
        company_buzzwords: ['fast-paced', 'innovative', 'challenging', 'growing', 'hackerspace', 'ninja team'],
        would_be: ['a great fit', 'a perfect candidate', 'a shining star', 'a ninja', 'awesome'],
        buzzwords: ['wordpress', 'azure', 'windows', 'ruby' ,'html5', 'css3', 'prototype', 'agile methodology', 'scrum', 'java', 'javascript', 'python', 'sass']
    };

    function randomMessage(event) {
        var msg = [
            randomArrayValue(text.greetings),
            randomArrayValue(text.names),
            ',<br />My name is',
            randomArrayValue(text.recruiter),
            'I am contacting you in regards to a',
            (rando(10) > 5 ? 'Required' : ''),
            randomArrayValue(text.jobs),
            randomArrayValue(text.job_word),
            'in',
            randomArrayValue(text.locations),
            '. The client',
            randomArrayValue(text.company),
            'is a',
            randomArrayValue(text.company_buzzwords),
            ',',
            randomArrayValue(text.company_buzzwords),
            ',',
            randomArrayValue(text.company_buzzwords),
            'company and is looking for a',
            randomArrayValue(text.looking_for),
            'with experience in one or all of the following:',
            randomArrayValue(text.buzzwords),
            ',',
            randomArrayValue(text.buzzwords),
            ',',
            randomArrayValue(text.buzzwords),
            ',',
            randomArrayValue(text.buzzwords),
            '. I think you would be',
            randomArrayValue(text.would_be),
            'for this role. Please contact me as soon as you can',
            'and if you aren\'t interested, please forward this to all your friends.'
        ].join(' ');
        event.preventDefault();
        dom.container.html(msg).hide().fadeIn(500);
    }

    function init() {
        dom.btn.on('click', randomMessage);
        dom.btn.click();
    }

    return {
        init: init
    };
})();

$(document).ready(spamJob.init);
