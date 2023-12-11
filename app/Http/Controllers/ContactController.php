<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Contact;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('contacts/list', [
            'page_name'      => 'Contactos',
            'section_active' => 'contacts_active',
            'home'           => false,
            'trash'          => false,
            'contacts'       => Contact::where('owner', Auth::user()->id)->paginate(15), 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function trash()
    {
        return view('contacts/trash', [
            'trash'    => true,
            'contacts' => Contact::where('owner', Auth::user()->id)
                ->where('deleted', true)
                ->paginate(15),
        ]);
    }

    public function restore()
    {

    }

    public function markAsFavorite()
    {
        
    }

    public function favorites()
    {
        return view('contacts/list', [
            'page_name'      => 'Favoritos',
            'section_active' => 'favorites_active',
            'home'           => false,
            'trash'          => false,
            'contacts'       => Contact::where('owner', Auth::user()->id)
                ->where('favorite', true)
                ->paginate(15), 
        ]);
    }
}
