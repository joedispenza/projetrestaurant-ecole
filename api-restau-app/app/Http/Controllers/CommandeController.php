<?php

namespace App\Http\Controllers;
use App\Http\Resources\CommandeResource;
use App\Http\Resources\CommandeCollection;
use App\Http\Requests\StoreCommandeRequest;
use App\Http\Requests\UpdateCommandeRequest;
use App\Models\Commande;
use Illuminate\Http\Request; 
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Http\Request;

class CommandeController extends Controller
{
    public function index(Request $request) {
        
        $commandes = QueryBuilder::for(Commande::class)
        ->allowedFilters('is_available')
        ->defaultSort('-created_at')
        ->paginate();
        
        return new CommandeCollection($commandes);
    }
    public function show(Request  $request, Commande $commande ) {
        // echo($repa);
        return new CommandeResource($commande);
    }
    public function store(StoreCommandeRequest  $request ) {
        $validated = $request->validated();
        // echo $validated;
        $commande = Auth::user()->commandes()->create($validated);
        return new CommandeResource($commande); 
    }
    
    public function update(updateCommandeRequest $request, Commande $commande) {
        $validated = $request-> validated();
        $commande->update($validated);
        // echo($repa);
        return new commandeResource($commande);
    }
    
    public function destroy(updateCommandeRequest $request, Commande $commande) {
       $commande->delete();
        return response() -> noContent();
    }

}
