<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    protected $hidden = [
        'updated_at'
    ];
}
