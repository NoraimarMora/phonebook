@if(count($users) > 0 && Auth::user()->role == 'superadmin')
    <div class="card strpied-tabled-with-hover">
        <div class="card-body table-full-width table-responsive">
            <table class="table table-hover table-striped">
                <thead>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Role</th>
                    <th class="actions">Acciones</th>
                </thead>
                <tbody>
                    @foreach($users as $user)
                        <tr>
                            <td>
                                {{ $user->name }}
                                @if($user->lastname)
                                     {{ $user->lastname }}
                                @endif
                            </td>
                            <td>{{ $user->username }}</td>
                            <td>{{ $user->role }}</td>
                            <td class="actions">
                                <form id="{{ $user->id }}_edit" action="{{ action('UserController@edit', $user->id) }}"></form>
                                <form id="{{ $user->id }}_delete" action="{{ action('UserController@destroy', $user->id) }}" method="POST">
                                    @method('DELETE')
                                    @csrf
                                </form>
                                <button class="btn btn-warning btn-icon btn-sm edit" type="submit" form="{{ $user->id }}_edit">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-icon btn-sm " type="submit" form="{{ $user->id }}_delete">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="pagination">
                {{ $users->links() }}
            </div>
        </div>
    </div>
@else
    <div class="empty">
        <img src="{{ asset('img/emptylabelicon_1x.png') }}" />
        <p>No se han encontrado registros</p>
    </div>
@endif