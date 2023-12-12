<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Group;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('groups/list', [
            'groups' => Group::where('owner', Auth::user()->id)->paginate(15),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('groups/create');
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
            $group                   = new Group;
            $group->name             = $request->name;
            $group->background_color = $request->background_color;
            $group->color            = $request->color;
            $group->created_at       = DB::raw('CURRENT_TIMESTAMP');

            $group->save();

            return redirect()->action('GroupController@index')->with('success', true);
        } catch(Exception $err) {
            return redirect()->action('GroupController@create')->with('error', true)->withInput();
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
        try {
            $group = Group::findOrFail($id);
        } catch(Exception $e) {
            return redirect()->action('GroupController@index')->withErrors(['Etiqueta no encontrada!']);
        }
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
        $group = Group::find($id);

        if(is_null($group)) {
            return redirect()->action('GroupController@index')->with('error', true);
        }

        // Update group info
        $group->name             = $request->name;
        $group->background_color = $request->background_color;
        $group->color            = $request->color;
        $group->updated_at       = DB::raw('CURRENT_TIMESTAMP');
        
        $group->save();

        return redirect()->action('GroupController@index')->with('success', true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $group = Group::find($id);

        if(is_null($group)) {
            return redirect()->action('GroupController@index')->with('error-delete', true);
        }

        $group->delete();
        return redirect()->action('GroupController@index')->with('success', 'delete');
    }
}
