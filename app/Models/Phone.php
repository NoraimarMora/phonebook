<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;

    protected $table = "phones";

    protected $fillable = ['id', 'phone', 'label'];

    public function contacts()
    {
        return $this->belongsToMany('App\Contact');
    }
}
