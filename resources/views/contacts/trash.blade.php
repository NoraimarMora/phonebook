@extends('global')

@section('trash_active')
active
@endsection

@section('page_name')
Papelera
@endsection

@section('content')
<div id="contacts" class="row">
    <div class="col-lg-12">
        <x-trash-table :contacts="$contacts" />
    </div>
</div>
@endsection