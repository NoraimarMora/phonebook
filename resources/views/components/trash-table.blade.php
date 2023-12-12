@if(count($contacts) > 0)
    <div class="card strpied-tabled-with-hover">
        <div class="card-body table-full-width table-responsive">
            <table class="table table-hover table-striped">
                <thead>
                    <th>Nombre</th>
                    <th>Correo Electronico</th>
                    <th>Telefono</th>
                    <th>Fecha de eliminación</th>
                    <th class="actions">Acciones</th>
                </thead>
                <tbody>
                    @foreach($contacts as $contact)
                        <tr>
                            <td>
                                {{ $contact->first_name }}
                                @if($contact->second_name)
                                     {{ $contact->second_name }}
                                @endif
                                @if($contact->first_lastname)
                                     {{ $contact->first_lastname }}
                                @endif
                                @if($contact->second_lastname)
                                     {{ $contact->second_lastname }}
                                @endif
                            </td>
                            <td>@if(count($contact->emails) > 0) {{ $contact->emails[0]->email }} @endif</td>
                            <td>@if(count($contact->phones) > 0) {{ $contact->phones[0]->number }} @endif</td>
                            <td>{{ $contact->deleted_at }}</td>
                            <td class="actions">
                                <form id="{{ $contact->id }}_restore" action="{{ action('ContactController@restore') }}" method="POST">
                                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                </form>
                                <button class="btn btn-info btn-icon btn-sm " type="submit" form="{{ $contact->_id }}_restore">
                                    <i class="fa fa-undo"></i>
                                </button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="pagination">
        {{ $contacts->links() }}
    </div>
@else
    <div class="empty">
        <img src="{{ asset('img/emptylabelicon_1x.png') }}" />
        <p>No se han encontrado registros</p>
    </div>
@endif