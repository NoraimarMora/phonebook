@extends('global')

@section($section_active)
active
@endsection

@section('page_name')
{{ $page_name }}
@endsection

@section('content')
<div id="contacts" class="row">
    <div class="col-lg-12">
        <div class="row filter-section">
            <div class="col-md-6"></div>
            <div class="col-md-6">
                <a class="btn btn-ge pull-right" href="{{ action('ContactController@create') }}">
                    <i class="fa fa-plus"></i> Nuevo
                </a>
            </div>
        </div>
        <x-contacts-table :contacts="$contacts" :home="$home" />
    </div>
</div>
@endsection