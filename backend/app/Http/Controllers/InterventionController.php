<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InterventionController extends Controller
{
    // AMPIO ITY FONCTION ITY mba hivoaka ny lisitra
    public function index()
    {
        // Maka ny interventions rehetra ary mandamina azy (vaovao indrindra no eo ambony)
        $interventions = Intervention::orderBy('created_at', 'desc')->get();
        
        // Averina ho JSON mivantana
        return response()->json($interventions);
    }

    public function store(Request $request)
    {
        // ... (ny store efa misy teo aloha, tsy ovaina) ...
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'location'    => 'required|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->only(['title', 'description', 'location']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('interventions', 'public');
            $data['image'] = $path;
        }

        $intervention = Intervention::create($data);

        return response()->json([
            'message' => 'Enregistrement réussi !',
            'intervention' => $intervention
        ], 201);
    }

    // 1. Mba hangalana ny data-n'ny intervention iray (ity no nampisy erreur teo)
public function show($id)
{
    $intervention = Intervention::find($id);
    if (!$intervention) {
        return response()->json(['message' => 'Intervention non trouvée'], 404);
    }
    return response()->json($intervention);
}

// 2. Mba hitahirizana ny fanovana
public function update(Request $request, $id)
{
    $intervention = Intervention::find($id);
    if (!$intervention) {
        return response()->json(['message' => 'Intervention non trouvée'], 404);
    }

    $request->validate([
        'title'       => 'required|string|max:255',
        'description' => 'required|string',
        'location'    => 'required|string',
        'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $data = $request->only(['title', 'description', 'location']);

    if ($request->hasFile('image')) {
        // Fafana ny sary taloha raha misy vaovao
        if ($intervention->image) {
            Storage::disk('public')->delete($intervention->image);
        }
        $path = $request->file('image')->store('interventions', 'public');
        $data['image'] = $path;
    }

    $intervention->update($data);

    return response()->json([
        'message' => 'Mise à jour réussie !',
        'intervention' => $intervention
    ]);
}

public function togglePublish($id)
{
    $intervention = Intervention::find($id);
    
    if (!$intervention) {
        return response()->json(['message' => 'Intervention non trouvée'], 404);
    }

    // Avadika izay sata eo (raha false lasa true, raha true lasa false)
    $intervention->is_published = !$intervention->is_published;
    $intervention->save();

    return response()->json([
        'message' => $intervention->is_published ? 'Publié avec succès !' : 'Mis en brouillon.',
        'is_published' => $intervention->is_published
    ]);
}
    
    // AMPIO KOA ITY raha hanao famafana ianao (Delete)
    public function destroy($id)
    {
        $intervention = Intervention::find($id);
        if (!$intervention) {
            return response()->json(['message' => 'Non trouvé'], 404);
        }
        
        // Fafana koa ny sary ao amin'ny storage raha misy
        if ($intervention->image) {
            Storage::disk('public')->delete($intervention->image);
        }
        
        $intervention->delete();
        return response()->json(['message' => 'Supprimé avec succès']);
    }
}