@section('list')
@if(count($contacts))
    <div class="card strpied-tabled-with-hover">
        <div class="card-body table-full-width table-responsive">
            <table class="table table-hover table-striped">
                <thead>
                    <th>Nombre</th>
                    <th>Correo Electronico</th>
                    <th>Telefono</th>
                    <th style="text-align: center!important;">Etiquetas</th>
                    <th class="text-center">Acciones</th>
                </thead>
                <tbody>
                    @foreach($contacts as $contact)
                        <tr>
                            <td>{{ $contact->name }} {{ $contact->lastName }}</td>
                            <td>{{ $contact->email }}</td>
                            <td>{{ $contact->phone }}</td>
                            <td class="text-center">
                                
                            </td>
                            <td class="text-center">
                                <form id="{{ $contact->_id }}_favorite" action="{{ action('ContactController@markAsFavorite', $contact->_id) }}"></form>
                                <form id="{{ $contact->_id }}_edit" action="{{ action('ContactController@edit', $contact->_id) }}"></form>
                                <form id="{{ $contact->_id }}_delete" action="{{ action('ContactController@destroy', $contact->_id) }}" method="POST">
                                    @method('DELETE')
                                    @csrf
                                </form>
                                <button class="btn btn-info btn-icon btn-sm" type="submit" form="{{ $contact->_id }}_favorite">
                                    <i class="fa fa-heart"></i>
                                </button>
                                <button class="btn btn-warning btn-icon btn-sm edit" type="submit" form="{{ $contact->_id }}_edit">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-icon btn-sm " type="submit" form="{{ $contact->_id }}_delete">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="pagination">
            </div>
        </div>
    </div>
    @else
        <div class="empty">
            <span>No se han encontrado registros</span>
        </div>
    @endif
@endsection