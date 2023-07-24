<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repas extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'description', 
        'is_available'
    ];
    protected $casts = [
        'is_available' => 'boolean'
    ];
    protected $hidden = [
        'updated_at'
    ];
}
