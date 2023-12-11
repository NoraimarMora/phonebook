<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'Auth\AuthenticatedSessionController@create');

Route::middleware('guest')->group(function () {
    route::post('/login', 'Auth\AuthenticatedSessionController@login')->name('login');
});

Route::middleware('auth')->group(function () {
    Route::get('home', 'HomeController@index')->name('home');
    
    Route::resource('/contacts', 'ContactController');
    Route::resource('/groups', 'ContactController');
    Route::resource('/users', 'ContactController');

    // Additional routes
    Route::get('/contacts/favorites', 'ContactController@favorite')->name('contacts.favorite');
    Route::put('/contacts/{contact_id}/favorite', 'ContactController@markAsFavorite')->name('contacts.mark_as_favorite');
    Route::get('/trash', 'ContactController@trash')->name('trash');
    Route::post('/logout', 'Auth\AuthenticatedSessionController@logout')->name('logout');
});
