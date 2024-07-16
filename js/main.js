
let Customers = [];
let transactions = [];

(async function () {

    let responseOfCustomers = await fetch('http://localhost:3000/customers');
    Customers = await responseOfCustomers.json()
    // console.log(Customers);

    let transaction = await fetch(`http://localhost:3000/transactions`);
    transactions = await transaction.json();

    // console.log(transactions);
    displayAllCustomers();

})();


function displayAllCustomers() {

    let customersBox = ``;

    for (const customer of Customers) {

        let TotalTransactions = 0;

        for (const trans of transactions) {

            if (trans.customer_id == customer.id) {

                TotalTransactions += trans.amount

            }

        };

        customersBox += `  <tr class="fs-5 fw-bold">

                        <td>${customer.name}</td>
                        <td>${TotalTransactions}</td>
                        <td><button CustomerId="${customer.id}" class="btn btn-outline-info py-1 px-4 fs-5 fw-bold">View</button></td>

                            </tr>  `

    };

    $('#row').html(customersBox);
    showAllCharts();

};

// ************************************ Search By Name ********************************************

function searchForCustomerByName(term) {

    let Search = "";

    for (const customer of Customers) {

        if (customer.name.toLowerCase().includes(term.toLowerCase())) {

            let TotalTransactions = 0;

            for (const trans of transactions) {

                if (trans.customer_id == customer.id) {

                    TotalTransactions += trans.amount

                }

            };

            Search += `  <tr class="fs-5 fw-bold">

                        <td>${customer.name}</td>
                        <td>${TotalTransactions}</td>
                        <td><button CustomerId="${customer.id}" class="btn btn-outline-info py-1 px-4 fs-5 fw-bold">View</button></td>

                            </tr>  `

        };

    };
    $('#row').html(Search);
    showAllCharts();

};

$("#SearchByName").on('input', () => {

    searchForCustomerByName($("#SearchByName").val());


});

// ************************************ Search By Amount As Number *****************************************

// function searchForCustomerTransaction(term) {

//     let Search = "";

//     for (const customer of Customers) {

//         let TotalTransactions = 0;

//         for (const trans of transactions) {

//             if (trans.customer_id == customer.id) {

//                 TotalTransactions += trans.amount

//             }

//         };

//         if (TotalTransactions == Number(term)) {

//             Search += `  <tr class="fs-5 fw-bold">

//                 <td>${customer.name}</td>
//                 <td>${TotalTransactions}</td>
//                 <td><button CustomerId="${customer.id}" class="btn btn-outline-info py-1 px-4 fs-5 fw-bold">View</button></td>

//                     </tr>  `
//         }


//     };

//     $('#row').html(Search);
//     showAllCharts();

// };


// $("#SearchByAmount").on('input', () => {

//     if ($("#SearchByAmount").val() != ``) {

//         searchForCustomerTransaction($("#SearchByAmount").val());

//     }
//     else {
//         displayAllCustomers()
//     }
// });


// ************************************ Search By Amount As String *****************************************

function searchForCustomerTransaction(term) {

    let Search = "";

    for (const customer of Customers) {

        let TotalTransactions = 0;

        for (const trans of transactions) {

            if (trans.customer_id == customer.id) {

                TotalTransactions += trans.amount

            }

        };

        if (TotalTransactions.toString().includes(term)) {

            Search += `  <tr class="fs-5 fw-bold">
                
                <td>${customer.name}</td>
                <td>${TotalTransactions}</td>
                <td><button CustomerId="${customer.id}" class="btn btn-outline-info py-1 px-4 fs-5 fw-bold">View</button></td>

                    </tr>  `
        }


    };

    $('#row').html(Search);
    showAllCharts();

};


$("#SearchByAmount").on('input', () => {

    searchForCustomerTransaction($("#SearchByAmount").val());

});



// **************************************** Show All Charts **************************************
function showGraph(xx, yy) {

    $('#Cahrts').html(`<canvas id="myChart"></canvas>`);
    const ctx = $("#myChart")
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xx,  // array Of Dates Of customer
            datasets: [{
                label: 'Transaction',
                data: yy,  // array Of transactions Of customer
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

};

function showAllCharts() {

    for (const btn of $("button")) {

        // console.log($(btn).attr('CustomerId'));

        $(btn).on('click', () => {

            // console.log(`wwwwwwwwwwwww`);

            let date = [];
            let Transaction = [];

            for (const trans of transactions) {

                if (trans.customer_id == $(btn).attr('CustomerId')) {

                    date.push(trans.date)
                    Transaction.push(trans.amount)
                }
            }

            showGraph(date, Transaction);

        })


    }


};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~












