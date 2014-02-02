var total = 0;
d3.csv('transactions.csv', function(d){
    return {
        'date': new Date(d.Date),
        'amount': +d.Amount,
        'type': d['Transaction Type']
    };
}, function(error, rows) {
    d3.selectAll('div')
    .data(rows)
    .enter()
    .append('div')
    .style('width', function(d) {
        return d.amount * 50 + 'px';
    })
    .style('color', function(d){
        return (d.type === 'debit' ? 'green' : 'red');
    })
    .text(function(d) {
        return '$' + d.amount;
    });
});
