<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('users/list', [
            'users' => User::paginate(15),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
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
            $user             = new User;
            $user->name       = $request->name;
            $user->lastname   = $request->lastname;
            $user->role       = $request->role;
            $user->username   = strtolower($user->name)[0] . strtolower($user->lastname) . '.';
            $user->password   = bcrypt('temp123');
            $user->created_at = DB::raw('CURRENT_TIMESTAMP');
            $user->save();
    
            $user->username .= $user->id;
            $user->save();

            return redirect()->action('UserController@index')->with('success', true);
        } catch(Exception $err) {
            return redirect()->action('UserController@create')->with('error', true)->withInput();
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
        $user = User::find($id);

        if(is_null($user)) {
            return redirect()->action('UserController@index')->with('error', true);
        }

        // Update user info
        $user->role       = $request->role;
        $user->password   = bcrypt($request->password);
        $user->updated_at = DB::raw('CURRENT_TIMESTAMP');
        
        $user->save();

        return redirect()->action('UserController@index')->with('success', true);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if(is_null($user)) {
            return redirect()->action('UserController@index')->with('error-delete', true);
        }

        $user->delete();
        return redirect()->action('UserController@index')->with('success', 'delete');
    }
}
