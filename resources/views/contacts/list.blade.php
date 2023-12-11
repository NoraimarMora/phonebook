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
        <x-contacts-table :contacts="$contacts" :home="$home" />
    </div>
</div>
@endsection