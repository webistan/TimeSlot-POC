<?php
namespace  App\Repository;

interface ScheduleRepo{

    // return the all slots between two dates for perticular day
    public function getDatesByDayAndDate($startDate,$endDate,$day,$slotData = null);

    //save schedule slots in datebase
    public function saveSlotsData($request);

    // get all schedules between start date and end date
    public function getSchedules($startDate,$endDate);

    //delete the schedule by start time and slot day
    public function deleteSlots($startTime,$day);

}
