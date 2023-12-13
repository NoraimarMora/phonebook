@extends('global')

@section('users_active')
active
@endsection

@section('page_name')
Nuevo usuario
@endsection

@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body form @if(session('error')) error @endif">
                <form action="{{ action('UserController@store') }}" method="POST">
                    @csrf
                    
                    <div class="row">
                        <div class="col-md-6 pr-1">
                            <div class="form-group">
                                <label>Nombre</label>
                                <input type="text" class="form-control" name="name" placeholder="Nombre" value="{{ old('name') }}" required>
                            </div>
                        </div>
                        <div class="col-md-6 pl-1">
                            <div class="form-group">
                                <label>Apellido</label>
                                <input type="text" class="form-control" name="lastname" placeholder="Apellido" value="{{ old('lastname') }}" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 pr-1">
                            <div class="form-group">
                                <label>Rol</label>
                                <select id="role" name="role" class="form-control">
                                    <option value="general" {{ old('role') == 'general' ? 'selected' : ''}}>General</option>
                                    <option value="superadmin" {{ old('role') == 'superadmin' ? 'selected' : ''}}>Superadmin</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 pl-1">
                            <div class="form-group">
                                <label>Contraseña</label>
                                <input type="password" class="form-control" name="password" value="{{ old('password') }}" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 pr-1"></div>
                        <div class="col-md-6 pl-1">
                            <div class="form-group">
                                <label>Confirmar contraseña</label>
                                <input type="confirm_password" class="form-control" name="confirm_password" value="{{ old('confirm_password') }}" required>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-ge pull-right save">
                        <i class="fa fa-save"></i> Guardar
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection