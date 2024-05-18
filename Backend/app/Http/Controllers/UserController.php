<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function index()
    {
        $users = User::select()->get();
        return response()->json(['success' => true, 'data' => $users], 200);
    }

    public function getUser(Request $request, $id)
    {
        $user = User::find($id);
        return response()->json(['success' => true, 'data' => $user], 200);
    }

    public function signup(Request $request)
    {
        $validated = $request->validate([
            'firstname' => 'required|min:2|max:20',
            'lastname' => 'required|min:2|max:20',
            'telephone' => 'required|min:10|max:11',
            'email' => 'required|email|unique:users'
        ]);
        if ($validated) {
            DB::table('users')->insert([
                'firstname' => $request->input('firstname'),
                'lastname' => $request->input('lastname'),
                'telephone' => $request->input('telephone'),
                'email' => $request->input('email'),
                'password' => $request->input('password')
            ]);
        }
    }

    public function login(Request $request)
    {

        $email = $request->input('email');

        $user = User::where('email', $email)->first();
        $password = $user ? $user->password : null;

        if (!$user)
            return response()->json(['success' => false, 'message' => 'Login Fail, no matches in our database']);

        if (Auth::check()) {
            $user = Auth::user();

            session(['id' => $user->id]);
        }

        return response()->json(['success' => true, 'message' => 'We\'ve found a match', 'data' => $user, 'pass' => $password], 200);
    }

    public function logout()
    {
        session()->flush();
        Auth::logout();
        return response()->json(['message' => 'Logout successful']);
    }

    public function updateProfile(Request $request, $user_id)
    {
        $user = User::find($user_id);

        $request->validate([
            'avatar' => 'file|mimes:jpeg,png,jpg,webp|max:2048',
            'firstname' => 'required|min:2|max:20',
            'lastname' => 'required|min:2|max:20',
            'email' => 'required|email|unique:users,email,' . $user_id . ',id',
            'telephone' => 'required|min:10|max:11',
        ]);

        if ($request->hasFile('avatar')) {
            $avatar = $user->avatar;
            if ($avatar) {
                unlink(public_path($avatar));
            }

            $file = $request->file('avatar');
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads'), $fileName);
            $avatarPath = 'uploads/' . $fileName;
        } else {
            $avatarPath = null;
        }

        DB::table('users')->where('id', $user_id)->update([
            'avatar' => $avatarPath,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'telephone' => $request->telephone,
        ]);

        return response()->json(['success' => true, 'message' => 'Profile updated successfully', 'data' => $user]);

    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user = User::findOrFail($id);

        $request->validate([
            'avatar' => 'file|mimes:jpeg,png,jpg,webp|max:2048',
            'firstname' => 'required|min:2|max:20',
            'lastname' => 'required|min:2|max:20',
            'email' => 'required|email|unique:users,email,' . $id . ',id',
            'telephone' => 'required|min:10|max:11',
        ]);

        if ($request->hasFile('avatar')) {
            $avatar = $user->avatar;
            if ($avatar) {
                unlink(public_path($avatar));
            }

            $file = $request->file('avatar');
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads'), $fileName);
            $avatarPath = 'uploads/' . $fileName;
        } else {
            $avatarPath = null;
        }

        DB::table('users')->where('id', $id)->update([
            'avatar' => $avatarPath,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'telephone' => $request->telephone,
            'email' => $request->email,
        ]);

        return response()->json([
            'data' => $user,
            'message' => 'User updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['success' => true, 'message' => 'User deleted successfully']);
    }

}
