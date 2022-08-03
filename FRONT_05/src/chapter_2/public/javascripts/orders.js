const waiterId = document.querySelector('#waiter').value;
const order = document.querySelector('#menuItem');
const cancelButton = document.querySelector('.js-cancel');
const submitButton = document.querySelector('.js-submit');

cancelButton.addEventListener('click', evt => {
    evt.preventDefault();
    console.log(evt.target);
})

submitButton.addEventListener('click', evt => {
    evt.preventDefault();
    const selectedItems = [];

    for (let option of order.options) {
        if (option.selected) {
            selectedItems.push(option.value);
        }
    }

    if (waiterId) {
        if (selectedItems.length) {
            fetch('/order', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isActive: true,
                    items: selectedItems
                })
            })
                .then(res => res.json())
                .then(res => {
                    window.location.replace(`/order/${res}`);
                })
                .catch(err => {
                    console.log(err);
                    alert("Something went wrong");
                })
        } else {
            alert("Order not chosen")
        }
    } else {
        alert("Waiter not chosen")
    }
})