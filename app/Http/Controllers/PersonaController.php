<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Faker\Provider\ar_JO\Person;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //vista general
        return view('persona.home');
    }

    /**
     * Display a listing of the data.
     *
     * @return \Illuminate\Http\Response
     */
    public function listado()
    {
        //listado
        //$data = Persona::orderBy('id', 'DESC')->get();
        if (request()->ajax()) {
            $data = Persona::all();
            return response()->json($data);
        }
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

        if ($request->ajax()) {
            //pregunto si existe un dato en la base
            if (Persona::where('email', '=', strtolower($request->email))->count() > 0) {
                return response()->json(['valor' => 2]);
            } else {
                Persona::insert([
                    'nombres' => strtoupper($request->nombres),
                    'email' => strtolower($request->email),
                    'edad' => $request->edad,
                ]);

                return response()->json(['valor' => 1]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function show(Persona $persona)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        //obtener los datos
        if (request()->ajax()) {
            $data = Persona::findOrFail($id);
            return response()->json($data);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        if (request()->ajax()) {
            $data = request()->except('_token');
            $array = ([
                'nombres' => strtoupper($data['nombres']),
                'email' => strtolower($data['email']),
                'edad' => $data['edad'],
            ]);
            Persona::where('id', '=', $request->id)->update($array);
            return response()->json($data);
        }

        /*
        $data = Persona::findOrFail($request->id)->update([
            'nombres' => strtoupper($request->nombres),
            'email' => strtolower($request->email),
            'edad' => $request->edad,
        ]);*/
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //eliminar
        if (request()->ajax()) {
            Persona::destroy($id);
            return response()->json(['success' => 1]);
        }
    }
}
