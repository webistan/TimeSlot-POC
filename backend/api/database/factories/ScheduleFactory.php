<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Schedule;
class ScheduleFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Schedule::class;
    public function definition()
    {
        return [
            //
            [
                "allocated_for_date"=> '2022-11-16',
                "start_time"=> '10:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Wednesday',
            ],
            [
                "allocated_for_date"=> '2022-11-15',
                "start_time"=> '11:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Tuesday',
            ],
            [
                "allocated_for_date"=> '2022-11-14',
                "start_time"=> '11:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Monday',
            ],
            [
                "allocated_for_date"=> '2022-11-13',
                "start_time"=> '11:30:00',
                "allocated_slot"=>'10',
                "allocated_day"=>'Sunday',
            ]
        ];
    }
}
