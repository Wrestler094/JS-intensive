const showOrdersButton = document.querySelector(".js-show-orders");
const userIdInput = document.querySelector(".js-id-input");
const root = document.querySelector(".index-root");

showOrdersButton.addEventListener("click", () => {
    if (userIdInput.value && Number.isInteger(parseInt(userIdInput.value))) {
        let waiters = fetch("/waiter", {
            method: "GET",
        });

        waiters
            .then(res => res.json())
            .then(waitersFromServer => {
                if (waitersFromServer.length) {
                    let waiter = waitersFromServer.filter(person => {
                        return person.id === parseInt(userIdInput.value);
                    });

                    return waiter[0];
                }
            })
            .then(waiter => {
                if (waiter && waiter.orders) {
                    let ordersFromServer = fetch("/order/api", {
                        method: "GET",
                    });

                    ordersFromServer
                        .then(res => res.json())
                        .then(allOrders => {
                            let userOrders = allOrders.filter(order => {
                                return waiter.orders.includes(order.id);
                            })

                            let tempString = "";
                            tempString += `<h2 class="index-root__title">Order list of ${waiter.name}</h2>`;
                            tempString += `<div class="menu__container">`

                            for (let order of userOrders) {
                                console.log(order);
                                tempString += `
                                    <a class="index-root__link" href="/order/${order.id}">
                                        <ul class="index-root__list">
                                            <li>Order id: ${order.id}</li>
                                            <li>Is order active: ${order.isActive}</li>
                                            <li>Number of positions in order: ${order.items.length}</li>
                                        </ul>
                                    </a>
                                `
                            }

                            tempString += `</div>`
                            root.innerHTML = tempString;
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    } else {
        alert("Wrong input!");
    }
})