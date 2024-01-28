<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    // department table
    protected $table = 'departments';

    // fillable fields
    protected $fillable = [
        'name',
        'is_active',
    ];
}
