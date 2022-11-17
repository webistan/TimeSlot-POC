<?php
namespace Tests;

use App\Models\Schedule;

trait ScheduleCreate{

    public function setUpSchedule(){
        Schedule::create(
            [
                "allocated_for_date"=> '2022-11-16',
                "start_time"=> '10:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Wednesday',
            ],
            [
                "allocated_for_date"=> '2022-11-17',
                "start_time"=> '10:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Thursday',
            ],
            [
                "allocated_for_date"=> '2022-11-18',
                "start_time"=> '10:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Friday',
            ],
            [
                "allocated_for_date"=> '2022-11-19',
                "start_time"=> '10:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Saturday',
            ],
            [
                "allocated_for_date"=> '2022-11-20',
                "start_time"=> '10:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Sunday',
            ],
            [
                "allocated_for_date"=> '2022-11-21',
                "start_time"=> '10:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Monday',
            ],
            [
                "allocated_for_date"=> '2022-11-22',
                "start_time"=> '10:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Tuesday',
            ],
            [
                "allocated_for_date"=> '2022-11-23',
                "start_time"=> '10:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Wednesday',
            ]
        );
    }
}
