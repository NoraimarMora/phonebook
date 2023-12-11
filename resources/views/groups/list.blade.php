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
        <x-groups-table :groups="$groups" />
    </div>
</div>
@endsection