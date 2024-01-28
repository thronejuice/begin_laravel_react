<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;

    // position table
    protected $table = 'positions';

    // fillable fields
    protected $fillable = [
        'name',
        'is_active',
    ];
}
