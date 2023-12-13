@extends('global')

@section('groups_active')
active
@endsection

@section('page_name')
Grupos/Etiquetas
@endsection

@section('content')
<div id="groups" class="row">
    <div class="col-lg-12">
        <div class="row filter-section">
            <div class="col-md-6"></div>
            <div class="col-md-6">
                <a class="btn btn-ge pull-right" href="{{ action('GroupController@create') }}">
                    <i class="fa fa-plus"></i> Nuevo
                </a>
            </div>
        </div>
        <x-groups-table :groups="$groups" />
    </div>
</div>
@endsection