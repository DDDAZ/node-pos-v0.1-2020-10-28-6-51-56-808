const console_reporter = require("jasmine/lib/reporters/console_reporter");

module.exports = function main(inputs) {
    return printReceipt(inputs);
};


function printReceipt(inputs) {

    var items = inputs.reduce(function (itemList, next) {
        JSON.stringify(itemList).includes(JSON.stringify(next.Name)) ? itemList.push() : itemList.push(next);
        return itemList;
    }, []);

    // get item count.
    items.map(item => item['count'] = inputs.map(i => i.Name == item.Name)
        .reduce((count, value) => value ? count + 1 : count + 0));

    // get item Subtotal.
    items.map(item => item['Subtotal'] = item.count * item.Price);

    // get format string for each item.
    var itemDescribe = [];
    items.map(item => itemDescribe.push(`Name: ${item.Name}, Quantity: ${item.count}${item.Unit.length == 1?'':' '+ item.Unit + 's'}, Unit price: ${item.Price.toFixed(2)} (yuan), Subtotal: ${item.Subtotal.toFixed(2)} (yuan)`));

    // get Total cost.
    var sum = items.reduce(function (currentTotal, next) {
        currentTotal += next.Subtotal;
        return currentTotal;
    }, 0);

    // get txt.
    var txt = `***<store earning no money>Receipt ***
${itemDescribe.join('\n')}
----------------------
Total: ${sum.toFixed(2)} (yuan)
**********************
`;
    return txt;
}