<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Rent;

class Home extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo1',
        'photo2',
        'type',
        'address',
        'city',
        'country',
        'sqrt',
        'furnished',
        'bedrooms',
        'bathrooms',
        'price',
        'available',
    ];

    public function rents()
    {
        return $this->hasMany(Rent::class);
    }
}
