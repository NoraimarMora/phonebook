@if(count($contacts) > 0)
    <div class="card strpied-tabled-with-hover">
        <div class="card-body table-full-width table-responsive">
            <table class="table table-hover table-striped">
                <thead>
                    <th>Nombre</th>
                    <th>Correo Electronico</th>
                    <th>Telefono</th>
                    <th>Etiquetas</th>
                    @if(!$home)
                        <th class="actions">Acciones</th>
                    @endif
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
                            <td>
                                <x-groups :groups="$contact->groups" />
                            </td>
                            @if(!$home)
                                <td class="actions">
                                    <form id="{{ $contact->id }}_favorite" action="{{ action('ContactController@markAsFavorite', $contact->id) }}" method="POST">
                                        @csrf
                                    </form>
                                    <form id="{{ $contact->id }}_show" action="{{ action('ContactController@show', $contact->id) }}"></form>
                                    <form id="{{ $contact->id }}_delete" action="{{ action('ContactController@destroy', $contact->id) }}" method="POST">
                                        @method('DELETE')
                                        @csrf
                                    </form>
                                    <button class="btn btn-success btn-icon btn-sm @if($contact->favorite) favorite-contact @endif" type="submit" form="{{ $contact->id }}_favorite">
                                        <i class="fa fa-heart"></i>
                                    </button>
                                    <button class="btn btn-primary btn-icon btn-sm" type="submit" form="{{ $contact->id }}_show">
                                        <i class="fa fa-eye"></i>
                                    </button>
                                    <button class="btn btn-danger btn-icon btn-sm " type="submit" form="{{ $contact->id }}_delete">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            @endif
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @if(!$home)
        <div class="pagination">
            {{ $contacts->links() }}
        </div>
    @endif
@else
    <div class="empty">
        <img src="{{ asset('img/emptylabelicon_1x.png') }}" />
        <p>No se han encontrado registros</p>
    </div>
@endif