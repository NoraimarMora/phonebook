<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contacts = DB::table('contacts')
                    ->select(DB::raw('COUNT(id) AS contacts'))
                    ->where('owner', '=', Auth::user()->id)
                    ->get();

        $favorites = DB::table('contacts')
                    ->select(DB::raw('COUNT(id) AS favorites'))
                    ->where('owner', '=', Auth::user()->id)
                    ->where('favorite', '=', true)
                    ->get();

        $groups_sub = DB::table('contact_group')
                        ->join('contacts', 'contact_group.contact_id', '=', 'contacts.id')
                        ->select(DB::raw('DISTINCT(contact_group.group_id) AS group_id'))
                        ->where('contacts.owner', '=', Auth::user()->id);
        
        $groups = DB::table('groups')
                    ->joinSub($groups_sub, 'contact_groups', function ($join) {
                        $join->on('groups.id', '=', 'contact_groups.group_id');
                    })
                    ->select(DB::raw('COUNT(groups.id) AS groups'))
                    ->get();

        $stats = [
            'contacts'  => $contacts[0]->contacts,
            'favorites' => $favorites[0]->favorites,
            'groups'    => $groups[0]->groups,
        ];
                    
        $last_contacts = $this->getLastContacts();

        return view('home', [
            'stats'         => $stats, 
            'last_contacts' => $last_contacts,
            'home'          => true,
        ]);
    }

    public function getLastContacts()
    {
        $phones_sub = DB::table('contact_phone')
                        ->join('phones', 'contact_phone.phone_id', '=', 'phones.id')
                        ->select(DB::raw('DISTINCT(contact_phone.contact_id) AS contact_id, phones.number'))
                        ->groupBy('contact_phone.contact_id')
                        ->orderBy('contact_phone.created_at')
                        ->limit(1);

        $emails_sub = DB::table('contact_email')
                        ->join('emails', 'contact_email.email_id', '=', 'emails.id')
                        ->select(DB::raw('DISTINCT(contact_email.contact_id) AS contact_id, emails.email'))
                        ->groupBy('contact_email.contact_id')
                        ->orderBy('contact_email.created_at')
                        ->limit(1);
        
        $groups_sub = DB::table('contact_group')
                        ->join('contacts', 'contact_group.contact_id', '=', 'contacts.id')
                        ->select('contact_group.contact_id', 'contact_group.group_id')
                        ->groupBy('contact_group.contact_id');

        $groups_sub_2 = DB::table('groups')
                            ->joinSub($groups_sub, 'contact_groups', function ($join) {
                                $join->on('groups.id', '=', 'contact_groups.group_id');
                            })
                            ->select(DB::raw("contact_groups.contact_id, GROUP_CONCAT(JSON_ARRAY(groups.name, groups.color, groups.background_color)) AS groups"));

        $last_contacts = DB::table('contacts')
                            ->joinSub($groups_sub_2, 'contact_groups_2', function ($join) {
                                $join->on('contacts.id', '=', 'contact_groups_2.contact_id');
                            })
                            ->joinSub($phones_sub, 'contact_phones', function ($join) {
                                $join->on('contacts.id', '=', 'contact_phones.contact_id');
                            })
                            ->joinSub($emails_sub, 'contact_emails', function ($join) {
                                $join->on('contacts.id', '=', 'contact_emails.contact_id');
                            })
                            ->select(DB::raw('contacts.*, contact_emails.email, contact_phones.number, contact_groups_2.groups'))
                            ->orderBy('contacts.created_at', 'desc')
                            ->limit(5)
                            ->get();

        return $last_contacts;
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
}
