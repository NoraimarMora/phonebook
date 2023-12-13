$(document).ready(function () {
    $("#logout-btn").on('click', function (event) {
        event.preventDefault(); 
        $('#logout-form').submit();
    });

    if ($('.login-error').length) {
        showNotification('danger', 'login');
    }

    if ($('.error').length) {
        showNotification('danger');
    }

    $('#add_email').on('click', function () {
        let pos = 1;
        if ($('.email').length) {
            let length = parseInt($('.email').length);
            pos = length + 1;
        }

        let email =
            '<tr class="email" data-pos="' + pos + '">' +
                '<td class="email">' +
                    '<div class="form-group emails">' +
                        '<input type="email" class="form-control email-input" name="email_email[]" placeholder="Email" value="" >' +
                    '</div>' +
                '</td>' +
                '<td class="label">' +
                    '<div class="form-group labels">' +
                        '<input type="text" class="form-control label-input" name="email_label[]" placeholder="Etiqueta" value="" >' +
                    '</div>' +
                '</td>' +
                '<td class="close">' +
                    '<i class="fa fa-times pull-right" onClick="deleteEmail(' + pos + ');"></i>' +
                '</td>' +
            '</tr>';

        $('tbody.emails').append(email);
    });

    $('#add_phone').on('click', function () {
        let pos = 1;
        if ($('.phone').length) {
            let length = parseInt($('.phone').length);
            pos = length + 1;
        }

        let phone =
            '<tr class="phone" data-pos="' + pos + '">' +
                '<td class="phone">' +
                    '<div class="form-group phones">' +
                        '<input type="phone" class="form-control phone-input" name="phone_number[]" placeholder="Tekefono" value="" >' +
                    '</div>' +
                '</td>' +
                '<td class="label">' +
                    '<div class="form-group labels">' +
                        '<input type="text" class="form-control label-input" name="phone_label[]" placeholder="Etiqueta" value="" >' +
                    '</div>' +
                '</td>' +
                '<td class="close">' +
                    '<i class="fa fa-times pull-right" onClick="deletePhone(' + pos + ');"></i>' +
                '</td>' +
            '</tr>';

        $('tbody.phones').append(phone);
    });
});

function showNotification(type, action = null) {
    let icon = '';
    let message = '';

    if (type == 'success') {
        icon = 'fa fa-check';

        message = 'Operacion finalizada con éxito!';        
    } else if (type == 'danger') {
        icon = 'fa fa-times';
        if (action == 'login') {
            message = 'Usuario y/o Contraseña invalido';
        } else {
            message = 'Ha ocurrido un error!';
        }
    }

    $.notify({
        icon: icon,
        message: message
    }, {
        type: type,
        timer: 8000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
}

function deleteEmail(index) {
    $('.email').remove('tr[data-pos="' + index + '"]');
}

function deletePhone(index) {
    $('.phone').remove('tr[data-pos="' + index + '"]');
}