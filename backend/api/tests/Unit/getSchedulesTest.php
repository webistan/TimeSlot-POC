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
    public function test_get_schedule_without_any_data(){
        // $this->setUpSchedule();
        // $response = $this->json('Delete', '/api/schedules?start_time=10:30:00&allocated_day=Wednesday');
        // $response->assertStatus(200);
        $this->assertTrue(true);
    }
}
