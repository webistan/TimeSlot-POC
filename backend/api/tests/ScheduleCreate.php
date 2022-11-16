<?php
namespace Tests;

use App\Models\Schedule;

trait ScheduleCreate{
    public function setUpSchedule(){
        Schedule::factory()->create();
    }
}
