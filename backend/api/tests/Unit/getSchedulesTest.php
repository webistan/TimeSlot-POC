<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Schedule;
use Illuminate\Foundation\Testing\RefreshDatabase;

class getSchedulesTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_get_schedule_with_valid_start_date_and_end_date(){
        $this->setUpSchedule();
        $response = $this->json('GET', 'api/schedules?start_date=2022-11-13&end_date=2023-01-08');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "status",
            "slots"=>[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ]
            ]);
        // $this->assertTrue(true);
    }

    public function test_get_schedule_without_start_date_and_end_date(){
        $this->setUpSchedule();
        $response = $this->json('GET', 'api/schedules');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "status",
            "slots"=>[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ]
        ]);
    }

    public function test_get_schedule_without_start_date_and_with_end_date(){
        $this->setUpSchedule();
        $response = $this->json('GET', 'api/schedules?end_date=2023-01-08');
        $response->assertStatus(400);
    }

    public function test_get_schedule_with_start_date_and_without_end_date(){
        $this->setUpSchedule();
        $response = $this->json('GET', 'api/schedules?start_date=2023-01-08');
        $response->assertStatus(400);
    }

    public function test_get_schedule_with_invalid_start_date_and_with_valid_end_date(){
        $this->setUpSchedule();
        $response = $this->json('GET', 'api/schedules?start_date=08-01-2023&end_date=2022-11-16');
        $response->assertStatus(400);
    }

    public function test_get_schedule_with_valid_start_date_and_with_invalid_end_date(){
        $this->setUpSchedule();
        $response = $this->json('GET', 'api/schedules?start_date=2022-11-16&end_date=08-01-2023');
        $response->assertStatus(400);
    }
}
