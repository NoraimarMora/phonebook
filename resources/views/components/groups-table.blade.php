@if(count($groups) > 0)
    <div class="card strpied-tabled-with-hover">
        <div class="card-body table-full-width table-responsive">
            <table class="table table-hover table-striped">
                <thead>
                    <th>Nombre</th>
                    <th>Color de fondo</th>
                    <th>Color de texto</th>
                    <th class="actions">Acciones</th>
                </thead>
                <tbody>
                    @foreach($groups as $group)
                        <tr>
                            <td>{{ $group->name }}</td>
                            <td><x-color-block :color="$group->background_color" /></td>
                            <td><x-color-block :color="$group->color" /></td>
                            <td class="actions">
                                <form id="{{ $group->id }}_edit" action="{{ action('GroupController@edit', $group->id) }}"></form>
                                <form id="{{ $group->id }}_delete" action="{{ action('GroupController@destroy', $group->id) }}" method="POST">
                                    @method('DELETE')
                                    @csrf
                                </form>
                                <button class="btn btn-warning btn-icon btn-sm edit" type="submit" form="{{ $group->id }}_edit">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-icon btn-sm " type="submit" form="{{ $group->id }}_delete">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="pagination">
                {{ $groups->links() }}
            </div>
        </div>
    </div>
@else
    <div class="empty">
        <img src="{{ asset('img/emptylabelicon_1x.png') }}" />
        <p>No se han encontrado registros</p>
    </div>
@endif