@extends('global')

@section('contacts_active')
active
@endsection

@section('page_name')
Nuevo contacto
@endsection

@section('content')
<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Informacion básica</h4>
            </div>
            <div class="card-body">
                <div class="row contact-detail">
                    <div class="col-md-12">
                        <i class="fa fa-user"></i>
                        <span>
                             {{ $contact->first_name }}
                            @if($contact->second_name)
                                 {{ $contact->second_name }}
                            @endif
                            @if($contact->first_lastname)
                                 {{ $contact->first_lastname }}
                            @endif
                            @if($contact->second_lastname)
                                 {{ $contact->second_lastname }}
                            @endif
                        </span>
                    </div>
                </div>
                @if(count($contact->groups) > 0)
                    <div class="row contact-detail">
                        <div class="col-md-12">
                            <i class="fa fa-tags"></i>
                            <x-groups :groups="$contact->groups" />
                        </div>
                    </div>
                @endif
                @if($contact->birth_date != null)
                    <div class="row contact-detail">
                        <div class="col-md-12">
                            <i class="fa fa-calendar"></i>
                            <span> {{ $contact->birth_date }}</span>
                        </div>
                    </div>
                @endif
                @if($address)
                    <div class="row contact-detail">
                        <div class="col-md-12">
                            <i class="fa fa-map-pin"></i>
                            <span> {{ $address }}</span>
                        </div>
                    </div>
                @endif
                @if($job)
                    <div class="row contact-detail">
                        <div class="col-md-12">
                            <i class="fa fa-briefcase"></i>
                            <span> {{ $job }}</span>
                        </div>
                    </div>
                @endif
                @if($contact->website)
                    <div class="row contact-detail">
                        <div class="col-md-6 pr-1">
                            <i class="fa fa-globe"></i>
                            <span> {{ $contact->website }}</span>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Informacion de contacto</h4>
            </div>
            <div class="card-body">
                @if(count($contact->phones) > 0 || count($contact->emails) > 0)
                    @if(count($contact->phones) > 0)
                        @foreach($contact->phones as $phone)
                            <div class="row contact-detail">
                                <div class="col-md-12">
                                    <i class="fa fa-phone"></i>
                                    <span>
                                        {{ $phone->number }}
                                        @if($phone->label != "")
                                             ({{ $phone->label }})
                                        @endif
                                    </span>
                                </div>
                            </div>
                        @endforeach
                    @endif
                    @if(count($contact->emails) > 0)
                        @foreach($contact->emails as $email)
                            <div class="row contact-detail">
                                <div class="col-md-12">
                                    <i class="fa fa-at"></i>
                                    <span>
                                        {{ $email->email }}
                                        @if($email->label != "")
                                             ({{ $email->label }})
                                        @endif
                                    </span>
                                </div>
                            </div>
                        @endforeach
                    @endif
                @else
                    <div class="empty">
                        <img src="{{ asset('img/emptylabelicon_1x.png') }}" />
                        <p>No se han encontrado registros</p>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection