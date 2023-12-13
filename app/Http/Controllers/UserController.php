<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
        return view('users/create');
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
                'name'     => 'required',
                'lastname' => 'required',
            ]);

            if($validator->fails() || $request->password != $request->confirm_password) {
                return redirect()->action('UserController@create')->with('error', true)->withInput();
            }

            $user             = new User;
            $user->name       = $request->name;
            $user->lastname   = $request->lastname;
            $user->role       = $request->role;
            $user->username   = strtolower($user->name)[0] . strtolower($user->lastname) . '.';
            $user->password   = bcrypt($request->password);
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
        try {
            $user = User::findOrFail($id);

            return view('users/edit', [
                'user' => $user
            ]);
        } catch(Exception $e) {
            return redirect()->action('UserController@index')->with('error', true);
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
            'name'     => 'required',
            'lastname' => 'required',
        ]);

        if($validator->fails() || ($request->filled('password') && $request->has('password') && $request->password != $request->confirm_password)) {
            return redirect()->action('GroupController@edit', ['id' => $id])->with('error', true)->withInput();
        }


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
