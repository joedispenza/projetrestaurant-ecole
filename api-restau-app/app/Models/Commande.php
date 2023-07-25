<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;    
use Illuminate\Contracts\Database\Eloquent\Builder; 
use Illuminate\Support\Facades\Auth;



class Commande extends Model
{
    use HasFactory;
    protected $fillable = [
        
        'is_deliver',
        'price'
    ];
    protected $casts = [
        'is_deliver' => 'boolean'
    ];
    // protected $hidden = [
    //     'updated_at'
    // ];
    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, 'creator_id');
    }
    protected static function booted() :void {
        static::addGlobalScope('creator', function (Builder $builder){
            $builder->where('creator_id', Auth::id());
        }); 
    }
}
