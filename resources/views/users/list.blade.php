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
        <x-users-table :users="$users" />
    </div>
</div>
@endsection