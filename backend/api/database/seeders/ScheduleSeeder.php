<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Schedule;
use DB;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $scheduleArray = [
        //     [
        //         "allocated_for_date"=> '2022-11-16',
        //         "start_time"=> '10:30:00',
        //         "allocated_slot"=>'10',
        //         "allocated_day"=>'Wednesday',
        //     ],
        //     [
        //         "allocated_for_date"=> '2022-11-15',
        //         "start_time"=> '11:30:00',
        //         "allocated_slot"=>'10',
        //         "allocated_day"=>'Tuesday',
        //     ],
        //     [
        //         "allocated_for_date"=> '2022-11-14',
        //         "start_time"=> '11:30:00',
        //         "allocated_slot"=>'10',
        //         "allocated_day"=>'Monday',
        //     ],
        //     [
        //         "allocated_for_date"=> '2022-11-13',
        //         "start_time"=> '11:30:00',
        //         "allocated_slot"=>'10',
        //         "allocated_day"=>'Sunday',
        //     ]
        // ];
        // foreach($scheduleArray as $key=>$schedule){
        //     Schedule::create([
        //         "allocated_for_date"=> $schedule->allocated_for_date,
        //         "start_time"=> $schedule->start_time,
        //         "allocated_slot"=>$schedule->allocated_slot,
        //         "allocated_day"=>$$schedule->allocated_day,
        //     ]);
        // }

    }
}
