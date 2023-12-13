<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
            $validator = Validator::make($request->all(), [
                'name' => 'required',
            ]);

            if($validator->fails()) {
                return redirect()->action('GroupController@create')->with('error', true)->withInput();
            }

            $group                   = new Group;
            $group->name             = $request->name;
            $group->background_color = $request->background_color;
            $group->color            = $request->color;
            $group->owner            = Auth::user()->id;

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

            return view('groups/edit', [
                'group' => $group
            ]);
        } catch(Exception $e) {
            return redirect()->action('GroupController@index')->with('error', true);
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
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if($validator->fails()) {
            return redirect()->action('GroupController@edit', ['id' => $id])->with('error', true)->withInput();
        }

        $group = Group::find($id);

        if(is_null($group)) {
            return redirect()->action('GroupController@edit', ['id' => $id])->with('error', true)->withInput();
        }

        // Update group info
        $group->name             = $request->name;
        $group->background_color = $request->background_color;
        $group->color            = $request->color;
        
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
