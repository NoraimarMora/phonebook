<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $table = "contacts";

    protected $fillable = [
        'id',
        'url_image',
        'first_name',
        'second_name',
        'first_lastname',
        'second_lastname',
        'country',
        'city',
        'postal_code',
        'address',
        'address_2',
        'province',
        'birth_date',
        'website',
        'company',
        'department',
        'position',
        'favorite',
        'owner',
        'deleted',
        'deleted_at',
    ];

    public function groups()
    {
        return $this->belongsToMany('App\Group');
    }

    public function emails()
    {
        return $this->belongsToMany('App\Email');
    }

    public function phones()
    {
        return $this->belongsToMany('App\Phone');
    }
}
