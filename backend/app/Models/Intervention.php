<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    use HasFactory;
    
    // Nampiana 'location' eto
    protected $fillable = ['title', 'description', 'location', 'image', 'is_published'];
}