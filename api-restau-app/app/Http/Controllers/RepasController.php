<?php

namespace App\Http\Controllers;
use App\Http\Resources\RepasResource;
use App\Http\Resources\RepasCollection;
use App\Http\Requests\StoreRepasRequest;
use App\Http\Requests\UpdateRepasRequest;
use App\Models\Repas;
use Illuminate\Http\Request; 

class RepasController extends Controller
{
    public function index(Request $request) {
        return new RepasCollection(Repas::paginate());
    }
    public function show(Request  $request, Repas $repa ) {
        // echo($repa);
        return new RepasResource($repa);
    }
    public function store(StoreRepasRequest  $request ) {
        $validated = $request->validated();
        // echo $validated;
        $repas = Repas::create($validated);
        return new RepasResource($repas); 
    }
    
    public function update(updateRepasRequest $request, repas $repa) {
        $validated = $request-> validated();
        $repa->update($validated);
        // echo($repa);
        return new RepasResource($repa);
    }
    
    public function destroy(updateRepasRequest $request, repas $repa) {
       $repa->delete();
        return response() -> noContent();
    }

}
