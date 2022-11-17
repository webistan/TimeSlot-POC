<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Schedule;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DeleteScheduleTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_delete_schedule_with_valid_start_time_and_valid_allocated_day()
    {
        $this->setUpSchedule();
        $response = $this->json('delete','api/schedules/destroy?start_time=10:30:00&allocated_day=Wednesday');
        $response->assertStatus(200);
    }

    public function test_delete_schedule_with_invalid_start_time_and_valid_allocated_day()
    {
        $this->setUpSchedule();
        $response = $this->json('delete', 'api/schedules/destroy?start_time=asas&allocated_day=Wednesday');
        $response->assertStatus(400);
    }

    public function test_delete_schedule_with_valid_start_time_and_invalid_allocated_day()
    {
        $this->setUpSchedule();
        $response = $this->json('delete', 'api/schedules/destroy?start_time=10:30:00&allocated_day=AAAA');
        $response->assertStatus(400);
    }

    public function test_delete_schedule_with_empty_start_time_and_empty_allocated_day()
    {
        $this->setUpSchedule();
        $response = $this->json('delete', 'api/schedules/destroy?start_time=&allocated_day=');
        $response->assertStatus(400);
    }

    public function test_delete_schedule_with_valid_start_time_and_empty_allocated_day()
    {
        $this->setUpSchedule();
        $response = $this->json('delete', 'api/schedules/destroy?start_time=10:30:00&allocated_day=');
        $response->assertStatus(400);
    }

    public function test_delete_schedule_with_empty_start_time_and_valid_allocated_day()
    {
        $this->setUpSchedule();
        $response = $this->json('delete', 'api/schedules/destroy?start_time=&allocated_day=Wednesday');
        $response->assertStatus(400);
    }
}
