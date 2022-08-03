const url = window.location.href;
const tmpArr = url.split('/order/');
const id = tmpArr[tmpArr.length - 1];
const title = document.querySelector('h1');
const orderButton = document.querySelector(".order-button");

orderButton.addEventListener("click", () => {
    fetch(`/order/${id}`, {
        method: 'DELETE',
    })
        .then(res => {
            if (res) {
                title.textContent = title.textContent.replace("Open", "Closed");
                orderButton.disabled = true;
            }
        })
        .catch(err => console.log(err));
})