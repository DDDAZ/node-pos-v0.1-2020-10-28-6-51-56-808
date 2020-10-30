const console_reporter = require("jasmine/lib/reporters/console_reporter");

module.exports = function main(inputs) {
    return printReceipt(inputs);
};

function printReceipt(arr) {
    // Name: Coca-Cola, Quantity: 5 bottles, Unit price: 3.00 (yuan), Subtotal: 15.00 (yuan)
    var names = [];
    var objects = [];
    var strings = [];

    for (let i = 0; i < arr.length; i++) {
        if (names.includes(arr[i].Name)) {
            continue;
        }
        names.push(arr[i].Name);
        objects.push(arr[i]);
    }

    var counts = getCount(arr, names);
    var sum = 0;
    for (let i = 0; i < names.length; i++) {
        if (objects[i].Unit != 'a') {
            item = `Name: ${names[i]}, Quantity: ${counts[i]} ${objects[i].Unit}s, Unit price: ${objects[i].Price.toFixed(2)} (yuan), Subtotal: ${(objects[i].Price * counts[i]).toFixed(2)} (yuan)`;
            sum += objects[i].Price * counts[i];
        } else {
            item = `Name: ${names[i]}, Quantity: ${counts[i]}, Unit price: ${objects[i].Price.toFixed(2)} (yuan), Subtotal: ${(objects[i].Price * counts[i]).toFixed(2)} (yuan)`;
            sum += objects[i].Price * counts[i];
        }

        strings.push(item);
    }

    var text = '***<store earning no money>Receipt ***\n' + strings.join('\n');
    text += '\n----------------------\n' + 'Total: ' + sum.toFixed(2) + ' (yuan)\n' + '**********************\n';
    return text;
}

function getCount(arr, itemNames) {
    var count = [];
    itemNames.forEach(num => {
        let itemCount = 0;
        arr.forEach(element => {
            if (element.Name == num) itemCount++;
        });
        count.push(itemCount);
    });
    return count;
}