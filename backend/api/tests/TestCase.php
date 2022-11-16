<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\ScheduleCreate;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication,ScheduleCreate;


}
