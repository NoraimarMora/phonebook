@extends('global')

@section('contacts_active')
active
@endsection

@section('page_name')
Nuevo contacto
@endsection

@section('content')
<form action="{{ action('ContactController@store') }}" method="POST">
    @csrf
                    
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Nombre</h4>
                </div>
                <div class="card-body form">
                    <div class="row">
                        <div class="col-md-6 pr-1">
                            <div class="form-group">
                                <label>Primer nombre</label>
                                <input type="text" class="form-control" name="first_name" placeholder="Primer nombre" value="{{ old('first_name') }}" required>
                            </div>
                        </div>
                        <div class="col-md-6 pl-1">
                            <div class="form-group">
                                <label>Segundo nombre</label>
                                <input type="text" class="form-control" name="second_name" placeholder="Segundo nombre" value="{{ old('second_name') }}" >
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 pr-1">
                            <div class="form-group">
                                <label>Primer apellido</label>
                                <input type="text" class="form-control" name="first_lastname" placeholder="Primer apellido" value="{{ old('first_lastname') }}" >
                            </div>
                        </div>
                        <div class="col-md-6 pl-1">
                            <div class="form-group">
                                <label>Segundo apellido</label>
                                <input type="text" class="form-control" name="second_lastname" placeholder="Segundo apellido" value="{{ old('second_lastname') }}" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Trabajo</h4>
                </div>
                <div class="card-body form">
                    <div class="row">
                        <div class="col-md-6 pr-1">
                            <div class="form-group">
                                <label>Empresa</label>
                                <input type="text" class="form-control" name="company" placeholder="Empresa" value="{{ old('company') }}" >
                            </div>
                        </div>
                        <div class="col-md-6 pl-1">
                            <div class="form-group">
                                <label>Puesto/Cargo</label>
                                <input type="text" class="form-control" name="position" placeholder="Puesto/Cargo" value="{{ old('position') }}" >
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 pr-1">
                            <div class="form-group">
                                <label>Departamento/Area</label>
                                <input type="text" class="form-control" name="department" placeholder="Departamento/Area" value="{{ old('department') }}" >
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Direccion</h4>
                </div>
                <div class="card-body form">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Pais</label>
                                <input type="text" class="form-control" name="country" placeholder="Pais" value="{{ old('country') }}" >
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Estado/Provincia</label>
                                <input type="text" class="form-control" name="province" placeholder="Estado/Provincia" value="{{ old('province') }}" >
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Ciudad</label>
                                <input type="text" class="form-control" name="city" placeholder="Ciudad" value="{{ old('city') }}" >
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label>Dirección</label>
                                <input type="text" class="form-control" name="address" placeholder="Dirección" value="{{ old('address') }}" >
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Código postal</label>
                                <input type="number" class="form-control" name="postal_code" placeholder="Código postal" value="{{ old('postal_code') }}" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Informacion adicional</h4>
                </div>
                <div class="card-body form">
                    <div class="row">
                        <div class="col-md-6 pr-1">
                            <div class="form-group">
                                <label>Fecha de nacimiento</label>
                                <input type="date" class="form-control" name="date" placeholder="Fecha de nacimiento" value="{{ old('date') }}" >
                            </div>
                        </div>
                        <div class="col-md-6 pl-1">
                            <div class="form-group">
                                <label>Sitio web</label>
                                <input type="url" class="form-control" name="website" placeholder="Sitio web" value="{{ old('website') }}" >
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        @if(count($groups))
                            <div class="col-md-6 pr-1">
                                <div class="form-group">
                                    <label>Grupos/Etiquetas</label>
                                    <select id="groups" name="groups[]" class="select-groups form-control" multiple >
                                        @foreach($groups as $group)
                                            <option value="{{ $group->id }}" {{ old('group') == $group->id ? 'selected' : ''}}>{{ $group->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="card-title">Teléfonos</h4>
                        </div>
                        <div class="col-md-6">
                            <a id="add_phone" class="btn btn-ge pull-right">
                                <i class="fa fa-plus"></i> Agregar teléfono
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body form">
                    <table class="table">
                        <tbody class="phones">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="card-title">Correos electrónicos</h4>
                        </div>
                        <div class="col-md-6">
                            <a id="add_email" class="btn btn-ge pull-right">
                                <i class="fa fa-plus"></i> Agregar correo
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body form">
                    <table class="table">
                        <tbody class="emails">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <button type="submit" class="btn btn-ge pull-right">
        <i class="fa fa-save"></i> Guardar
    </button>
</form>
@endsection