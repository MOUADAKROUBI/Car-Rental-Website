<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class HomeController extends Controller
{
    public function index()
    {
        $homes = Home::select()->get();
        return response()->json(['success' => true, 'data' => $homes], 200);
    }

    public function show($id)
    {
        $home = DB::table('homes')->where('id', $id)->get();
        return response()->json(['success' => true, 'data' => $home], 200);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'photo1' => 'required|file',
            'photo2' => 'required|file',
            'type' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'country' => 'required|string',
            'price' => 'required|numeric',
            'sqrt' => 'required|numeric',
            'furnished' => 'required|boolean',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'available' => 'required|boolean',
        ]);

        if ($request->hasFile('photo1')) {
            $file = $request->file('photo1');
            $fileName = $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
        }
        if ($request->hasFile('photo2')) {
            $file = $request->file('photo2');
            $fileName = $file->getClientOriginalName();
            $file->move(public_path('uploads'), $fileName);
        }

        DB::table('homes')->insert([
            'photo1' => 'uploads/' . $request->photo1->getClientOriginalName(),
            'photo2' => 'uploads/' . $request->photo2->getClientOriginalName(),
            'type' => $request->type,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
            'price' => $request->price,
            'sqrt' => $request->sqrt,
            'furnished' => $request->furnished,
            'bedrooms' => $request->bedrooms,
            'bathrooms' => $request->bathrooms,
            'available' => $request->available
        ]);

        return response()->json(['success' => true, 'data' => 'okok'], 201);
    }

    public function update(Request $request, $id)
    {
        $home = Home::findOrFail($id);

        $validatedData = $request->validate([
            'type' => 'required',
            'address' => 'required',
            'city' => 'required',
            'country' => 'required',
            'price' => 'required',
            'sqrt' => 'required',
            'furnished' => 'required',
            'bedrooms' => 'required',
            'bathrooms' => 'required',
            'available' => 'required',
        ]);

        DB::table('homes')->where('id', $id)->update([
            'type' => $request->type,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
            'price' => $request->price,
            'sqrt' => $request->sqrt,
            'furnished' => $request->furnished,
            'bedrooms' => $request->bedrooms,
            'bathrooms' => $request->bathrooms,
            'available' => $request->available
        ]);

        return response()->json([
            'data' => $home,
            'message' => 'Home updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $home = Home::find($id);

        if (!$home) {
            return response()->json(['success' => false, 'message' => 'Home not found'], 404);
        }

        $home->delete();

        return response()->json(['success' => true, 'message' => 'Home deleted successfully']);
    }
}
