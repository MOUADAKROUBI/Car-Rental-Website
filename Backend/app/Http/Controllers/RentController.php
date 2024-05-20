<?php

namespace App\Http\Controllers;

use App\Models\Home;
use Illuminate\Http\Request;
use App\Models\Rent;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RentController extends Controller
{
    // Get all rents
    public function index()
    {
        $rents = Rent::with('user', 'home')->get();

        // Transform the data to include user name and home name
        $formattedRents = $rents->map(function ($rent) {
            return [
                'id' => $rent->id,
                'checkIn' => $rent->checkIn,
                'checkOut' => $rent->checkOut,
                'price' => $rent->price,
                'user_name' => $rent->user->firstname . ' ' . $rent->user->lastname,
                'home_type' => $rent->home->type
            ];
        });

        return response()->json(['success' => true, 'data' => $formattedRents]);
    }

    // Create a new rent
    public function store(Request $request)
    {
        //$rent = Rent::create($request->all());
        $rent = DB::table('rentals')->insert([
            'checkIn' => $request->input('checkIn'),
            'checkOut' => $request->input('checkOut'),
            'price' => $request->input('price'),
            'user_id' => $request->input('user_id'),
            'home_id' => $request->input('home_id')
        ]);
        return response()->json(['success' => true, 'data' => $rent], 201);
    }

    // Get rents of a specific user
    public function getUserRents($user_id)
    {
        //$rents = Rent::where('user_id', $user_id)->get();
        $user = User::with('rents.home')->find($user_id);
        $rents = $user->rents;

        return response()->json(['success' => true, 'data' => $rents]);
    }

    public function update(Request $request, $id)
    {
        $rent = Rent::findOrFail($id);

        $request->validate([
            'checkIn' => 'required',
            'checkOut' => 'required',
            'price' => 'required',
            'user_id' => 'required',
            'home_id' => 'required',
        ]);

        DB::table('rentals')->where('id', $id)->update([
            'checkIn' => $request->checkIn,
            'checkOut' => $request->checkOut,
            'price' => $request->price,
            'user_id' => $request->user_id,
            'home_id' => $request->home_id
        ]);

        return response()->json([
            'data' => $rent,
            'message' => 'Rent updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $rent = Rent::find($id);

        if (!$rent) {
            return response()->json(['success' => false, 'message' => 'Rent not found'], 404);
        }

        $rent->delete();

        return response()->json(['success' => true, 'message' => 'Rent deleted successfully']);
    }
}
