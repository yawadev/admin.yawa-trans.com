"use strict";

$("#vehicule_id").change(function() {
    var id = document.getElementById("vehicule_id").value;
    $.ajax({
        url: '/subscriptions/licence',
        type: 'POST',
        cache: false,
        data: {
            vehicule_id: id
        },
        success: function(data) {
            document.getElementById('amount').value = data;
        }
    });
});

$("#payment_methode").change(function() {
    var methode = document.getElementById("payment_methode").value;
    if (methode != 'CASH') {
        var input = '';
        input += '<label class="form-label" for="payment_code">CODE ' + methode + '</label>';
        input += '<input id="payment_code" class="form-control" name="payment_code" type="text" />';
        document.getElementById('code').innerHTML = input;
    }

});

$("#fp-range").change(function() {
    var date = document.getElementById("fp-range").value;
    document.getElementById('date_fin').value = date;
    console.log(date);

});