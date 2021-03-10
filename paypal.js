function initPayPalButton() {
    var description = 'Don à New Vision Games';
    var amount = document.querySelector('#smart-button-container #amount');
    var paymentError = document.querySelector('#smart-button-container #payment-error');
    var elArr = [amount];
    var actionsEnabled = false;
    var lang = 'fr';
    if (window.location.pathname.startsWith('/en')) {
        lang = 'en';
    }

    function validate(event) {
        return !(event.value < 1);
    }

    var text = [
        {
            fr: "Vous devez entrer un nombre.",
            en: "You must enter a number."
        },
        {
            fr: "Vous ne pouvez pas donner moins de 1€.",
            en: "You cannot donate less than 1€."
        },
        {
            fr: "Le paiement a été annulé !",
            en: "The payment has been cancelled !"
        },
        {
            fr: "`Merci <strong>${details.payer.name.given_name}</strong>, vous venez de faire un don à <strong>New Vision Games</strong> d'un montant de <strong>${details.purchase_units[0].amount.value}€</strong>. Vous recevrez bientôt un mail de PayPal confirmant votre achat.`",
            en: "`Thank you <strong>${details.payer.name.given_name}</strong>, you have just donated <strong>${details.purchase_units[0].amount.value}€</strong> to <strong>New Vision Games</strong>. You will soon receive an email from PayPal confirming your purchase.`"
        }
    ];

    paypal.Buttons({
        style: {
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        layout: 'vertical',
        },
        onInit: function (data, actions) {
            function enableActions(boolean) {
                if (boolean) { actions.enable(); } else { actions.disable(); }
                actionsEnabled = boolean;
            }
            enableActions(false);
            elArr[0].addEventListener('keyup', function (event) {
                var result = elArr.every(validate);
                if (result) {
                    if (isNaN(amount.value)) {
                        enableActions(false);
                        paymentError.textContent = text[0][lang];
                        paymentError.style.display = "block";
                    } else {
                        enableActions(true);
                        paymentError.style.display = "none";
                    }
                } else {
                    enableActions(false);
                    paymentError.textContent = text[1][lang];
                    paymentError.style.display = "block";
                }
            });
            document.querySelector('.load-container').style.display = 'none';
        },
        onClick: function () {
            if (actionsEnabled) {
                paymentError.style.display = "none";
            }
        },
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{"amount":{"currency_code":"EUR","value":amount.value}}]
            });
        },
        onCancel: function(data, actions) {
            paymentError.textContent = text[2][lang];
            paymentError.style.display = "block";
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                document.getElementById('smart-button-container').style.display = 'none';
                document.querySelector('.payment-success p').innerHTML = eval(text[3][lang]);
                document.querySelector('.payment-success').style.display = 'block';
            });
        }
    }).render('#paypal-button-container');
}

initPayPalButton();