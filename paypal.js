function initPayPalButton() {
    var description = 'Don à New Vision Games';
    var amount = document.querySelector('#smart-button-container #amount');
    var paymentError = document.querySelector('#smart-button-container #payment-error');
    var elArr = [amount];

    function validate(event) {
        return !(event.value < 1);
    }

    paypal.Buttons({
        style: {
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        layout: 'vertical',
        },
        onInit: function (data, actions) {
            actions.disable();
            elArr[0].addEventListener('keyup', function (event) {
                var result = elArr.every(validate);
                if (result) {
                    actions.enable();
                    paymentError.style.display = "none";
                } else {
                    actions.disable();
                    paymentError.textContent = 'Vous ne pouvez pas donner moins de 1€.';
                    paymentError.style.display = "block";
                }
            });
        },
        onClick: function () {
            paymentError.style.display = "none";
        },
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{"amount":{"currency_code":"EUR","value":amount.value}}]
            });
        },
        onCancel: function(data, actions) {
            paymentError.textContent = 'Le paiement a été annulé !';
            paymentError.style.display = "block";
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                document.getElementById('smart-button-container').style.display = 'none';
                document.querySelector('.payment-success p').innerHTML = `Merci <strong>${details.payer.name.given_name}</strong>, vous venez de faire un don à <strong>New Vision Games</strong> d'un montant de <strong>${details.purchase_units[0].amount.value}€</strong>. Vous recevrez bientôt un mail de PayPal confirmant votre achat.`;
                document.querySelector('.payment-success').style.display = 'block';
            });
        }
    }).render('#paypal-button-container');
}

initPayPalButton();