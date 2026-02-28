<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    public function index()
    {
        // Ataovy azo antoka fa mamerina data izy
        $teams = \App\Models\Team::orderBy('id', 'asc')->get();
        return response()->json($teams); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('teams', 'public');
        }

        $member = Team::create([
            'name' => $request->name,
            'role' => $request->role,
            'img'  => $path, 
        ]);

        return response()->json([
            'message' => 'Membre ajouté avec succès',
            'data' => $member
        ], 201);
    }


    public function update(Request $request, $id)
    {
        $member = Team::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'role'  => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        if ($request->hasFile('image')) {
 
            if ($member->img) {
                Storage::disk('public')->delete($member->img);
            }

            $member->img = $request->file('image')->store('teams', 'public');
        }

        $member->name = $request->name;
        $member->role = $request->role;
        $member->save();

        return response()->json([
            'message' => 'Membre mis à jour avec succès',
            'data' => $member
        ], 200);
    }


    public function destroy($id)
    {
        $member = Team::findOrFail($id);


        if ($member->img) {
            Storage::disk('public')->delete($member->img);
        }

        $member->delete();

        return response()->json([
            'message' => 'Membre supprimé avec succès'
        ], 200);
    }
}