<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function login(Request $request) {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if(! Auth::attempt($validated)){
            return response()-> json([
                'message' => 'Mot de passe ou email invalid'
            ], 401);
        };
        $user = User::where('email', $validated['email']) -> first();

        return response()-> json([
            "acces_token" => $user->createToken('api_token')->plainTextToken,
            
            "token_type" => 'Bearer'
        ]);
    }
    
}
