$(document).ready(function () {

    if ($("#chartPreferences").length) {
        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };
    
        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };
    
        Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
    
        Chartist.Pie('#chartPreferences', {
            labels: ['53%', '47%'],
            series: [53, 47]
        });   
    }

    $('#logout-btn').on('click', function (event) {
        event.preventDefault();
        $('#logout-form').submit();
    });

    $('#move-invoice').on('click', function (event) {
        event.preventDefault();
        $('#move-invoice-form').submit();
    });

    $('#shipping-invoice').on('click', function (event) {
        event.preventDefault();
        $('#shipping-invoice-form').submit();
    });

    if ($('.login-error').length) {
        showNotification('danger', 'login');
    }

    if ($('.server-error').length) {
        showNotification('danger');
    }

    if ($('.email-error').length) {
        showNotification('danger', 'email');
    }

    if ($('.agency-error').length ||
        $('.client-error').length ||
        $('.country-error').length ||
        $('.move-error').length ||
        $('.receiver-error').length ||
        $('.scale-error').length ||
        $('.shipping-error').length ||
        $('.user-error').length ||
        $('.user-role-error').length ||
        $('.profile-error').length) {
        showNotification('danger');
    }

    if ($('.agency-create-success').length ||
        $('.client-create-success').length ||
        $('.country-create-success').length ||
        $('.move-create-success').length ||
        $('.receiver-create-success').length ||
        $('.scale-create-success').length ||
        $('.shipping-create-success').length ||
        $('.user-create-success').length ||
        $('.user-role-create-success').length) {
        showNotification('success', 'create');
    }

    if ($('.agency-update-success').length ||
        $('.client-update-success').length ||
        $('.country-update-success').length ||
        $('.move-update-success').length ||
        $('.receiver-update-success').length ||
        $('.scale-update-success').length ||
        $('.shipping-update-success').length ||
        $('.user-update-success').length ||
        $('.user-role-update-success').length ||
        $('.profile-update-success').length) {
        showNotification('success', 'update');
    }

    if ($('.agency-delete-success').length ||
        $('.client-delete-success').length ||
        $('.country-delete-success').length ||
        $('.move-delete-success').length ||
        $('.receiver-delete-success').length ||
        $('.scale-delete-success').length ||
        $('.shipping-delete-success').length ||
        $('.user-delete-success').length ||
        $('.user-role-delete-success').length) {
        showNotification('success', 'delete');
    }

    if ($('.move-error .article').length || $('.shipping-error .box').length) {
        $('#save').attr('hidden', false);
        if ($('#calc_total_move').length) {
            $('#calc_total_move').attr('hidden', true);
        }
        if ($('#calc_total_shipping').length) {
            $('#calc_total_shipping').attr('hidden', true);
        }
        $('#client-form').attr('hidden', false);
        $('#receiver-form').attr('hidden', false);
    }

    if ($('.country-error .zone').length) {
        $('#save').attr('hidden', false);
    }

    if ($('input[name="date"]').length) {
        let date = new Date().toISOString();
        $('input[name="date"]').val(date.split('T')[0]);
    }

    $('input[name="phone"]').on('change', function () {
        let phone = $(this).val();
        console.log(phone);
        $(this).val(phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"));
    });

    $('input[name="sender_phone"]').on('change', function () {
        let phone = $(this).val();
        $(this).val(phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"));
    });

    $('input[name="receiver_phone"]').on('change', function () {
        let phone = $(this).val();
        $(this).val(phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"));
    });
    
    $('input[name="insurance_value"]').on('change', function () {
        if ($('.article').length) {
            $('#calc_total_move').attr('hidden', false);
            $('#save').attr('hidden', true);
        }

        let insurance_value = parseFloat($('input[name="insurance_value"]').val());
        let insurance_percent = parseFloat($('input[name="insurance_percent"]').val());

        if (!isNaN(insurance_percent) && !isNaN(insurance_value)) {
            let insurance_total = insurance_value * insurance_percent / 100;
            $('input[name="insurance_total"]').val(Math.round(insurance_total * 100) / 100);
        }
    });

    $('input[name="insurance_percent"]').on('change', function () {
        if ($('.article').length) {
            $('#calc_total_move').attr('hidden', false);
            $('#save').attr('hidden', true);
        }

        let insurance_value = parseFloat($('input[name="insurance_value"]').val());
        let insurance_percent = parseFloat($('input[name="insurance_percent"]').val());

        if (!isNaN(insurance_percent) && !isNaN(insurance_value)) {
            let insurance_total = insurance_value * insurance_percent / 100;
            $('input[name="insurance_total"]').val(Math.round(insurance_total * 100) / 100);
        }
    });

    $('input[name="feet_value"]').on('change', function () {
        if ($('.article').length) {
            $('#calc_total_move').attr('hidden', false);
            $('#save').attr('hidden', true);
        }
    });

    $('#filter').on('change', function () {
        if ($('#filter').val() == 'rango') {
            $('.section').removeClass('filter-section');
            $('.section').addClass('filter-div');
            $('.range').attr('hidden', false);
        } else {
            $('.section').addClass('filter-section');
            $('.section').removeClass('filter-div');
            $('.range').attr('hidden', true);

            // filtrado
            window.location.replace(app_url + $('#filter').attr('data-entity') + '?filter=' + $('#filter').val());
        }
    });

    if ($('#filter').length && $('#filter').val() == 'rango') {
        $('.section').removeClass('filter-section');
        $('.section').addClass('filter-div');
        $('.range').attr('hidden', false);
    }

    $('#send_filter_range').on('click', function () {
        if ($('input[name="dateIni"]').val() != "" && $('input[name="dateFin"]').val() != "") {
            // filtrado
            window.location.replace(app_url + $('#filter').attr('data-entity') + '?filter=' + $('#filter').val() + '&dateIni=' + $('input[name="dateIni"]').val() + '&dateFin=' + $('input[name="dateFin"]').val());
        }
    });

    $('#search-btn').on('click', function () {
        $('.clients-found').empty();
        $('.receivers-found').empty();

        let search = $('#search-client').val();
        let data = {
            search: search,
            agency: client_agency,
            superAdmin: parseInt(super_admin)
        };

        // Ajax request
        $.ajax({
            type: 'post',
            data: data,
            dataType: 'json',
            url: api_url + '/clients/search',
            success: function (response) {
                response.clients.map(client => {
                    let clientItem = 
                    '<tr class="client-data" data-client="' + client._id + '">' +
                        '<td class="client-radio text-center">' +
                            '<div class="form-check">' +
                                '<input type="radio" class="sender" name="sender" value="' + client._id + '" onClick="selectClient(\'' + client._id + '\')">' +
                            '</div>' +
                        '</td>' +
                        '<td class="client-list">' +
                            '<span>' + client.name + ' ' + client.lastName + ' </span>' +
                            '<input type="hidden" class="sender-name" value="' + client.name + '" />' +
                            '<input type="hidden" class="sender-lastName" value="' + client.lastName + '" />' +
                            '<i class="fa fa-flag ' + client.flag + '-flag"></i>' +
                            '<br>' +
                            '<span>' + (client.email == '' ? 'Sin correo' : client.email) + '</span><br>' +
                            '<input type="hidden" class="sender-email" value="' + client.email + '" />' +
                            '<span>' + client.phone + '</span><br>' +
                            '<input type="hidden" class="sender-phone" value="' + client.phone + '" />' +
                            '<span>' + (client.address == '' || client.address == null ? 'Sin direccion' : client.address) + '</span>' +
                            '<input type="hidden" class="sender-address" value="' + client.address + '" />' +
                            '<input type="hidden" class="sender-state" value="' + client.state + '" />' +
                            '<input type="hidden" class="sender-city" value="' + client.city + '" />' +
                            '<input type="hidden" class="sender-zip" value="' + client.zip + '" />' +
                            '<input type="hidden" class="sender-agency-id" value="' + client.agency._id + '" />' +
                            '<input type="hidden" class="sender-agency-code" value="' + client.agency.code + '" />' +
                            '</td>' +
                    '</tr>';

                    $('.clients-found').append(clientItem);

                    client.receivers.map(receiver => {
                        let receiverItem = 
                        '<tr class="receiver-data" data-receiver="' + receiver._id + '" data-client="' + client._id + '" onClick="selectReceiver(\'' + receiver._id + '\')" hidden>' +
                            '<td class="client-radio text-center">' +
                                '<div class="form-check">' +
                                    '<input type="radio" class="receiver" name="receiver" value="' + receiver._id + '">' +
                                '</div>' +
                            '</td>' +
                            '<td class="client-list">' +
                                '<span>' + receiver.name + ' ' + receiver.lastName + ' </span><br>' +
                                '<input type="hidden" class="receiver-name" value="' + receiver.name + '" />' +
                                '<input type="hidden" class="receiver-lastName" value="' + receiver.lastName + '" />' +
                                '<span>' + (receiver.dni == '' ? 'Sin cedula' : receiver.dn) + ' </span><br>' +
                                '<input type="hidden" class="receiver-dni" value="' + receiver.dni + '" />' +
                                '<span>' + (receiver.email == '' ? 'Sin correo' : receiver.email) + '</span><br>' +
                                '<input type="hidden" class="receiver-email" value="' + receiver.email + '" />' +
                                '<span>' + receiver.phone + '</span><br>' +
                                '<input type="hidden" class="receiver-phone" value="' + receiver.phone + '" />' +
                                '<span>' + (receiver.address == '' || receiver.address == null ? 'Sin direccion' : receiver.address) + '</span>' +
                                '<input type="hidden" class="receiver-address" value="' + receiver.address + '" />' +
                                '<input type="hidden" class="receiver-state" value="' + receiver.state + '" />' +
                                '<input type="hidden" class="receiver-city" value="' + receiver.city + '" />' +
                            '</td>' +
                        '</tr>';

                        $('.receivers-found').append(receiverItem);
                    });
                });
            },
            error: function () {
            }
        });
    });

    $('#search-client-receiver-btn').on('click', function () {
        let search = $('#search-client-receiver').val();
        let data = {
            search: search,
            agency: client_agency,
            superAdmin: parseInt(super_admin)
        };

        $.ajax({
            type: 'post',
            data: data,
            dataType: 'json',
            url: api_url + '/clients/search',
            success: function (response) {
                response.clients.map(client => {
                    let clientItem = 
                    '<tr class="client-data" data-client="' + client._id + '">' +
                        '<td class="client-radio text-center">' +
                            '<div class="form-check">' +
                                '<input type="radio" class="client" name="client" value="' + client._id + '">' +
                            '</div>' +
                        '</td>' +
                        '<td class="client-list">' +
                            '<span>' + client.name + ' ' + client.lastName + ' </span>' +
                            '<input type="hidden" class="sender-name" value="' + client.name + '" />' +
                            '<input type="hidden" class="sender-lastName" value="' + client.lastName + '" />' +
                            '<i class="fa fa-flag ' + client.flag + '-flag"></i>' +
                            '<br>' +
                            '<span>' + (client.email == '' ? 'Sin correo' : client.email) + '</span><br>' +
                            '<input type="hidden" class="sender-email" value="' + client.email + '" />' +
                            '<span>' + client.phone + '</span><br>' +
                            '<input type="hidden" class="sender-phone" value="' + client.phone + '" />' +
                            '<span>' + (client.address == '' || client.address == null ? 'Sin direccion' : client.address) + '</span>' +
                            '<input type="hidden" class="sender-address" value="' + client.address + '" />' +
                            '<input type="hidden" class="sender-state" value="' + client.state + '" />' +
                            '<input type="hidden" class="sender-city" value="' + client.city + '" />' +
                            '<input type="hidden" class="sender-agency-id" value="' + client.agency._id + '" />' +
                            '<input type="hidden" class="sender-agency-code" value="' + client.agency.code + '" />' +
                        '</td>' +
                    '</tr>';

                    $('.clients-receiver-found').append(clientItem);

                });
            },
            error: function () {
            }
        });
    });

    if ($('#flag').length && $('#flag').val() != 'green') {
        $('#motive').attr('hidden', false);
    }

    $('#flag').on('change', function () {
        if ($('#flag').val() == 'green') {
            $('#motive').attr('hidden', true);
        } else {
            $('#motive').attr('hidden', false);
        }
    });

    $('input[name="initialBalance"]').on('change', function () {
        let initialBalance = parseFloat($('input[name="initialBalance"]').val());
        let totalMove = parseFloat($('input[name="amountOwed"]').attr('data-total'));

        if (!isNaN(initialBalance) && !isNaN(totalMove)) {
            let amountOwed = totalMove - initialBalance;
            $('input[name="amountOwed"]').val(amountOwed);
        }
    });

    $('#move_agency').on('change', function () {
        $('input[name="agency_id"]').val($('#move_agency').val());
        $('input[name="agency_code"]').val($('#move_agency').attr('data-code'));
    });

    $('#new-password').on('change', function () {
        if ($('#new-password').val() != '') {
            $('.confirm-password').attr('hidden', false);
            $('#save').attr('hidden', true);
        } else {
            $('#save').attr('hidden', false);
            $('.confirm-password').attr('hidden', true);
        }
    });

    $('#confirm-password').on('change', function () {
        if ($('#new-password').val() != $('#confirm-password').val()) {
            $('#save').attr('hidden', true);
            $('#confirm-password').css('border-color', '#DC3545');
        } else {
            $('#save').attr('hidden', false);
            $('#confirm-password').css('border-color', 'rgba(0,0,0,.15)');
        }
    });

    $('#new-client').on('click', function () {
        $('#clients').attr('hidden', true);
        $('#client-form').attr('hidden', false);
        $('#update-client').attr('hidden', true);
        $('#receivers').attr('hidden', true);
        $('.agency-row').attr('hidden', false);
        $('#receiver-form').attr('hidden', false);
        $('.receiver-data').attr('hidden', true);
        $('#select-receiver').attr('hidden', true);
        
        // CLIENT FORM
        $('#client-form input').val("");
        $('#client-form textarea').val("");
        
        // RECEIVER FORM
        $('#receiver-form input').val("");
        $('#receiver-form textarea').val("");
    });

    $('#select-client').on('click', function () {
        $('#clients').attr('hidden', false);
        $('#client-form').attr('hidden', true);
        $('#update-client').attr('hidden', true);
        $('#receivers').attr('hidden', false);
        $('#receiver-form').attr('hidden', true);
        $('.agency-row').attr('hidden', true);
    });

    $('#update-client').on('click', function () {
        let client = {
            id: $('input[name="sender_id"]').val(),
            name: $('input[name="sender_name"]').val(),
            lastName: $('input[name="sender_lastName"]').val(),
            email: $('input[name="sender_email"]').val(),
            address: $('input[name="sender_address"]').val(),
            phone: $('input[name="sender_phone"]').val(),
            city: $('input[name="sender_city"]').val(),
            state: $('input[name="sender_state"]').val(),
            zip: $('input[name="sender_zip"]').val(),
            flag: null
        };

        $.ajax({
            method: 'PUT',
            data: client,
            dataType: 'json',
            url: api_url + '/client',
            success: function (response) {
                if (response.status == 200) {
                    showNotification('success', 'update');
                } else {
                    showNotification('error');    
                }
            },
            error: function () {
                showNotification('error');
            }
        });
    });

    $('#new-receiver').on('click', function () {
        $('#receivers').attr('hidden', true);
        $('#receiver-form').attr('hidden', false);
        $('#select-receiver').attr('hidden', false);
        $('#update-receiver').attr('hidden', true);
        $('#receiver-form input').val("");
        $('#receiver-form textarea').val("");
    });

    $('#select-receiver').on('click', function () {
        $('#receivers').attr('hidden', false);
        $('#receiver-form').attr('hidden', true);
        $('#update-receiver').attr('hidden', true);
        $('#select-receiver').attr('hidden', false);
    });

    $('#update-receiver').on('click', function () {
        let receiver = {
            id: $('input[name="receiver_id"]').val(),
            name: $('input[name="receiver_name"]').val(),
            lastName: $('input[name="receiver_lastName"]').val(),
            email: $('input[name="receiver_email"]').val(),
            address: $('input[name="receiver_address"]').val(),
            phone: $('input[name="receiver_phone"]').val(),
            city: $('input[name="receiver_city"]').val(),
            state: $('input[name="receiver_state"]').val(),
            dni: $('input[name="receiver_dni"]').val(),
        };

        $.ajax({
            method: 'PUT',
            data: receiver,
            dataType: 'json',
            url: api_url + '/receiver',
            success: function (response) {
                if (response.status == 200) {
                    showNotification('success', 'update');
                } else {
                    showNotification('error');    
                }
            },
            error: function () {
                showNotification('error');
            }
        });
    });

    $('.articles').on('change', '.article-quantity', function (event) {
        $('#calc_total_move').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = event.target.offsetParent.offsetParent.attributes['data-pos'].value;

        let quantity = parseInt($('.article[data-pos="' + parent_pos + '"] .article-quantity').val());
        let height = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-height').val());
        let width = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-width').val());
        let length = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-length').val());

        if (!isNaN(quantity) && !isNaN(height) && !isNaN(width) && !isNaN(length)) {
            let feets = height * width * length / 1728;
            let total_feets = feets * quantity;

            $('.article[data-pos="' + parent_pos + '"] .article-feets').val(Math.round(feets * 100) / 100);
            $('.article[data-pos="' + parent_pos + '"] .article-total-feets').val(Math.round(total_feets * 100) / 100);

            calculateTotalMoveFeets();
        }
    });

    $('.articles').on('change', '.article-height', function (event) {
        $('#calc_total_move').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = event.target.offsetParent.offsetParent.attributes['data-pos'].value;

        let quantity = parseInt($('.article[data-pos="' + parent_pos + '"] .article-quantity').val());
        let height = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-height').val());
        let width = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-width').val());
        let length = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-length').val());

        if (!isNaN(quantity) && !isNaN(height) && !isNaN(width) && !isNaN(length)) {
            let feets = height * width * length / 1728;
            let total_feets = feets * quantity;

            $('.article[data-pos="' + parent_pos + '"] .article-feets').val(Math.round(feets * 100) / 100);
            $('.article[data-pos="' + parent_pos + '"] .article-total-feets').val(Math.round(total_feets * 100) / 100);

            calculateTotalMoveFeets();
        }
    });

    $('.articles').on('change', '.article-width', function (event) {
        $('#calc_total_move').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = event.target.offsetParent.offsetParent.attributes['data-pos'].value;

        let quantity = parseInt($('.article[data-pos="' + parent_pos + '"] .article-quantity').val());
        let height = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-height').val());
        let width = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-width').val());
        let length = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-length').val());

        if (!isNaN(quantity) && !isNaN(height) && !isNaN(width) && !isNaN(length)) {
            let feets = height * width * length / 1728;
            let total_feets = feets * quantity;

            $('.article[data-pos="' + parent_pos + '"] .article-feets').val(Math.round(feets * 100) / 100);
            $('.article[data-pos="' + parent_pos + '"] .article-total-feets').val(Math.round(total_feets * 100) / 100);

            calculateTotalMoveFeets();
        }
    });

    $('.articles').on('change', '.article-length', function (event) {
        $('#calc_total_move').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = event.target.offsetParent.offsetParent.attributes['data-pos'].value;

        let quantity = parseInt($('.article[data-pos="' + parent_pos + '"] .article-quantity').val());
        let height = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-height').val());
        let width = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-width').val());
        let length = parseFloat($('.article[data-pos="' + parent_pos + '"] .article-length').val());

        if (!isNaN(quantity) && !isNaN(height) && !isNaN(width) && !isNaN(length)) {
            let feets = height * width * length / 1728;
            let total_feets = feets * quantity;

            $('.article[data-pos="' + parent_pos + '"] .article-feets').val(Math.round(feets * 100) / 100);
            $('.article[data-pos="' + parent_pos + '"] .article-total-feets').val(Math.round(total_feets * 100) / 100);

            calculateTotalMoveFeets();
        }
    });

    $('#country').on('change', function () {
        if ($('#country').val() != "") {
            $('input[name="country_initial"]').val($('#country option[value="' + $('#country').val() + '"]').data('initial'));
            $('#zone').val("");
            $('#shipping-type').val("");
            $('#option').val("-1");
            $('#save').attr('hidden', true);
            $('#calc_total_shipping').attr('hidden', true);
            $('.zones-list').attr('hidden', false);
            $('.shipping-type-list').attr('hidden', true);
            $('.zones-list .zone-option').attr('hidden', true);
            $('.zones-list .zone-option[data-country="'+ $('#country').val() + '"]').attr('hidden', false);
        } else {
            $('.zones-list').attr('hidden', true);
            $('.shipping-type-list').attr('hidden', true);
            $('.options-list').attr('hidden', true);
            $('#zone').val("");
            $('#shipping-type').val("");
            $('#option').val("-1");
            $('#save').attr('hidden', true);
            $('#calc_total_shipping').attr('hidden', true);
        }
    });

    $('#zone').on('change', function () {
        if ($('#zone').val() != "") {
            $('#option').val("-1");
            $('#save').attr('hidden', true);
            $('#calc_total_shipping').attr('hidden', true);
            $('.shipping-type-list').attr('hidden', false);
            $('.shipping-type-list .shipping-type-option').attr('hidden', true);
            $('.shipping-type-list .shipping-type-option[data-zone="'+ $('#zone').val() + '"]').attr('hidden', false);
        } else {
            $('.shipping-type-list').attr('hidden', true);
            $('.options-list').attr('hidden', true);
            $('#shipping-type').val("");
            $('#option').val("-1");
            $('#save').attr('hidden', true);
            $('#calc_total_shipping').attr('hidden', true);
        }
    });

    $('#shipping-type').on('change', function () {
        if ($('#shipping-type').val() != "") {
            $('#add_box').attr('hidden', false);
            $('.box .box-pound-value').val(0);
            $('.box .box-feet-value').val(0);
            $('.box .box-pound-feet-value').val(0);
            $('.box .box-pound-feet-total').val(0);

            let shippingType = $('#shipping-type').val().split('_')[0];

            let country = countries.find(c => {
                if ($('#country').val() == c._id) {
                    return c;
                }
            });
    
            let zone = country.zones.find(z => {
                if ($('#zone').val() == z._id) {
                    return z;
                }
            });
    
            if (shippingType == 'A') {
                $('.measurements').attr('hidden', true);
                $('.taxes').attr('hidden', false);
                $('.pounds').attr('hidden', false);
                $('.feets').attr('hidden', true);
                $('.options-list').attr('hidden', true);
                $('#option').val('-1');
                $('.box .box-measurement-height').val(0);
                $('.box .box-measurement-length').val(0);
                $('.box .box-measurement-width').val(0);

                $('.box .box-pound-number').attr('min', zone.aerial.minPounds);
                $('.box .box-pound-feet-value').val(zone.aerial.poundValue);
                $('.box .box-tax-percent').val(zone.aerial.taxPercent);
                $('.box .box-tax-value').val(zone.aerial.taxValue);
                $('.box .box-tax-total').val(zone.aerial.taxValue * zone.aerial.taxPercent / 100);
    
                $('.box .box-insurance-percent').val(zone.aerial.insurancePercent);
                $('.box .box-insurance-value').val(zone.aerial.minValue);
                if (zone.aerial.insuranceType == 'required') {
                    $('.box .box-insurance-value').attr('min', zone.aerial.minValue);
                } else {
                    $('.box .box-insurance-value').attr('min', 0);
                }
            } else if (shippingType == 'M') {
                $('.pounds').attr('hidden', true);
                $('.feets').attr('hidden', false);
                $('.measurements').attr('hidden', false);
                $('.taxes').attr('hidden', true);
                $('.box .box-tax-percent').val(0);
                $('.box .box-tax-value').val(0);
                $('.box .box-tax-total').val(0);
                $('.box .box-insurance-percent').val(zone.maritime.insurancePercent);
                $('.box .box-insurance-value').val(zone.maritime.minValue);
                if (zone.maritime.insuranceType == 'required') {
                    $('.box .box-insurance-value').attr('min', zone.maritime.minValue);
                } else {
                    $('.box .box-insurance-value').attr('min', 0);
                }

                $('.options-list').attr('hidden', false);
                $('.options-list .box-option').attr('hidden', true);
                $('.options-list .box-option[data-shipping="' + $('#shipping-type').val() + '"]').attr('hidden', false);
            } else if (shippingType == 'T') {
                $('.pounds').attr('hidden', false);
                $('.feets').attr('hidden', true);
                $('.measurements').attr('hidden', false);
                $('.taxes').attr('hidden', true);
                $('.box .box-tax-percent').val(0);
                $('.box .box-tax-value').val(0);
                $('.box .box-tax-total').val(0);
    
                $('.options-list').attr('hidden', false);
                $('.options-list .box-option').attr('hidden', true);
                $('.options-list .box-option[data-shipping="' + $('#shipping-type').val() + '"]').attr('hidden', false);
                $('.box .box-pound-number').attr('min', zone.terrestrial.minPounds);
                
                $('.box .box-insurance-percent').val(zone.terrestrial.insurancePercent);
                $('.box .box-insurance-value').val(zone.terrestrial.minValue);
                if (zone.terrestrial.insuranceType == 'required') {
                    $('.box .box-insurance-value').attr('min', zone.terrestrial.minValue);
                } else {
                    $('.box .box-insurance-value').attr('min', 0);
                }
            }
        } else {
            $('#add_box').attr('hidden', true);
            $('.options-list').attr('hidden', true);
            $('#option').val("-1");
            $('#save').attr('hidden', true);
            $('#calc_total_shipping').attr('hidden', true);
        }
    });

    /*$('#option').on('change', function () {
        if ($('#option').val() != "-1") {
            let shippingType = $('#shipping-type').val().split('_')[0];
            let country = countries.find(c => {
                if ($('#country').val() == c._id) {
                    return c;
                }
            });

            let zone = country.zones.find(z => {
                if ($('#zone').val() == z._id) {
                    return z;
                }
            });

            if (shippingType == 'M') {
                let optionSelected = $('#option').val().split('_')[0];

                let option = zone.maritime.optionsFeets[optionSelected];

                $('.box .box-feet-number').val(Math.round((option.feets / option.numBoxes) * 100) / 100);
                $('.box .box-pound-feet-value').val(option.feetValue);
                $('.box .box-pound-feet-total').val(Math.round((option.pvp / option.numBoxes) * 100) / 100);
                $('.box .box-measurement-height').val(option.height);
                $('.box .box-measurement-length').val(option.length);
                $('.box .box-measurement-width').val(option.width);
            } else if (shippingType == 'T') {
                let optionSelected = $('#option').val().split('_')[0];

                let option = zone.maritime.optionsFeets[optionSelected];
                    
                $('.box .box-pound-number').val(Math.round((option.pounds / option.numBoxes) * 100) / 100);
                $('.box .box-pound-feet-value').val(option.poundValue);
                $('.box .box-pound-feet-total').val(Math.round((option.pvp / option.numBoxes) * 100) / 100);
                $('.box .box-measurement-height').val(option.height);
                $('.box .box-measurement-length').val(option.length);
                $('.box .box-measurement-width').val(option.width);
            }
        }

        $('#add_box').attr('hidden', false);
        $('#save').attr('hidden', true);
        if ($('#calc_total_shipping').attr('hidden')) {
            $('#calc_total_shipping').attr('hidden', true);
        }
    });
*/
    $('.boxes').on('change', '.box-pound-number', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);
    
        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let shipping_type = $('#shipping-type').val().split('_')[0];
        let pound_number = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-number').val());
        let pound_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-value').val());
        
        if (!isNaN(pound_number) && !isNaN(pound_value)) {
            let pound_total = pound_number * pound_value;
            $('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val(Math.round(pound_total * 100) / 100);

            let tax_total = 0;
            if (shipping_type == 'A') {
                tax_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-total').val());

                if (isNaN(tax_total)) {
                    tax_total = 0;
                }
            }

            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total)) {
                let total_box = pound_total + tax_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-feet-number', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);
        
        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let feet_number = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-feet-number').val());
        let feet_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-value').val());
        
        if (!isNaN(feet_number) && !isNaN(feet_value)) {
            let feet_total = feet_number * feet_value;
            $('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val(Math.round(feet_total * 100) / 100);

            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total)) {
                let total_box = feet_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-pound-feet-value', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);
        
        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let shipping_type = $('#shipping-type').val().split('_')[0];
        let pound_number = 0;
        if (shipping_type == 'A' || shipping_type == 'T') {
            pound_number = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-number').val())
        } else if (shipping_type == 'M') {
            pound_number = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-feet-number').val())
        }

        let pound_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-value').val());
        
        if (!isNaN(pound_number) && !isNaN(pound_value)) {
            let pound_total = pound_number * pound_value;
            $('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val(Math.round(pound_total * 100) / 100);

            let tax_total = 0;
            if (shipping_type == 'A') {
                tax_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-total').val());

                if (isNaN(tax_total)) {
                    tax_total = 0;
                }
            }

            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total)) {
                let total_box = pound_total + tax_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-tax-percent', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let tax_percent = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-percent').val());
        let tax_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-value').val());
        
        if (!isNaN(tax_percent) && !isNaN(tax_value)) {
            let tax_total = tax_percent * tax_value / 100;
            $('.box[data-pos="' + parent_pos + '"] .box-tax-total').val(Math.round(tax_total * 100) / 100);

            let pound_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val());
            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total) && !isNaN(pound_total)) {
                let total_box = pound_total + tax_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-tax-value', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let tax_percent = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-percent').val());
        let tax_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-value').val());
        
        if (!isNaN(tax_percent) && !isNaN(tax_value)) {
            let tax_total = tax_percent * tax_value / 100;
            $('.box[data-pos="' + parent_pos + '"] .box-tax-total').val(Math.round(tax_total * 100) / 100);

            let pound_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val());
            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total) && !isNaN(pound_total)) {
                let total_box = pound_total + tax_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-measurement-height', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let shipping_type = $('#shipping-type').val().split('_')[0];
        let height = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-measurement-height').val());
        let length = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-measurement-length').val());
        let width = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-measurement-width').val());
        
        if (!isNaN(height) && !isNaN(length) && !isNaN(width)) {
            let pound_number = 0;

            if (shipping_type == 'M') {
                pound_number = height * length * width / 1728;
                $('.box[data-pos="' + parent_pos + '"] .box-feet-number').val(Math.round(pound_number * 100) / 100);
            } else if (shipping_type == 'T') {
                pound_number = height * length * width / 166;
                $('.box[data-pos="' + parent_pos + '"] .box-pound-number').val(Math.round(pound_number * 100) / 100);
            }

            let pound_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-value').val());
            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total) && !isNaN(pound_value)) {
                let pound_total = pound_value * pound_number;
                let total_box = pound_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val(Math.round(pound_total * 100) / 100)
                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-measurement-length', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let shipping_type = $('#shipping-type').val().split('_')[0];
        let height = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-measurement-height').val());
        let length = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-measurement-length').val());
        let width = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-measurement-width').val());
        
        if (!isNaN(height) && !isNaN(length) && !isNaN(width)) {
            let pound_number = 0;

            if (shipping_type == 'M') {
                pound_number = height * length * width / 1728;
                $('.box[data-pos="' + parent_pos + '"] .box-feet-number').val(Math.round(pound_number * 100) / 100);
            } else if (shipping_type == 'T') {
                pound_number = height * length * width / 166;
                $('.box[data-pos="' + parent_pos + '"] .box-pound-number').val(Math.round(pound_number * 100) / 100);
            }

            let pound_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-value').val());
            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total) && !isNaN(pound_value)) {
                let pound_total = pound_value * pound_number;
                let total_box = pound_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val(Math.round(pound_total * 100) / 100)
                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-measurement-width', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let shipping_type = $('#shipping-type').val().split('_')[0];
        let height = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-measurement-height').val());
        let length = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-measurement-length').val());
        let width = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-measurement-width').val());
        
        if (!isNaN(height) && !isNaN(length) && !isNaN(width)) {
            let pound_number = 0;

            if (shipping_type == 'M') {
                pound_number = height * length * width / 1728;
                $('.box[data-pos="' + parent_pos + '"] .box-feet-number').val(Math.round(pound_number * 100) / 100);
            } else if (shipping_type == 'T') {
                pound_number = height * length * width / 166;
                $('.box[data-pos="' + parent_pos + '"] .box-pound-number').val(Math.round(pound_number * 100) / 100);
            }

            let pound_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-value').val());
            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total) && !isNaN(pound_value)) {
                let pound_total = pound_value * pound_number;
                let total_box = pound_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val(Math.round(pound_total * 100) / 100)
                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-insurance-percent', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let shipping_type = $('#shipping-type').val().split('_')[0];
        let insurance_percent = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-percent').val());
        let insurance_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-value').val());
        
        if (!isNaN(insurance_percent) && !isNaN(insurance_value)) {
            let insurance_total = insurance_percent * insurance_value / 100;
            $('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val(Math.round(insurance_total * 100) / 100);

            let tax_total = 0;
            if (shipping_type == 'A') {
                tax_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-total').val());

                if (isNaN(tax_total)) {
                    tax_total = 0;
                }
            }

            let pound_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total)) {
                let total_box = pound_total + tax_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-insurance-value', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let shipping_type = $('#shipping-type').val().split('_')[0];
        let insurance_percent = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-percent').val());
        let insurance_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-value').val());
        
        if (!isNaN(insurance_percent) && !isNaN(insurance_value)) {
            let insurance_total = insurance_percent * insurance_value / 100;
            $('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val(Math.round(insurance_total * 100) / 100);

            let tax_total = 0;
            if (shipping_type == 'A') {
                tax_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-total').val());

                if (isNaN(tax_total)) {
                    tax_total = 0;
                }
            }

            let pound_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val());
            let other_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-total').val());

            if (!isNaN(insurance_total) && !isNaN(other_total)) {
                let total_box = pound_total + tax_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-other-box', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let shipping_type = $('#shipping-type').val().split('_')[0];
        let box_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-box').val());
        let pick_up_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-pick-up').val());
        
        if (!isNaN(box_value) && !isNaN(pick_up_value)) {
            let other_total = box_value + pick_up_value;
            $('.box[data-pos="' + parent_pos + '"] .box-other-total').val(Math.round(other_total * 100) / 100);

            let tax_total = 0;
            if (shipping_type == 'A') {
                tax_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-total').val());

                if (isNaN(tax_total)) {
                    tax_total = 0;
                }
            }

            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let pound_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val());

            if (!isNaN(insurance_total) && !isNaN(pound_total)) {
                let total_box = pound_total + tax_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('.boxes').on('change', '.box-other-pick-up', function (event) {
        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let parent_pos = $(this).parent().parent().parent().data('pos');
        
        let shipping_type = $('#shipping-type').val().split('_')[0];
        let box_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-box').val());
        let pick_up_value = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-other-pick-up').val());
        
        if (!isNaN(box_value) && !isNaN(pick_up_value)) {
            let other_total = box_value + pick_up_value;
            $('.box[data-pos="' + parent_pos + '"] .box-other-total').val(Math.round(other_total * 100) / 100);

            let tax_total = 0;
            if (shipping_type == 'A') {
                tax_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-tax-total').val());

                if (isNaN(tax_total)) {
                    tax_total = 0;
                }
            }

            let insurance_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-insurance-total').val());
            let pound_total = parseFloat($('.box[data-pos="' + parent_pos + '"] .box-pound-feet-total').val());

            if (!isNaN(insurance_total) && !isNaN(pound_total)) {
                let total_box = pound_total + tax_total + insurance_total + other_total;

                $('.box[data-pos="' + parent_pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + parent_pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
            }
        }
    });

    $('#calc_total_move').on('click', function () {
        let total_move = 0;
        let amount = 0;
        let insurance_total = parseFloat($('input[name="insurance_total"]').val());
        let others = parseFloat($('input[name="others"]').val());

        if (isNaN(others)) {
            others = 0;
            $('input[name="others"]').val(0);
        }

        /*if ($('.agency-row').attr('hidden')) {
            $('input[name="agency_id"]').val($('#move_agency').val());
            $('input[name="agency_code"]').val($('#move_agency').attr('data-code'));
        }*/

        calculateTotalMoveFeets();

        let total_feets = parseFloat($('input[name="total_feets"]').val());

        if (!isNaN(insurance_total) && !isNaN(others) && !isNaN(total_feets)) {
            // Ajax para hallar scale amount
            $.ajax({
                type: 'get',
                data: {feets: total_feets, agency: $('input[name="agency_id"]').val()},
                dataType: 'json',
                url: api_url + '/scale/feets/' + total_feets,
                success: function (response) {
                    $('input[name="feet_value"]').val(response.scale.amount);
                    amount = total_feets * parseFloat(response.scale.amount);
                    total_move = insurance_total + others + amount;

                    $('input[name="total_move"]').val(Math.round(total_move * 100) / 100);
                },
                error: function () {
                    total_move = insurance_total + others + amount;

                    $('input[name="total_move"]').val(Math.round(total_move * 100) / 100);
                }
            });
        }

        $('#calc_total_move').attr('hidden', true);
        $('#save').attr('hidden', false);
    });

    $('#calc_total_shipping').on('click', function () {
        let total_shipping = 0;
        let boxes = $('.box');

        for (let i = 0; i < boxes.length; i++) {
            let pos = boxes[i].attributes['data-pos'].value;
            let total_box = calculateTotalBox(pos);
    
            if (!isNaN(total_box)) {
                $('.box[data-pos="' + pos + '"] .box-total-label').text("$" + Math.round(total_box * 100) / 100);
                $('.box[data-pos="' + pos + '"] .box-total').val(Math.round(total_box * 100) / 100);
                total_shipping += total_box;
            }
        }

        $('input[name="total_shipping"]').val(Math.round(total_shipping * 100) / 100);
        $('#calc_total_shipping').attr('hidden', true);
        $('#save').attr('hidden', false);
    });

    $('.zones').on('change', '.maritime-options .maritime-opt-num-boxes', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-width').val());
        let feet_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feet-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(feet_value)) {
            let feets = height * length * width / 1728;
            let total_feets = feets * num_boxes;
            let pvp = total_feets * feet_value;

            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feets').val(Math.round(total_feets * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.maritime-options .maritime-opt-height', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-width').val());
        let feet_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feet-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(feet_value)) {
            let feets = height * length * width / 1728;
            let total_feets = feets * num_boxes;
            let pvp = total_feets * feet_value;

            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feets').val(Math.round(total_feets * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.maritime-options .maritime-opt-length', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-width').val());
        let feet_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feet-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(feet_value)) {
            let feets = height * length * width / 1728;
            let total_feets = feets * num_boxes;
            let pvp = total_feets * feet_value;

            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feets').val(Math.round(total_feets * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.maritime-options .maritime-opt-width', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-width').val());
        let feet_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feet-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(feet_value)) {
            let feets = height * length * width / 1728;
            let total_feets = feets * num_boxes;
            let pvp = total_feets * feet_value;

            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feets').val(Math.round(total_feets * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.maritime-options .maritime-opt-feet-value', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-width').val());
        let feet_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feet-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(feet_value)) {
            let feets = height * length * width / 1728;
            let total_feets = feets * num_boxes;
            let pvp = total_feets * feet_value;

            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-feets').val(Math.round(total_feets * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .maritime-options .option[data-pos="' + option_pos + '"] .maritime-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.terrestrial-options .terrestrial-opt-num-boxes', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-width').val());
        let pound_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pound-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(pound_value)) {
            let pounds = height * length * width / 166;
            let total_pounds = pounds * num_boxes;
            let pvp = total_pounds * pound_value;

            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pounds').val(Math.round(total_pounds * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.terrestrial-options .terrestrial-opt-height', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-width').val());
        let pound_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pound-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(pound_value)) {
            let pounds = height * length * width / 166;
            let total_pounds = pounds * num_boxes;
            let pvp = total_pounds * pound_value;

            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pounds').val(Math.round(total_pounds * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.terrestrial-options .terrestrial-opt-length', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-width').val());
        let pound_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pound-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(pound_value)) {
            let pounds = height * length * width / 166;
            let total_pounds = pounds * num_boxes;
            let pvp = total_pounds * pound_value;

            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pounds').val(Math.round(total_pounds * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.terrestrial-options .terrestrial-opt-width', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-width').val());
        let pound_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pound-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(pound_value)) {
            let pounds = height * length * width / 166;
            let total_pounds = pounds * num_boxes;
            let pvp = total_pounds * pound_value;

            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pounds').val(Math.round(total_pounds * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.terrestrial-options .terrestrial-opt-pound-value', function (event) {
        let option_pos = event.target.parentNode.offsetParent.parentNode.attributes['data-pos'].value;
        let parent_pos = event.target.offsetParent.offsetParent.offsetParent.offsetParent.attributes['data-pos'].value;
        
        let num_boxes = parseInt($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-num-boxes').val());
        let height = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-height').val());
        let length = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-length').val());
        let width = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-width').val());
        let pound_value = parseFloat($('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pound-value').val());

        if (!isNaN(num_boxes) && !isNaN(height) && !isNaN(length) && !isNaN(width) && !isNaN(pound_value)) {
            let pounds = height * length * width / 166;
            let total_pounds = pounds * num_boxes;
            let pvp = total_pounds * pound_value;

            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pounds').val(Math.round(total_pounds * 100) / 100);
            $('.zone[data-pos="' + parent_pos + '"] .terrestrial-options .option[data-pos="' + option_pos + '"] .terrestrial-opt-pvp').val(Math.round(pvp * 100) / 100);
        }
    });

    $('.zones').on('change', '.zone .aerial_required_insurance', function (event) {
        let parent_pos = event.target.offsetParent.offsetParent.attributes['data-pos'].value;

        if ($('.zone[data-pos="' + parent_pos + '"] .aerial_required_insurance').val() == '0') {
            $('.zone[data-pos="' + parent_pos + '"] .aerial_optional_insurance').attr('readonly', false);
        } else {
            $('.zone[data-pos="' + parent_pos + '"] .aerial_optional_insurance').attr('readonly', true);
        }
    });

    $('.zones').on('change', '.zone .aerial_optional_insurance', function (event) {
        let parent_pos = event.target.offsetParent.offsetParent.attributes['data-pos'].value;

        if ($('.zone[data-pos="' + parent_pos + '"] .aerial_optional_insurance').val() == '0') {
            $('.zone[data-pos="' + parent_pos + '"] .aerial_required_insurance').attr('readonly', false);
        } else {
            $('.zone[data-pos="' + parent_pos + '"] .aerial_required_insurance').attr('readonly', true);
        }
    });

    $('#add_article').on('click', function () {
        let pos = 1;

        $('#calc_total_move').attr('hidden', false);

        if ($('.article').length) {
            let length = parseInt($('.article').length);
            pos = length + 1;
        }

        let article = 
        '<div class="card article" data-pos="' + pos + '">' +
            '<div class="card-header">' +
                '<i class="fa fa-times pull-right" onClick="deleteArticle(' + pos + ');"></i>' +
                '<h4 class="card-title">Articulo #' + pos + '</h4>' +
            '</div>' +
            '<div class="card-body form">' +
                '<div class="row">' +
                    '<div class="col-md-12">' +
                        '<div class="form-group">' +
                            '<label>Descripcion</label>' +
                            '<textarea rows="4" cols="80" class="form-control article-description" name="article_description[]" placeholder="Descripcion..." required></textarea>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-6 pr-1">' +
                        '<div class="form-group">' +
                            '<label>Cantidad</label>' +
                            '<input type="number" class="form-control article-quantity" name="article_quantity[]" placeholder="Cantidad" value="0" min="0" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-6 pl-1">' +
                        '<div class="form-group">' +
                            '<label>Alto</label>' +
                            '<input type="number" step="0.01" class="form-control article-height" name="article_height[]" placeholder="Alto" value="0" min="0" required>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-6 pr-1">' +
                        '<div class="form-group">' +
                            '<label>Ancho</label>' +
                            '<input type="number" step="0.01" class="form-control article-width" name="article_width[]" placeholder="Ancho" value="0" min="0" required>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-6 pl-1">' +
                        '<div class="form-group">' +
                            '<label>Largo</label>' +
                            '<input type="number" step="0.01" class="form-control article-length" name="article_length[]" placeholder="Largo" value="0" min="0" required>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-6 pr-1">' +
                        '<div class="form-group">' +
                            '<label>Pies Cubicos</label>' +
                            '<input type="number" step="0.01" class="form-control article-feets" name="article_feets[]" value="0" readonly>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-6 pl-1">' +
                        '<div class="form-group">' +
                            '<label>Total Pies Cubicos</label>' +
                            '<input type="number" step="0.01" class="form-control article-total-feets" name="article_total_feets[]" value="0" readonly>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

        $('.articles').append(article);
    });

    $('#add_box').on('click', function () {
        let pos = 1;

        $('#calc_total_shipping').attr('hidden', false);
        $('#save').attr('hidden', true);

        let shippingType = $('#shipping-type').val().split('_')[0];
        let country = countries.find(c => {
            if ($('#country').val() == c._id) {
                return c;
            }
        });

        let zone = country.zones.find(z => {
            if ($('#zone').val() == z._id) {
                return z;
            }
        });

        if ($('.box').length) {
            let length = parseInt($('.box').length);
            pos = length + 1;
        }

        let numBoxes = 1;
        let option = {};
        if (shippingType == 'M') {
            if ($('#option').val() != '-1') {
                let optionSelected = $('#option').val().split('_')[0];

                option = zone.maritime.optionsFeets[optionSelected];
                numBoxes = option.numBoxes;
            } else {
                option = {
                    numBoxes: 1,
                    feets: 0,
                    feetValue: 0,
                    pvp: 0,
                    length: 0,
                    height: 0,
                    width: 0
                };
            }
        } else if (shippingType == 'T') {
            if ($('#option').val() != '-1') {
                let optionSelected = $('#option').val().split('_')[0];

                option = zone.terrestrial.optionsFeets[optionSelected];
                numBoxes = option.numBoxes;
            } else {
                option = {
                    numBoxes: 1,
                    pounds: 0,
                    poundValue: zone.terrestrial.poundValue,
                    pvp: 0,
                    length: 0,
                    height: 0,
                    width: 0
                };
            }
        }

        for (let i = 0; i < numBoxes; i++) {
            let box =
            '<tr class="box" data-pos="' + pos + '">' +
                '<td class="border">#' + pos + '</td>' +
                '<td class="pounds">' +
                    '<div class="form-group pounds">' +
                        '<input type="number" step="0.01" class="form-control box-pound-number" name="box_pound_number[]" placeholder="# Libras" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td class="feets">' +
                    '<div class="form-group feets">' +
                        '<input type="number" step="0.01" class="form-control box-feet-number" name="box_feet_number[]" placeholder="# Pies" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-pound-feet-value" name="box_pound_feet_value[]" placeholder="Valor" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td class="border">' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-pound-feet-total" name="box_pound_feet_total[]" value="0" min="0">' +
                    '</div>' +
                '</td>' +
                '<td class="taxes">' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-tax-percent" name="box_tax_percent[]" placeholder="% Impuesto" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td class="taxes">' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-tax-value" name="box_tax_value[]" placeholder="Valor" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td class="taxes border">' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-tax-total" name="box_tax_total[]" value="0" min="0" readonly>' +
                    '</div>' +
                '</td>' +
                '<td class="measurements">' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-measurement-height" name="box_measurement_height[]" placeholder="Alto" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td class="measurements">' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-measurement-length" name="box_measurement_length[]" placeholder="Largo" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td class="measurements border">' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-measurement-width" name="box_measurement_width[]" placeholder="Ancho" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-insurance-percent" name="box_insurance_percent[]" placeholder="% Seguro" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-insurance-value" name="box_insurance_value[]" placeholder="Valor" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td class="border">' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-insurance-total" name="box_insurance_total[]" value="0" min="0" readonly>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-other-box" name="box_other_box[]" placeholder="Caja" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-other-pick-up" name="box_other_pick_up[]" placeholder="Pick-up" value="0" min="0" required>' +
                    '</div>' +
                '</td>' +
                '<td class="border">' +
                    '<div class="form-group">' +
                        '<input type="number" step="0.01" class="form-control box-other-total" name="box_other_total[]" value="0" min="0" readonly>' +
                    '</div>' +
                '</td>' +
                '<td class="border">' +
                    '<div class="form-group">' +
                        '<textarea rows="4" cols="80" class="form-control box-description" name="box_description[]" placeholder="Descripcion..."></textarea>' +
                    '</div>' +
                '</td>' +
                '<td class="border">' +
                    '<span class="box-total-label">$0</span>' +
                    '<input type="hidden" class="box-total" name="_total_box[]" value="0" min="0">' +
                '</td>' +
                '<td>' +
                    '<i class="fa fa-times pull-right" onClick="deleteBox(' + pos + ');"></i>' +
                '</td>' +
            '</tr>';

            $('tbody.boxes').append(box);

            let lastBox = $('.box').last();
            // Asignar valores de caja
            if (shippingType == 'M') {
                lastBox.find('.box-feet-number').val(Math.round((option.feets / option.numBoxes) * 100) / 100);
                lastBox.find('.box-pound-feet-value').val(option.feetValue);
                lastBox.find('.box-pound-feet-total').val(Math.round((option.pvp / option.numBoxes) * 100) / 100);
                lastBox.find('.box-measurement-height').val(option.height);
                lastBox.find('.box-measurement-length').val(option.length);
                lastBox.find('.box-measurement-width').val(option.width);

                lastBox.find('.box-insurance-percent').val(zone.maritime.insurancePercent);
                lastBox.find('.box-insurance-value').val(zone.maritime.minValue);
                lastBox.find('.box-insurance-total').val(zone.maritime.insurancePercent * zone.maritime.minValue / 100);
                if (zone.maritime.insuranceType == 'required') {
                    lastBox.find('.box-insurance-value').attr('min', zone.maritime.minValue);
                } else {
                    lastBox.find('.box-insurance-value').attr('min', 0);
                }
            } else if (shippingType == 'T') {
                lastBox.find('.box-pound-number').val(Math.round((option.pounds / option.numBoxes) * 100) / 100);
                lastBox.find('.box-pound-feet-value').val(option.feetValue);
                lastBox.find('.box-pound-feet-total').val(Math.round((option.pvp / option.numBoxes) * 100) / 100);
                lastBox.find('.box-measurement-height').val(option.height);
                lastBox.find('.box-measurement-length').val(option.length);
                lastBox.find('.box-measurement-width').val(option.width);

                lastBox.find('.box-insurance-percent').val(zone.terrestrial.insurancePercent);
                lastBox.find('.box-insurance-value').val(zone.terrestrial.minValue);
                lastBox.find('.box-insurance-total').val(zone.terrestrial.insurancePercent * zone.terrestrial.minValue / 100);
                if (zone.terrestrial.insuranceType == 'required') {
                    lastBox.find('.box-insurance-value').attr('min', zone.terrestrial.minValue);
                } else {
                    lastBox.find('.box-insurance-value').attr('min', 0);
                }
            } else if (shippingType == 'A') {
                lastBox.find('.box-insurance-percent').val(zone.aerial.insurancePercent);
                lastBox.find('.box-insurance-value').val(zone.aerial.minValue);
                lastBox.find('.box-insurance-total').val(zone.aerial.insurancePercent * zone.aerial.minValue / 100);
                if (zone.aerial.insuranceType == 'required') {
                    lastBox.find('.box-insurance-value').attr('min', zone.aerial.minValue);
                } else {
                    lastBox.find('.box-insurance-value').attr('min', 0);
                }
            }

            if ($('optional-insurance').val() == '0') {
                lastBox.find('.box-insurance-value').val(0);
                lastBox.find('.box-insurance-total').val(0);
            }

            pos++;
        }

        if (shippingType == 'A') {
            $('.measurements').attr('hidden', true);
            $('.taxes').attr('hidden', false);
            $('.pounds').attr('hidden', false);
            $('.feets').attr('hidden', true);
            $('.box .box-measurement-height').val(0);
            $('.box .box-measurement-length').val(0);
            $('.box .box-measurement-width').val(0);

            $('.box .box-pound-number').attr('min', zone.aerial.minPounds);
            $('.box .box-pound-feet-value').val(zone.aerial.poundValue);
            $('.box .box-tax-percent').val(zone.aerial.taxPercent);
            $('.box .box-tax-value').val(zone.aerial.taxValue);
            $('.box .box-tax-total').val(zone.aerial.taxValue * zone.aerial.taxPercent / 100);

            /*$('.box .box-insurance-percent').val(zone.aerial.insurancePercent);
            $('.box .box-insurance-value').val(zone.aerial.minValue);
            if (zone.aerial.insuranceType == 'required') {
                $('.box .box-insurance-value').attr('min', zone.aerial.minValue);
            } else {
                $('.box .box-insurance-value').attr('min', 0);
            }*/
        } else if (shippingType == 'M') {
            $('.pounds').attr('hidden', true);
            $('.feets').attr('hidden', false);
            $('.measurements').attr('hidden', false);
            $('.taxes').attr('hidden', true);
            $('.box .box-tax-percent').val(0);
            $('.box .box-tax-value').val(0);
            $('.box .box-tax-total').val(0);
        } else if (shippingType == 'T') {
            $('.pounds').attr('hidden', false);
            $('.feets').attr('hidden', true);
            $('.measurements').attr('hidden', false);
            $('.taxes').attr('hidden', true);
            $('.box .box-tax-percent').val(0);
            $('.box .box-tax-value').val(0);
            $('.box .box-tax-total').val(0);

            /*if ($('#option').val() != '-1') {
                let optionSelected = $('#option').val().split('_')[0];

                let option = zone.maritime.optionsFeets[optionSelected];
                if (option.numBoxes > 1) {
                    for (i = 1; i < option.numBoxes; i++) {
                        $('.boxes').append(box);
                    }
                }

                $('.box .box-pound-number').val(Math.round((option.pounds / option.numBoxes) * 100) / 100);
                $('.box .box-pound-feet-value').val(option.poundValue);
                $('.box .box-pound-feet-total').val(Math.round((option.pvp / option.numBoxes) * 100) / 100);
                $('.box .box-measurement-height').val(option.height);
                $('.box .box-measurement-length').val(option.length);
                $('.box .box-measurement-width').val(option.width);
            }*/
            /*$('.box .box-pound-number').attr('min', zone.terrestrial.minPounds);
            
            $('.box .box-insurance-percent').val(zone.terrestrial.insurancePercent);
            $('.box .box-insurance-value').val(zone.terrestrial.minValue);
            if (zone.terrestrial.insuranceType == 'required') {
                $('.box .box-insurance-value').attr('min', zone.terrestrial.minValue);
            } else {
                $('.box .box-insurance-value').attr('min', 0);
            }*/
        }
    });

    $('#add_zone').on('click', function () {
        let pos = 1;

        $('#save').attr('hidden', false);

        if ($('.card.zone').length) {
            let length = parseInt($('.card.zone').length);
            pos = length + 1;
        }

        let zone =
        '<div class="card zone" data-pos="' + pos + '">' +
            '<div class="card-header">' +
                '<i class="fa fa-times pull-right" onClick="deleteZone(' + pos + ');"></i>' +
                '<h4 class="card-title">Zona #' + pos + '</h4>' +
            '</div>' +
            '<div class="card-body form">' +
                '<input type="hidden" value="" name="zone_id[]"/>' +
                '<div class="row">' +
                    '<div class="col-md-12">' +
                        '<div class="form-group">' +
                            '<label>Descripcion</label>' +
                            '<textarea rows="4" cols="80" class="form-control" name="zone_description[]" placeholder="Descripcion..." required>Todo el pais</textarea>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-md-4">' +
                        '<div class="form-group text-center">' +
                            '<input class="aerial-checkbox" type="checkbox" name="aerial[]" value="aerial" onClick="checkShippingType(' + pos + ', \'aerial\')">' +
                            '<span for="aerial"> Envio Aereo</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-4">' +
                        '<div class="form-group text-center">' +
                            '<input class="maritime-checkbox" type="checkbox" name="maritime[]" value="maritime" onClick="checkShippingType(' + pos + ', \'maritime\')">' +
                            '<span for="maritime"> Envio Maritimo</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-md-4">' +
                        '<div class="form-group text-center">' +
                            '<input class="terrestrial-checkbox" type="checkbox" name="terrestrial[]" value="terrestrial" onClick="checkShippingType(' + pos + ', \'terrestrial\')">' +
                            '<span for="terrestrial"> Envio Terrestre</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="aerial" hidden>' +
                    '<div class="card-header text-center shipping-type">' +
                        '<h5 class="card-title">Envio Aereo</h5>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Tiempo de Entrega</label>' +
                                '<input type="text" class="form-control aerial-delivery-time" name="aerial_delivery_time[]" placeholder="Tiempo de Entrega" value="">' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-6 pl-1">' +
                            '<div class="form-group">' +
                                '<label>Dias de Salida</label>' +
                                '<input type="text" class="form-control" name="aerial_departure_days[]" placeholder="Dias de Salida" value="">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Valor de Libra</label>' +
                                '<input type="number" step="0.01" class="form-control" name="aerial_pound_value[]" placeholder="Valor de Libra" value="0" min="0">' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-6 pl-1">' +
                            '<div class="form-group">' +
                                '<label>Minimo de Libra</label>' +
                                '<input type="number" step="0.01" class="form-control" name="aerial_min_pound[]" placeholder="Minimo de Libra" value="0" min="0">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Tipo de Seguro</label>' +
                                '<select id="aerial-insurance-type" name="aerial_insurance_type[]" class="form-control">' +
                                    '<option value="required">Seguro Obligatorio</option>' +
                                    '<option value="optional">Seguro Opcional</option>' +
                                '</select>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Valor Minimo de Seguro</label>' +
                                '<input type="number" step="0.01" class="form-control" name="aerial_min_value[]" placeholder="Valor Minimo de Seguro" value="0" min="0" >' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-6 pl-1">' +
                            '<div class="form-group">' +
                                '<label>Porcentaje de Seguro</label>' +
                                '<input type="number" step="0.01" class="form-control" name="aerial_insurance_percent[]" placeholder="Porcentaje de Seguro" value="0" min="0" >' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Valor de Impuesto</label>' +
                                '<input type="number" step="0.01" class="form-control aerial_tax_value" name="aerial_tax_value[]" placeholder="Valor de Impuesto" value="0" min="0">' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-6 pl-1">' +
                            '<div class="form-group">' +
                                '<label>Porcentaje de Impuesto</label>' +
                                '<input type="number" step="0.01" class="form-control aerial_tax_percent" name="aerial_tax_percent[]" placeholder="Porcentaje de Impuesto" value="0" min="0">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="maritime" hidden>' +
                    '<div class="card-header text-center shipping-type">' +
                        '<h5 class="card-title">Envio Maritimo</h5>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Tiempo de Entrega</label>' +
                                '<input type="text" class="form-control maritime-delivery-time" name="maritime_delivery_time[]" placeholder="Tiempo de Entrega" value="">' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-6 pl-1">' +
                            '<div class="form-group">' +
                                '<label>Dias de Salida</label>' +
                                '<input type="text" class="form-control" name="maritime_departure_days[]" placeholder="Dias de Salida" value="">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Tipo de Seguro</label>' +
                                '<select id="maritime-insurance-type" name="maritime_insurance_type[]" class="form-control">' +
                                    '<option value="required">Seguro Obligatorio</option>' +
                                    '<option value="optional">Seguro Opcional</option>' +
                                '</select>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Valor Minimo de Seguro</label>' +
                                '<input type="number" step="0.01" class="form-control" name="maritime_min_value[]" placeholder="Valor Minimo de Seguro" value="0" min="0" >' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-6 pl-1">' +
                            '<div class="form-group">' +
                                '<label>Porcentaje de Seguro</label>' +
                                '<input type="number" step="0.01" class="form-control" name="maritime_insurance_percent[]" placeholder="Porcentaje de Seguro" value="0" min="0" >' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-12 options">' +
                            '<div class="maritime-options" hidden>' +
                                '<table class="table">' +
                                    '<thead>' +
                                        '<th># Cajas</th>' +
                                        '<th>Largo</th>' +
                                        '<th>Alto</th>' +
                                        '<th>Ancho</th>' +
                                        '<th>Pies</th>' +
                                        '<th>Valor Pie</th>' +
                                        '<th>PVP</th>' +
                                        '<th class="zone"></th>' +
                                    '</thead>' +
                                    '<tbody class="options"></tbody>' +
                                '</table>' +
                            '</div>' +
                            '<a id="add_maritime_option" class="btn btn-ge pull-left" onClick="addMaritimeOption(' + pos + ');">' +
                                '<i class="fa fa-plus"></i> Agregar Opcion de Caja' +
                            '</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="terrestrial" hidden>' +
                    '<div class="card-header text-center shipping-type">' +
                        '<h5 class="card-title">Envio Terrestre</h5>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Tiempo de Entrega</label>' +
                                '<input type="text" class="form-control terrestrial-delivery-time" name="terrestrial_delivery_time[]" placeholder="Tiempo de Entrega" value="">' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-6 pl-1">' +
                            '<div class="form-group">' +
                                '<label>Dias de Salida</label>' +
                                '<input type="text" class="form-control" name="terrestrial_departure_days[]" placeholder="Dias de Salida" value="">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Tipo de Seguro</label>' +
                                '<select id="terrestrial-insurance-type" name="terrestrial_insurance_type[]" class="form-control">' +
                                    '<option value="required">Seguro Obligatorio</option>' +
                                    '<option value="optional">Seguro Opcional</option>' +
                                '</select>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Valor Minimo de Seguro</label>' +
                                '<input type="number" step="0.01" class="form-control" name="terrestrial_min_value[]" placeholder="Valor Minimo de Seguro" value="0" min="0" >' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-6 pl-1">' +
                            '<div class="form-group">' +
                                '<label>Porcentaje de Seguro</label>' +
                                '<input type="number" step="0.01" class="form-control" name="terrestrial_insurance_percent[]" placeholder="Porcentaje de Seguro" value="0" min="0" >' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-6 pr-1">' +
                            '<div class="form-group">' +
                                '<label>Minimo de Libra</label>' +
                                '<input type="number" step="0.01" class="form-control" name="terrestrial_min_pound[]" placeholder="Minimo de Libra" value="0" min="0">' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-6 pl-1">' +
                            '<div class="form-group">' +
                                '<label>Valor de Libra</label>' +
                                '<input type="number" step="0.01" class="form-control" name="terrestrial_pound_value[]" placeholder="Valor Minimo de Seguro" value="" min="0">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-md-12 options">' +
                            '<div class="terrestrial-options" hidden>' +
                                '<table class="table">' +
                                    '<thead>' +
                                        '<th># Cajas</th>' +
                                        '<th>Largo</th>' +
                                        '<th>Alto</th>' +
                                        '<th>Ancho</th>' +
                                        '<th>Libras</th>' +
                                        '<th>Valor Libra</th>' +
                                        '<th>PVP</th>' +
                                        '<th class="zone"></th>' +
                                    '</thead>' +
                                    '<tbody class="options"></tbody>' +
                                '</table>' +
                            '</div>' +
                            '<a id="add_terrestrial_option" class="btn btn-ge pull-left" onClick="addTerrestrialOption(' + pos + ');">' +
                                '<i class="fa fa-plus"></i> Agregar Opcion de Caja' +
                            '</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

        $('.zones').append(zone);
    });

    $('.save_country').on('click', function() {
        let url = app_url + 'countries';
        let data = {
            agency: $('#agency').val(),
            name: $('input[name="name"]').val(),
            initial: $('input[name="initial"]').val(),
            terms: $('textarea[name="terms"]').val(),
            zones: []
        };
        let zones = $('.card.zone');
        let pos = 1;

        for (let i = 0; i < zones.length; i++) {
            let zone = {};
            zone.description = $('.zone[data-pos="' + pos + '"] textarea[name^="zone_description"]').val();

            if ($('.zone[data-pos="' + pos + '"] .aerial-checkbox').is(':checked')) {
                zone.airShipment = true;
            } else {
                zone.airShipment = false;
            }
            if ($('.zone[data-pos="' + pos + '"] .maritime-checkbox').is(':checked')) {
                zone.maritimeShipping = true;
            } else {
                zone.maritimeShipping = false;
            }
            if ($('.zone[data-pos="' + pos + '"] .terrestrial-checkbox').is(':checked')) {
                zone.groundShipping = true;
            } else {
                zone.groundShipping = false;
            }

            zone.aerial = {
                deliveryTime: $('.zone[data-pos="' + pos + '"] input[name^="aerial_delivery_time"]').val(),
                departureDays: $('.zone[data-pos="' + pos + '"] input[name^="aerial_departure_days"]').val(),
                poundValue: $('.zone[data-pos="' + pos + '"] input[name^="aerial_pound_value"]').val(),
                minPounds: $('.zone[data-pos="' + pos + '"] input[name^="aerial_min_pound"]').val(),
                insuranceType: $('.zone[data-pos="' + pos + '"] input[name^="aerial_insurance_type"]').val(),
                minValue: $('.zone[data-pos="' + pos + '"] input[name^="aerial_min_value"]').val(),
                insurancePercent: $('.zone[data-pos="' + pos + '"] input[name^="aerial_insurance_percent"]').val(),
                taxValue: $('.zone[data-pos="' + pos + '"] input[name^="aerial_tax_value"]').val(),
                taxPercent: $('.zone[data-pos="' + pos + '"] input[name^="aerial_tax_percent"]').val(),
            };

            let optionsFeets = [];
            let optionsPounds = [];
            let options = $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option');
            let posOption = 1;

            for (let j = 0; j < options.length; j++) {
                optionsFeets.push({
                    numBoxes: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-num-boxes').val(),
                    length: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-length').val(),
                    width: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-width').val(),
                    height: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-height').val(),
                    feets: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-feets').val(),
                    feetValue: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-feet-value').val(),
                    pvp: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-pvp').val(),
                });

                posOption++;
            }

            zone.maritime = {
                deliveryTime: $('.zone[data-pos="' + pos + '"] input[name^="maritime_delivery_time"]').val(),
                departureDays: $('.zone[data-pos="' + pos + '"] input[name^="maritime_departure_days"]').val(),
                insuranceType: $('.zone[data-pos="' + pos + '"] input[name^="maritime_insurance_type"]').val(),
                minValue: $('.zone[data-pos="' + pos + '"] input[name^="maritime_min_value"]').val(),
                insurancePercent: $('.zone[data-pos="' + pos + '"] input[name^="maritime_insurance_percent"]').val(),
                feets: optionsFeets.length ? true : false,
                pounds: optionsPounds ? true : false,
                optionsFeets: optionsFeets,
                optionsPounds: [],
            };

            options = $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option');
            posOption = 1;
            optionsFeets = [];
            optionsPounds = [];

            for (let j = 0; j < options.length; j++) {
                optionsPounds.push({
                    numBoxes: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-num-boxes').val(),
                    length: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-length').val(),
                    width: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-width').val(),
                    height: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-height').val(),
                    pounds: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-pounds').val(),
                    poundValue: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-pound-value').val(),
                    pvp: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-pvp').val(),
                });

                posOption++;
            }

            zone.terrestrial = {
                deliveryTime: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_delivery_time"]').val(),
                departureDays: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_departure_days"]').val(),
                poundValue: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_pound_value"]').val(),
                minPounds: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_min_pound"]').val(),
                minPounds: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_pound_value"]').val(),
                insuranceType: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_insurance_type"]').val(),
                minValue: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_min_value"]').val(),
                insurancePercent: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_insurance_percent"]').val(),
                options: optionsPounds
            };

            data.zones.push(zone);
            pos++;
        }
        $('.new-country').append("<input type='hidden' name='country_json' value='" + JSON.stringify(data) + "'>");

        //$.post(url, data);
    });

    $('.update_country').on('click', function() {
        let data = {
            id: null,
            name: $('input[name="name"]').val(),
            initial: $('input[name="initial"]').val(),
            terms: $('textarea[name="terms"]').val(),
            zones: [],
            removedZones: []
        };
        let zones = $('.card.zone');
        let pos = 1;

        for (let i = 0; i < zones.length; i++) {
            let zone = {};
            zone._id = $('.zone[data-pos="' + pos + '"] input[name^="zone_id"]').val();
            zone.description = $('.zone[data-pos="' + pos + '"] textarea[name^="zone_description"]').val();

            if ($('.zone[data-pos="' + pos + '"] .aerial-checkbox').is(':checked')) {
                zone.airShipment = true;
            } else {
                zone.airShipment = false;
            }
            if ($('.zone[data-pos="' + pos + '"] .maritime-checkbox').is(':checked')) {
                zone.maritimeShipping = true;
            } else {
                zone.maritimeShipping = false;
            }
            if ($('.zone[data-pos="' + pos + '"] .terrestrial-checkbox').is(':checked')) {
                zone.groundShipping = true;
            } else {
                zone.groundShipping = false;
            }

            zone.aerial = {
                deliveryTime: $('.zone[data-pos="' + pos + '"] input[name^="aerial_delivery_time"]').val(),
                departureDays: $('.zone[data-pos="' + pos + '"] input[name^="aerial_departure_days"]').val(),
                poundValue: $('.zone[data-pos="' + pos + '"] input[name^="aerial_pound_value"]').val(),
                minPounds: $('.zone[data-pos="' + pos + '"] input[name^="aerial_min_pound"]').val(),
                insuranceType: $('.zone[data-pos="' + pos + '"] input[name^="aerial_insurance_type"]').val(),
                minValue: $('.zone[data-pos="' + pos + '"] input[name^="aerial_min_value"]').val(),
                insurancePercent: $('.zone[data-pos="' + pos + '"] input[name^="aerial_insurance_percent"]').val(),
                taxValue: $('.zone[data-pos="' + pos + '"] input[name^="aerial_tax_value"]').val(),
                taxPercent: $('.zone[data-pos="' + pos + '"] input[name^="aerial_tax_percent"]').val(),
            };

            let optionsFeets = [];
            let optionsPounds = [];
            let options = $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option');
            let posOption = 1;

            for (let j = 0; j < options.length; j++) {
                optionsFeets.push({
                    numBoxes: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-num-boxes').val(),
                    length: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-length').val(),
                    width: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-width').val(),
                    height: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-height').val(),
                    feets: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-feets').val(),
                    feetValue: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-feet-value').val(),
                    pvp: $('.zone[data-pos="' + pos + '"] .maritime .maritime-options .option[data-pos="' + posOption + '"] .maritime-opt-pvp').val(),
                });

                posOption++;
            }

            zone.maritime = {
                deliveryTime: $('.zone[data-pos="' + pos + '"] input[name^="maritime_delivery_time"]').val(),
                departureDays: $('.zone[data-pos="' + pos + '"] input[name^="maritime_departure_days"]').val(),
                insuranceType: $('.zone[data-pos="' + pos + '"] input[name^="maritime_insurance_type"]').val(),
                minValue: $('.zone[data-pos="' + pos + '"] input[name^="maritime_min_value"]').val(),
                insurancePercent: $('.zone[data-pos="' + pos + '"] input[name^="maritime_insurance_percent"]').val(),
                feets: optionsFeets.length ? true : false,
                pounds: optionsPounds ? true : false,
                optionsFeets: optionsFeets,
                optionsPounds: [],
            };

            options = $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option');
            posOption = 1;
            optionsFeets = [];
            optionsPounds = [];

            for (let j = 0; j < options.length; j++) {
                optionsPounds.push({
                    numBoxes: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-num-boxes').val(),
                    length: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-length').val(),
                    width: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-width').val(),
                    height: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-height').val(),
                    pounds: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-pounds').val(),
                    poundValue: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-pound-value').val(),
                    pvp: $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-options .option[data-pos="' + posOption + '"] .terrestrial-opt-pvp').val(),
                });

                posOption++;
            }

            zone.terrestrial = {
                deliveryTime: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_delivery_time"]').val(),
                departureDays: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_departure_days"]').val(),
                poundValue: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_pound_value"]').val(),
                minPounds: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_min_pound"]').val(),
                minPounds: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_pound_value"]').val(),
                insuranceType: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_insurance_type"]').val(),
                minValue: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_min_value"]').val(),
                insurancePercent: $('.zone[data-pos="' + pos + '"] input[name^="terrestrial_insurance_percent"]').val(),
                options: optionsPounds
            };

            data.zones.push(zone);
            pos++;
        }
        //alert('update-country');
        $('.update-country-form').append("<input type='hidden' name='country_json' value='" + JSON.stringify(data) + "'>");

        //$.post(url, data);
    });
});

function deleteArticle(index) {
    $('#calc_total_move').attr('hidden', false);
    $('#save').attr('hidden', true);
    
    $('.article').remove('div[data-pos="' + index + '"]');
    
    let articles = $('.article');

    if (!articles.length) {
        $('#save').attr('hidden', true);
    } else {
        let pos = 1;
        for (let i = 0; i < articles.length; i++) {
            articles[i].attributes['data-pos'].value = pos;
            articles[i].firstChild.innerHTML = 
                '<i class="fa fa-times pull-right" onClick="deleteArticle(' + pos + ');"></i>' +
                '<h4 class="card-title">Articulo #' + pos + '</h4>';

            pos++;
        }
    }
}

function calculateTotalMoveFeets() {
    let articles = $('.article');
    let total_move_feets = 0;

    for (let i = 0; i < articles.length; i++) {
        let pos = articles[i].attributes['data-pos'].value;
        let total_feets = parseFloat($('.article[data-pos="' + pos + '"] .article-total-feets').val());

        if (!isNaN(total_feets)) {
            total_move_feets += total_feets;
        }
    }

    $('input[name="total_feets"]').val(Math.round(total_move_feets * 100) / 100);
}

function deleteBox(index) {
    $('.box').remove('tr[data-pos="' + index + '"]');
    
    let boxes = $('.box');

    if (!boxes.length) {
        $('#save').attr('hidden', true);
    } else {
        let pos = 1;
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].attributes['data-pos'].value = pos;
            boxes[i].firstChild.innerHTML = '#' + pos;
            boxes[i].lastChild.innerHTML = '<i class="fa fa-times pull-right" onClick="deleteBox(' + pos + ');"></i>';

            pos++;
        }
    }
}

function calculateTotalBox(pos) {
    let total_box = 0;
    let shipping_type = $('#shipping-type').val().split('_')[0];

    // OTHERS SECTION
    let box_value = parseFloat($('.box[data-pos="' + pos + '"] .box-other-box').val());
    let pick_up_value = parseFloat($('.box[data-pos="' + pos + '"] .box-other-pick-up').val());
    
    // TAXES SECTION
    let tax_percent = 0
    let tax_value = 0
    if (shipping_type == 'A') {
        tax_percent = parseFloat($('.box[data-pos="' + pos + '"] .box-tax-percent').val());
        tax_value = parseFloat($('.box[data-pos="' + pos + '"] .box-tax-value').val());
    }

    // INSURANCE SECTION
    let insurance_percent = parseFloat($('.box[data-pos="' + pos + '"] .box-insurance-percent').val());
    let insurance_value = parseFloat($('.box[data-pos="' + pos + '"] .box-insurance-value').val());

    // POUNDS/FEETS SECTION
    let pound_total = parseFloat($('.box[data-pos="' + pos + '"] .box-pound-feet-total').val());

    if (!isNaN(pound_total) && !isNaN(tax_percent) && !isNaN(tax_value) && !isNaN(insurance_percent) && !isNaN(insurance_value) && !isNaN(box_value) && !isNaN(pick_up_value)) {
        let tax_total = (tax_percent * tax_value) / 100;
        let insurance_total = (insurance_percent * insurance_value) / 100;
        let others_total = box_value + pick_up_value;

        $('.box[data-pos="' + pos + '"] .box-pound-feet-total').val(Math.round(pound_total * 100) / 100);
        $('.box[data-pos="' + pos + '"] .box-tax-total').val(Math.round(tax_total * 100) / 100);
        $('.box[data-pos="' + pos + '"] .box-insurance-total').val(Math.round(insurance_total * 100) / 100);
        $('.box[data-pos="' + pos + '"] .box-other-total').val(Math.round(others_total * 100) / 100);

        total_box = pound_total + tax_total + insurance_total + others_total;
    }

    return total_box;
}

function deleteZone(index) {
    let removedId = $('div[data-pos="' + index + '"] .zone_id').val();
    
    if (removedId != null) {
        $('.removed-zones').append('<input type="hidden" name="removed_zone[]" class="removed_zone" value="' + removedId + '" />')
    }

    $('.card.zone').remove('div[data-pos="' + index + '"]');
    
    let zones = $('.card.zone');

    if (!zones.length) {
        $('#save').attr('hidden', true);
    } else {
        let pos = 1;
        for (let i = 0; i < zones.length; i++) {
            zones[i].attributes['data-pos'].value = pos;
            zones[i].firstChild.innerHTML = 
                '<i class="fa fa-times pull-right" onClick="deleteZone(' + pos + ');"></i>' +
                '<h4 class="card-title">Zona #' + pos + '</h4>';

            pos++;
        }
    }
}

function checkShippingType(pos, type) {
    
    if ($('.zone[data-pos="' + pos + '"] .' + type + '-checkbox').is(':checked')) {
        switch (type) {
            case 'aerial':
                $('.zone[data-pos="' + pos + '"] .aerial').attr('hidden', false);
                $('.zone[data-pos="' + pos + '"] .aerial input').attr('required', true);
                break;
            case 'maritime':
                $('.zone[data-pos="' + pos + '"] .maritime').attr('hidden', false);
                $('.zone[data-pos="' + pos + '"] .maritime input').attr('required', true);
                break;
            case 'terrestrial':
                $('.zone[data-pos="' + pos + '"] .terrestrial').attr('hidden', false);
                $('.zone[data-pos="' + pos + '"] .terrestrial input').attr('required', true);
                break;
        }
    } else {
        switch (type) {
            case 'aerial':
                $('.zone[data-pos="' + pos + '"] .aerial').attr('hidden', true);
                $('.zone[data-pos="' + pos + '"] .aerial input').attr('required', false);
                $('.zone[data-pos="' + pos + '"] .aerial .aerial-delivery-time').val('');
                break;
            case 'maritime':
                $('.zone[data-pos="' + pos + '"] .maritime').attr('hidden', true);
                $('.zone[data-pos="' + pos + '"] .aerial input').attr('required', false);
                $('.zone[data-pos="' + pos + '"] .maritime .maritime-delivery-time').val('');
                break;
            case 'terrestrial':
                $('.zone[data-pos="' + pos + '"] .terrestrial').attr('hidden', true);
                $('.zone[data-pos="' + pos + '"] .aerial input').attr('required', false);
                $('.zone[data-pos="' + pos + '"] .terrestrial .terrestrial-delivery-time').val('');
                break;
        }
    }
}

function addMaritimeOption(zone) {
    let pos = 1;
    
    let length = parseInt($('div[data-pos="' + zone + '"] .maritime .maritime-options .option').length);

    $('div[data-pos="' + zone + '"] .maritime .maritime-options').attr('hidden', false);

    if (length) {
        pos = length + 1;
    }

    let option =
    '<tr class="option" data-pos="' + pos + '">' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" class="form-control maritime-opt-num-boxes" name="maritime_opt_num_boxes[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" step="0.01" class="form-control maritime-opt-length" name="maritime_opt_length[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" step="0.01" class="form-control maritime-opt-height" name="maritime_opt_height[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" step="0.01" class="form-control maritime-opt-width" name="maritime_opt_width[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" class="form-control maritime-opt-feets" name="maritime_opt_feets[]" value="0" step="0.01" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" step="0.01" class="form-control maritime-opt-feet-value" name="maritime_opt_feet_value[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" class="form-control maritime-opt-pvp" name="maritime_opt_pvp[]" value="0" step="0.01" required>' +
            '</div>' +
        '</td>' +
        '<td class="zone">' +
            '<i class="fa fa-times" onClick="deleteMaritimeOption(' + zone + ', ' + pos + ');"></i>' +
        '</td>' +
    '</tr>';

    $('div[data-pos="' + zone + '"] .maritime .maritime-options .options').append(option);
}

function deleteMaritimeOption(zone, index) {
    $('div[data-pos="' + zone + '"] .maritime .maritime-options .option').remove('tr[data-pos="' + index + '"]');
    
    let options = $('div[data-pos="' + zone + '"] .maritime .maritime-options .option');

    if (!options.length) {
        $('div[data-pos="' + zone + '"] .maritime .maritime-options').attr('hidden', true);
    } else {
        let pos = 1;
        for (let i = 0; i < options.length; i++) {
            options[i].attributes['data-pos'].value = pos;
            options[i].lastChild.innerHTML = 
            '<i class="fa fa-times" onClick="deleteMaritimeOption(' + zone + ', ' + pos + ');"></i>';

            pos++;
        }
    }
}

function addTerrestrialOption(zone) {
    let pos = 1;
    
    let length = parseInt($('div[data-pos="' + zone + '"] .terrestrial .terrestrial-options .option').length);

    $('div[data-pos="' + zone + '"] .terrestrial .terrestrial-options').attr('hidden', false);

    if (length) {
        pos = length + 1;
    }

    let option =
    '<tr class="option" data-pos="' + pos + '">' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" class="form-control terrestrial-opt-num-boxes" name="terrestrial_opt_num_boxes[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" step="0.01" class="form-control terrestrial-opt-length" name="terrestrial_opt_length[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" step="0.01" class="form-control terrestrial-opt-height" name="terrestrial_opt_height[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" step="0.01" class="form-control terrestrial-opt-width" name="terrestrial_opt_width[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" class="form-control terrestrial-opt-pounds" name="terrestrial_opt_pounds[]" value="0" min="0" step="0.01" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" step="0.01" class="form-control terrestrial-opt-pound-value" name="terrestrial_opt_pound_value[]" value="0" min="0" required>' +
            '</div>' +
        '</td>' +
        '<td>' +
            '<div class="form-group">' +
                '<input type="number" class="form-control terrestrial-opt-pvp" name="terrestrial_opt_pvp[]" value="0" min="0" step="0.01" required>' +
            '</div>' +
        '</td>' +
        '<td class="zone">' +
            '<i class="fa fa-times" onClick="deleteTerrestrialOption(' + zone + ', ' + pos + ');"></i>' +
        '</td>' +
    '</tr>';

    $('div[data-pos="' + zone + '"] .terrestrial .terrestrial-options .options').append(option);
}

function deleteTerrestrialOption(zone, index) {
    $('div[data-pos="' + zone + '"] .terrestrial .terrestrial-options .option').remove('tr[data-pos="' + index + '"]');
    
    let options = $('div[data-pos="' + zone + '"] .terrestrial .terrestrial-options .option');

    if (!options.length) {
        $('div[data-pos="' + zone + '"] .terrestrial .terrestrial-options').attr('hidden', true);
    } else {
        let pos = 1;
        for (let i = 0; i < options.length; i++) {
            options[i].attributes['data-pos'].value = pos;
            options[i].lastChild.innerHTML = 
            '<i class="fa fa-times" onClick="deleteTerrestrialOption(' + zone + ', ' + pos + ');"></i>';

            pos++;
        }
    }
}

function selectClient(clientId) {
    if ($('.client-data[data-client="' + clientId + '"] .sender').is(':checked')) {
        $('.agency-row').attr('hidden', true);
        $('.receiver-data').attr('hidden', true);

        if ($('.receiver-data[data-client="' + clientId + '"]').length) {
            $('.receiver-data[data-client="' + clientId + '"]').attr('hidden', false);
        } else {
            $('#receiver-form').attr('hidden', false);
            $('#receivers').attr('hidden', true);
            $('#select-receiver').attr('hidden', true);
            $('.receiver-data').attr('hidden', true);
        }
        
        $('#client-form').attr('hidden', false);
        $('#clients').attr('hidden', true);
        $('#update-client').attr('hidden', false);
        
        $('input[name="sender_id"]').val(clientId);
        $('input[name="sender_name"]').val($('.client-data[data-client="' + clientId + '"] .sender-name').val());
        $('input[name="sender_lastName"]').val($('.client-data[data-client="' + clientId + '"] .sender-lastName').val());
        $('input[name="sender_email"]').val($('.client-data[data-client="' + clientId + '"] .sender-email').val());
        $('input[name="sender_phone"]').val($('.client-data[data-client="' + clientId + '"] .sender-phone').val());
        $('input[name="sender_city"]').val($('.client-data[data-client="' + clientId + '"] .sender-city').val());
        $('input[name="sender_state"]').val($('.client-data[data-client="' + clientId + '"] .sender-state').val());
        $('textarea[name="sender_address"]').val($('.client-data[data-client="' + clientId + '"] .sender-address').val());
        $('input[name="agency_id"]').val($('.client-data[data-client="' + clientId + '"] .sender-agency-id').val());
        $('input[name="agency_code"]').val($('.client-data[data-client="' + clientId + '"] .sender-agency-code').val());
    }
}

function selectReceiver(receiverId) {
    if ($('.receiver-data[data-receiver="' + receiverId + '"] .receiver').is(':checked')) {
        $('#receiver-form').attr('hidden', false);
        $('#receivers').attr('hidden', true);
        $('#select-receiver').attr('hidden', false);
        $('#update-receiver').attr('hidden', false);
        
        $('input[name="receiver_id"]').val(receiverId);
        $('input[name="receiver_name"]').val($('.receiver-data[data-receiver="' + receiverId + '"] .receiver-name').val());
        $('input[name="receiver_lastName"]').val($('.receiver-data[data-receiver="' + receiverId + '"] .receiver-lastName').val());
        $('input[name="receiver_dni"]').val($('.receiver-data[data-receiver="' + receiverId + '"] .receiver-dni').val());
        $('input[name="receiver_email"]').val($('.receiver-data[data-receiver="' + receiverId + '"] .receiver-email').val());
        $('input[name="receiver_phone"]').val($('.receiver-data[data-receiver="' + receiverId + '"] .receiver-phone').val());
        $('input[name="receiver_city"]').val($('.receiver-data[data-receiver="' + receiverId + '"] .receiver-city').val());
        $('input[name="receiver_state"]').val($('.receiver-data[data-receiver="' + receiverId + '"] .receiver-state').val());
        $('textarea[name="receiver_address"]').val($('.receiver-data[data-receiver="' + receiverId + '"] .receiver-address').val());
    }
}

function sendBox(box_id) {
    $.ajax({
        type: 'post',
        data: {id: box_id},
        dateType: 'json',
        url: api_url + '/box/send',
        success: function (response) {
            $('#' + box_id).attr('hidden', true);
        },
        error: function () {

        }
    });
}

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
            message = 'Correo Electronico y/o Contraseña invalido';
        } else if (action == 'email') {
            message = 'Correo Electronico ya existe!';
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
