$(document).ready(function () {
    $("#logout-btn").on('click', function (event) {
        event.preventDefault(); 
        $('#logout-form').submit();
    });
});

function showNotification(type, action = null) {
    let icon = '';
    let message = '';

    if (type == 'success') {
        icon = 'fa fa-check';

        switch (action) {
            case 'create':
                message = 'Creacion exitosa!';
                break;
            case 'update':
                message = 'Actualizacion exitosa!';
                break;
            case 'delete':
                message = 'Eliminacion exitosa!';
                break;
            case 'restore':
                message = 'Restauracion exitosa!';
                break;
        }
    } else if (type == 'danger') {
        icon = 'fa fa-times';
        if (action == 'login') {
            message = 'Usuario y/o Contraseña invalido';
        } else if (action == 'username') {
            message = 'Usuario ya existe!';
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
