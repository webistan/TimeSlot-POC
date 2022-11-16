<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repository\RepoController\ScheduleRepoController;
use App\Repository\ScheduleRepo;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->bind(ScheduleRepo::class,ScheduleRepoController::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
