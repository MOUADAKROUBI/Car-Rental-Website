<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Str;


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
            'sqft' => 'required|numeric',
            'furnished' => 'required|boolean',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'available' => 'required|boolean',
        ]);

        $photo1Path = '';
        $photo2Path = '';
        if ($request->hasFile('photo1')) {
            $photo1 = $request->file('photo1');
            $photo1Path = 'uploads/' . Str::uuid()->toString() . '.' . $photo1->getClientOriginalExtension();
            $photo1->move(public_path('uploads'), $photo1Path);
        }
        if ($request->hasFile('photo2')) {
            $photo2 = $request->file('photo2');
            $photo2Path = 'uploads/' . Str::uuid()->toString() . '.' . $photo2->getClientOriginalExtension();
            $photo2->move(public_path('uploads'), $photo2Path);
        }

        DB::table('homes')->insert([
            'photo1' => $photo1Path,
            'photo2' => $photo2Path,
            'type' => $request->type,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
            'price' => $request->price,
            'sqft' => $request->sqft,
            'furnished' => $request->furnished,
            'bedrooms' => $request->bedrooms,
            'bathrooms' => $request->bathrooms,
            'available' => $request->available,
        ]);

        return response()->json(['success' => true, 'message' => 'your data is insert correctly, thank you'], 201);
    }

    public function update(Request $request, $id)
    {
        $home = Home::findOrFail($id);

        $request->validate([
            'photo1' => 'required|file',
            'photo2' => 'required|file', // 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048
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

        $photo1Path = '';
        $photo2Path = '';
        if ($request->hasFile('photo1')) {
            $photo1 = $request->file('photo1');
            $photo1Path = 'uploads/' . Str::uuid()->toString() . '.' . $photo1->getClientOriginalExtension();
            $photo1->move(public_path('uploads'), $photo1Path);
        }
        if ($request->hasFile('photo2')) {
            $photo2 = $request->file('photo2');
            $photo2Path = 'uploads/' . Str::uuid()->toString() . '.' . $photo2->getClientOriginalExtension();
            $photo2->move(public_path('uploads'), $photo2Path);
        }

        DB::table('homes')->where('id', $id)->update([
            'photo1' => $photo1Path,
            'photo2' => $photo2Path, // 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048
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
