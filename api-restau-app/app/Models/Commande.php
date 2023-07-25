<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



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
}
