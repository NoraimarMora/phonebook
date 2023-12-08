<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    use HasFactory;

    protected $table = "emails";

    protected $fillable = ['id', 'email', 'label'];

    public function contacts()
    {
        return $this->belongsToMany('App\Contact');
    }
}
