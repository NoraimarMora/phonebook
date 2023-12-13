<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Contact;
use App\Models\Email;
use App\Models\Group;
use App\Models\Phone;

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
                ->where('deleted', false)
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
        return view('contacts/create', [
            'groups' => Group::where('owner', Auth::user()->id)->get(),
        ]);
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
            $validator = Validator::make($request->all(), [
                'first_name' => 'required',
            ]);

            if($validator->fails()) {
                return redirect()->action('ContactController@create')->with('error', true)->withInput();
            }

            $contact                  = new Contact;
            $contact->first_name      = $request->first_name;
            $contact->second_name     = $request->second_name != null ? $request->second_name : "";
            $contact->first_lastname  = $request->first_lastname != null ? $request->first_lastname : "";
            $contact->second_lastname = $request->second_lastname != null ? $request->second_lastname : "";
            $contact->country         = $request->country != null ? $request->country : "";
            $contact->city            = $request->city != null ? $request->city : "";
            $contact->postal_code     = $request->postal_code != null ? $request->postal_code : "";
            $contact->address         = $request->address != null ? $request->address : "";
            $contact->province        = $request->province != null ? $request->provice : "";
            $contact->birth_date      = $request->birth_date;
            $contact->website         = $request->website != null ? $request->website : "";
            $contact->company         = $request->company != null ? $request->company : "";
            $contact->department      = $request->department != null ? $request->department : "";
            $contact->position        = $request->position != null ? $request->position : "";
            $contact->owner           = Auth::user()->id;
            
            for($i = 0; $i < count($request->phone_number); $i++) {
                $phone         = new Phone;
                $phone->number = $request->phone_number[$i] != null ? $request->phone_number[$i] : "";
                $phone->label  = $request->phone_label[$i] != null ? $request->phone_label[$i] : "";
                $phone->save();

                $contact->phones()->save($contact, [
                    'phone_id' => $phone->id,
                ]);
            }

            for($i = 0; $i < count($request->email_email); $i++) {
                $email        = new Email; 
                $email->email = $request->email_email[$i] != null ? $request->email_email[$i] : "";
                $email->label = $request->email_label[$i] != null ? $request->email_label[$i] : "";
                $email->save();

                $contact->emails()->save($contact, [
                    'email_id' => $email->id,
                ]);
            }

            $contact->save();

            foreach ($request->groups as $group) {
                $contact->groups()->save($contact, [
                    'group_id' => $group,
                ]);
            }

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

        $address = "";
        if($contact->country != "" || $contact->address != "" || $contact->province != "" || $contact->city != "") {
            if($contact->address != "") {
                $address .= $contact->address . " · ";
            }

            if($contact->city != "") {
                $address .= $contact->city . " · ";
            }

            if($contact->province != "") {
                $address .= $contact->province . " · ";
            }

            if($contact->country != "") {
                $address .= $contact->country;
            }
        }

        $job = "";
        if($contact->company != "" || $contact->position != "" || $contact->department != "") {
            if($contact->position != "") {
                $job .= $contact->position . " · ";
            }

            if($contact->department != "") {
                $job .= $contact->department . " · ";
            }

            if($contact->company != "") {
                $job .= $contact->company;
            }
        }

        return view('contacts/detail', [
            'contact' => $contact,
            'address' => trim($address, ' · '),
            'job' => trim($job, ' · '),
        ]);
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
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
        ]);

        if($validator->fails()) {
            return redirect()->action('ContactController@edit', ['id' => $id])->with('error', true)->withInput();
        }

        $contact = Contact::find($id);

        if(is_null($contact)) {
            return redirect()->action('ContactController@index')->with('error', true);
        }

        // Update contact info
        $contact->first_name      = $request->first_name;
        $contact->second_name     = $request->second_name != null ? $request->second_name : "";
        $contact->first_lastname  = $request->first_lastname != null ? $request->first_lastname : "";
        $contact->second_lastname = $request->second_lastname != null ? $request->second_lastname : "";
        $contact->country         = $request->country != null ? $request->country : "";
        $contact->city            = $request->city != null ? $request->city : "";
        $contact->postal_code     = $request->postal_code != null ? $request->postal_code : "";
        $contact->address         = $request->address != null ? $request->address : "";
        $contact->province        = $request->province != null ? $request->provice : "";
        $contact->birth_date      = $request->birth_date;
        $contact->website         = $request->website != null ? $request->website : "";
        $contact->company         = $request->company != null ? $request->company : "";
        $contact->department      = $request->department != null ? $request->department : "";
        $contact->position        = $request->position != null ? $request->position : "";
        
        // Delete phones
        foreach($contact->phones() as $phone) {
            $finded = false;
            foreach($request->phone_id as $phone_r) {
                if ($phone->id == $phone_r) {
                    $finded = true;
                    break;
                }
            }
            
            if(!$finded) {
                $phone->delete();
            }
        }
        
        // Update phones info
        for($i = 0; $i < count($request->phone_number); $i++) {
            $p = Phone::find($request->phone_id);

            if(is_null($p)) {
                $phone         = new Phone;
                $phone->number = $request->phone_number[$i] != null ? $request->phone_number[$i] : "";
                $phone->label  = $request->phone_label[$i] != null ? $request->phone_label[$i] : "";
                $phone->save();
    
                $contact->phones()->save($contact, [
                    'phone_id' => $phone->id,
                ]);

                continue;
            }

            $p->number = $request->phone_number[$i] != null ? $request->phone_number[$i] : "";
            $p->label  = $request->phone_label[$i] != null ? $request->phone_label[$i] : "";
            $p->save();

        }

        // Delete emails
        foreach($contact->emails() as $email) {
            $finded = false;
            foreach($request->email_id as $email_r) {
                if ($email->id == $email_r) {
                    $finded = true;
                    break;
                }
            }
            
            if(!$finded) {
                $email->delete();
            }
        }

        // Update emails info
        for($i = 0; $i < count($request->email_email); $i++) {
            $e = Email::find($request->email_id);

            if(is_null($e)) {
                $email        = new Email; 
                $email->email = $request->email_email[$i] != null ? $request->email_email[$i] : "";
                $email->label = $request->email_label[$i] != null ? $request->email_label[$i] : "";
                $email->save();
    
                $contact->emails()->save($contact, [
                    'email_id' => $email->id,
                ]);

                continue;
            }

            $e->email = $request->email_email[$i] != null ? $request->email_email[$i] : "";
            $e->label = $request->email_label[$i] != null ? $request->email_label[$i] : "";
            $e->save();
        }

        $contact->save();

        DB::table('contact_group')->where('contact_id', '=', $contact->id)->delete();

        foreach ($request->groups as $group) {
            $contact->groups()->save($contact, [
                'group_id' => $group,
            ]);
        }

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

        $contact->deleted = true;
        $contact->deleted_at = DB::raw('CURRENT_TIMESTAMP');
        $contact->save();

        return redirect()->action('ContactController@index')->with('success', true);
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

        $contact->deleted = false;
        $contact->deleted_at = null;
        $contact->save();

        return redirect()->action('ContactController@trash')->with('success', true);
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
        
        return redirect()->action('ContactController@index')->with('success', true);
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
