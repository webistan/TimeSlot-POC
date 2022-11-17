<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $fillable =[
        "allocated_for_date",
        "start_time",
        "allocated_slot",
        "allocated_day",
    ];
}
