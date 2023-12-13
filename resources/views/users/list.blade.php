@extends('global')

@section('users_active')
active
@endsection

@section('page_name')
Usuarios
@endsection

@section('content')
<div id="users" class="row">
    <div class="col-lg-12">
        <div class="row filter-section">
            <div class="col-md-6"></div>
            <div class="col-md-6">
                <a class="btn btn-ge pull-right" href="{{ action('UserController@create') }}">
                    <i class="fa fa-plus"></i> Nuevo
                </a>
            </div>
        </div>
        <x-users-table :users="$users" />
    </div>
</div>
@endsection