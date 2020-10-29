const console_reporter = require("jasmine/lib/reporters/console_reporter");

module.exports = function main() {
    // console.log("Debug Info");
    // return 'Hello World!';
    //return this.input;

    return printReceipt(input);
};

var input = [{
        Barcode: 'ITEM000000',
        Name: 'Coca-Cola',
        Unit: 'bottle',
        Price: 3.00

    },
    {
        Barcode: 'ITEM000000',
        Name: 'Coca-Cola',
        Unit: 'bottle',
        Price: 3.00
    },
    {
        Barcode: 'ITEM000000',
        Name: 'Coca-Cola',
        Unit: 'bottle',
        Price: 3.00
    },
    {
        Barcode: 'ITEM000000',
        Name: 'Coca-Cola',
        Unit: 'bottle',
        Price: 3.00
    },
    {
        Barcode: 'ITEM000000',
        Name: 'Coca-Cola',
        Unit: 'bottle',
        Price: 3.00
    },
    {
        Barcode: 'ITEM000001',
        Name: 'Sprite',
        Unit: 'bottle',
        Price: 3.00
    },
    {
        Barcode: 'ITEM000001',
        Name: 'Sprite',
        Unit: 'bottle',
        Price: 3.00
    },
    {
        Barcode: 'ITEM000004',
        Name: 'battery',
        Unit: 'a',
        Price: 2.00
    }
];

function printReceipt(arr) {
    var title = '***<store earning no money>Receipt ***';
    var splitLine = '----------------------';
    // Name: Coca-Cola, Quantity: 5 bottles, Unit price: 3.00 (yuan), Subtotal: 15.00 (yuan)
    var itemNames = [];
    var objects = [];
    var strings = [];
    for (let i = 0; i < arr.length; i++) {
        if (itemNames.includes(arr[i].Name)) {
            continue;
        }
        itemNames.push(arr[i].Name);
        objects.push(arr[i]);
    }

    var itemCounts = getCount(arr, itemNames);
    var sum = 0;
    for (let i = 0; i < itemNames.length; i++) {
        let stringLine;
        if (objects[i].Unit != 'a') {
            stringLine = 'Name: ' + itemNames[i] + ', Quantity: ' + itemCounts[i] + ' ' +
                objects[i].Unit + 's' + ', Unit price: ' + objects[i].Price.toFixed(2) + ' (yuan), Subtotal: ' +
                (objects[i].Price * itemCounts[i]).toFixed(2) + ' (yuan)';
            sum += objects[i].Price * itemCounts[i];
        } else {
            stringLine = 'Name: ' + itemNames[i][0].toUpperCase() + itemNames[i].substr(1)  + ', Quantity: ' + itemCounts[i] +
                ', Unit price: ' + objects[i].Price.toFixed(2) + ' (yuan), Subtotal: ' +
                (objects[i].Price * itemCounts[i]).toFixed(2) + ' (yuan)';
            sum += objects[i].Price * itemCounts[i];
        }

        console.log(stringLine);
        strings.push(stringLine);
    }
    console.log(strings);
    var s;
    s = '***<store earning no money>Receipt ***\n' + strings.join('\n');
    s = s + '\n----------------------\n' +
        'Total: ' + sum.toFixed(2) +' (yuan)\n' +
        '**********************\n';
    // console.log(s);
    return s;
    // strings.forEach(string => {
    //     s = s + string + '\n';
    // });
    // console.log(title + '\n' + s + splitLine + '\n' + 'Total: '+ sum.toFixed(2) +' (yuan)\n'
    // + '**********************\n');
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

function getPrices(arr, itemNames) {
    var prices = [];
    for (let i = 0; i < itemNames.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].Name == i) {
                prices.push(arr[j].price);
                break;
            }
        }
    }
    return prices;
}