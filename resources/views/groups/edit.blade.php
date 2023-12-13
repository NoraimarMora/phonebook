@extends('global')

@section('groups_active')
active
@endsection

@section('page_name')
Editar grupo/etiqueta
@endsection

@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body form @if(session('error')) error @endif">
                <form action="{{ action('GroupController@update', $group->id) }}" method="POST">
                    @method('PUT')
                    @csrf
                    
                    <div class="row">
                        <div class="col-md-6 pr-1">
                            <div class="form-group">
                                <label>Nombre</label>
                                <input type="text" class="form-control" name="name" placeholder="Nombre" value="{{ $group->name }}" required>
                            </div>
                        </div>
                        <div class="col-md-6 pl-1">
                            <div class="form-group">
                                <label>Color de fondo</label>
                                <input type="color" class="form-control" name="background_color" value="{{ $group->background_color }}" >
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 pr-1">
                            <div class="form-group">
                                <label>Color de texto</label>
                                <input type="color" class="form-control" name="color" value="{{ $group->color }}" >
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-ge pull-right">
                        <i class="fa fa-save"></i> Guardar
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection