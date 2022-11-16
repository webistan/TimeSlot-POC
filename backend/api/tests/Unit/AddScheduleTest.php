<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddScheduleTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_create_schedule_with_valide_data()
    {
        $data = [
            'start_date'=>'2022-11-14',
            'end_date' => '2022-12-05',
            'slots' => [
                "Tuesday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                    1=>[
                        "start_time"=>"10:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Friday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                    1=>[
                        "start_time"=>"10:30:00",
			            "allocated_slot"=> 10
                    ],
                ]
            ]
        ];
        $response = $this->json('POST', '/api/schedules',$data);
        $response->assertStatus(200);
        // $response->assertJson(['message' => "Unauthenticated."]);
    }

    public function test_create_schedule_without_slots(){
        $data = [
            'start_date'=>'2022-11-14',
            'end_date' => '2022-12-05',
        ];

        $response = $this->json('POST', '/api/schedules',$data);
        $response->assertStatus(400);
    }

    public function test_create_schedule_with_empty_start_date(){
        $data = [
            'start_date'=>'',
            'end_date' => '2022-12-05',
            'slots' => [
                "Tuesday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                    1=>[
                        "start_time"=>"10:30:00",
			            "allocated_slot"=> 10
                    ],
                ]
            ]
        ];

        $response = $this->json('POST', '/api/schedules',$data);
        $response->assertStatus(400);
    }

    public function test_create_schedule_with_end_date_less_then_start_date(){
        $data = [
            'start_date'=>'2022-11-14',
            'end_date' => '2022-11-13',
            'slots' => [
                "Tuesday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                    1=>[
                        "start_time"=>"10:30:00",
			            "allocated_slot"=> 10
                    ],
                ]
            ]
        ];

        $response = $this->json('POST', '/api/schedules',$data);
        $response->assertStatus(400);
    }

    public function test_create_schedule_with_invalid_end_date(){
        $data = [
            'start_date'=>'2022-11-14',
            'end_date' => 'Ashutosh',
            'slots' => [
                "Tuesday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                    1=>[
                        "start_time"=>"10:30:00",
			            "allocated_slot"=> 10
                    ],
                ]
            ]
        ];

        $response = $this->json('POST', '/api/schedules',$data);
        $response->assertStatus(400);
    }

    public function test_create_schedule_with_invalid_slots(){
        $data = [
            'start_date'=>'2022-11-14',
            'end_date' => '2022-11-13',
            'slots' => 'asas'
        ];

        $response = $this->json('POST', '/api/schedules',$data);
        $response->assertStatus(400);
    }

    public function test_create_schedule_with_slot_array_grater_then_7(){
        $data = [
            'start_date'=>'2022-11-14',
            'end_date' => '2022-11-13',
            'slots' => [
                "Monday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Tuesday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Wednesday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Thursday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Friday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Saturday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Sunday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Akkk"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
            ]
        ];

        $response = $this->json('POST', '/api/schedules',$data);
        $response->assertStatus(400);
    }

    public function test_create_schedule_with_valid_data_and_slot_array_equels_to_7(){
        $data = [
            'start_date'=>'2022-11-14',
            'end_date' => '2022-12-16',
            'slots' => [
                "Monday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Tuesday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Wednesday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Thursday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Friday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Saturday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
                "Sunday"=>[
                    0=>[
                        "start_time"=>"02:30:00",
			            "allocated_slot"=> 10
                    ],
                ],
            ]
        ];

        $response = $this->json('POST', '/api/schedules',$data);
        $response->assertStatus(200);
    }
}
