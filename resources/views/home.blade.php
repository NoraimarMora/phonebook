@extends('global')

@section('home_active')
active
@endsection

@section('page_name')
Inicio
@endsection

@section('content')
<div id="home" class="content">
    <div class="row">
        <div class="col-lg-4">
            <div class="card card-stats">
                <div class="card-body contacts">
                    <div class="statistics statistics-horizontal">
                        <div class="info info-horizontal">
                            <div class="row">
                                <div class="col-5">
                                    <div class="icon icon-primary icon-circle">
                                        <i class="fa fa-user-friends"></i>
                                    </div>
                                </div>
                                <div class="col-7 text-right value">
                                    <h3 class="info-title">{{ $stats['contacts'] }}</h3>
                                    <h6 class="stats-title">contactos</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card card-stats">
                <div class="card-body favorites">
                    <div class="statistics statistics-horizontal">
                        <div class="info info-horizontal">
                            <div class="row">
                                <div class="col-5">
                                    <div class="icon icon-primary icon-circle">
                                        <i class="fa fa-heart"></i>
                                    </div>
                                </div>
                                <div class="col-7 text-right value">
                                    <h3 class="info-title">{{ $stats['favorites'] }}</h3>
                                    <h6 class="stats-title">favoritos</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card card-stats">
                <div class="card-body tags">
                    <div class="statistics statistics-horizontal">
                        <div class="info info-horizontal">
                            <div class="row">
                                <div class="col-5">
                                    <div class="icon icon-primary icon-circle">
                                        <i class="fa fa-tags"></i>
                                    </div>
                                </div>
                                <div class="col-7 text-right value">
                                    <h3 class="info-title">{{ $stats['groups'] }}</h3>
                                    <h6 class="stats-title">grupos/etiquetas</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <h2>Últimos contactos añadidos</h2>
            <x-contacts-table :contacts="$last_contacts" :home="$home" />
        </div>
    </div>
</div>
@endsection