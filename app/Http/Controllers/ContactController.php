<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            'contacts'       => Contact::where('owner', Auth::user()->id)
                ->orderBy('first_name', 'asc')
                ->orderBy('first_lastname', 'asc')
                ->paginate(15), 
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
        try {
            $contact                  = new Contact;
            $contact->first_name      = $request->first_name;
            $contact->second_name     = $request->second_name;
            $contact->first_lastname  = $request->first_lastname;
            $contact->second_lastname = $request->second_lastname;
            $contact->country         = $request->country;
            $contact->city            = $request->city;
            $contact->postal_code     = $request->postal_code;
            $contact->address         = $request->address;
            $contact->address_2       = $request->address_2;
            $contact->province        = $request->province;
            $contact->birth_date      = $request->birth_date;
            $contact->website         = $request->website;
            $contact->company         = $request->company;
            $contact->department      = $request->department;
            $contact->position        = $request->position;
            $contact->created_at      = DB::raw('CURRENT_TIMESTAMP');
            
            // Update phones info
            foreach($request->phones as $phone) {
                $contact->phones()->save($contact, [
                    'number' => $p->number,
                    'label'  => $p->label,
                ]);
            }

            // Update emails info
            foreach($request->emails as $email) {
                $contact->emails()->save($contact, [
                    'email' => $p->email,
                    'label'  => $p->label,
                ]);
            }

            $contact->save();

            return redirect()->action('ContactController@index')->with('success', true);
        } catch(Exception $err) {
            return redirect()->action('ContactController@create')->with('error', true)->withInput();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contact = Contact::find($id);

        if(is_null($contact)) {
            return redirect()->action('ContactController@index')->with('error', true);
        }

        return view('contacts/detail', ['contact' => $contact]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $contact = Contact::find($id);

        if(is_null($contact)) {
            return redirect()->action('ContactController@index')->with('error', true);
        }

        return view('contacts/edit', ['contact' => $contact]);
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
        $contact = Contact::find($id);

        if(is_null($contact)) {
            return redirect()->action('ContactController@index')->with('error', true);
        }

        // Update contact info
        $contact->first_name      = $request->first_name;
        $contact->second_name     = $request->second_name;
        $contact->first_lastname  = $request->first_lastname;
        $contact->second_lastname = $request->second_lastname;
        $contact->country         = $request->country;
        $contact->city            = $request->city;
        $contact->postal_code     = $request->postal_code;
        $contact->address         = $request->address;
        $contact->address_2       = $request->address_2;
        $contact->province        = $request->province;
        $contact->birth_date      = $request->birth_date;
        $contact->website         = $request->website;
        $contact->company         = $request->company;
        $contact->department      = $request->department;
        $contact->position        = $request->position;
        $contact->updated_at      = DB::raw('CURRENT_TIMESTAMP');
        
        // Update phones info
        foreach($request->phones as $phone) {
            $contact->phones()->save($contact, [
                'number' => $p->number,
                'label'  => $p->label,
            ]);
        }

        // Update emails info
        foreach($request->emails as $email) {
            $contact->emails()->save($contact, [
                'email' => $p->email,
                'label'  => $p->label,
            ]);
        }

        $contact->save();

        return redirect()->action('ContactController@index')->with('success', true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contact::find($id);

        if(is_null($contact)) {
            return redirect()->action('ContactController@index')->with('error', true);
        }

        $contact->delete = true;
        $contact->delete_at = DB::raw('CURRENT_TIMESTAMP');
        $contact->save();

        return redirect()->action('ContactController@index')->with('success', 'restore');
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

    public function restore($id)
    {
        $contact = Contact::find($id);

        if(is_null($contact)) {
            return redirect()->action('ContactController@trash')->with('error', true);
        }

        $contact->delete = false;
        $contact->delete_at = null;
        $contact->save();

        return redirect()->action('ContactController@trash')->with('success', 'restore');
    }

    public function markAsFavorite($id)
    {
        $contact = Contact::find($id);

        if(is_null($contact)) {
            return redirect()->action('ContactController@index')->with('error', true);
        }

        if($contact->favorite) {
            $contact->favorite = false;
        } else {
            $contact->favorite = true;
        }
        $contact->save();
        
        return redirect()->action('ContactController@index')->with('success', 'favorite');
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
