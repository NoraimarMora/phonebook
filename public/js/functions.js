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
