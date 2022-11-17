<?php
namespace App\Repository\RepoController;

use App\Models\Schedule;
use App\Repository\ScheduleRepo;
use Carbon\Carbon;
use Config;

class ScheduleRepoController implements ScheduleRepo{

    public function getDatesByDayAndDate($startDate,$endDate,$day,$slotData = null){
        $schedule = [];
        $startDate = Carbon::parse($startDate)->modify('this '.$day); // Get the first friday. If $fromDate is a friday, it will include $fromDate as a friday
        $endDate = Carbon::parse($endDate);
        $i=0;

        for ($date = $startDate; $date->lte($endDate); $date->addWeek()) {
            $schedule[$i]['allocated_day'] = $day;
            $schedule[$i]['allocated_for_date'] = $date->format('Y-m-d');

            if(isset($slotData['start_time']) && !empty($slotData['start_time'])){
                $schedule[$i]['start_time'] = Carbon::parse($slotData['start_time'])->format('H:i:s');
            }

            if(isset($slotData['allocated_slot']) && !empty($slotData['allocated_slot'])){
                $schedule[$i]['allocated_slot'] = $slotData['allocated_slot'];
            }

            $i++;
        }
        return $schedule;
    }

    public function saveSlotsData($request){

        $slots = $request['slots'];
        $allDates = array();
        foreach($slots as $key=>$days){
            foreach($days as $key1=>$slot){
                $data = $this->getDatesByDayAndDate($request['start_date'],$request['end_date'],$key,$slot);
                if(!empty($allDates)){
                    $allDates = array_merge($data,$allDates);
                }else{
                    $allDates = $data;
                }
            }
        }
        return Schedule::insert($allDates);
    }

    public function getSchedules($startDate,$endDate){

        $schedules = Schedule::whereBetween('allocated_for_date',[$startDate,$endDate])->get(['id','allocated_day','start_time','allocated_slot'])->groupBy('allocated_day')->toArray();
        $weekdays = Config::get('schedule.weekdays');
        $schedulesArray = array();

        for($i=0;$i < count($weekdays);$i++){
            $schedulesArray[$weekdays[$i]] = array();
            if(isset($schedules[$weekdays[$i]]) && !empty($schedules[$weekdays[$i]])){
                if(isset($schedules) && !empty($schedules)){
                    $slotCollection = collect($schedules[$weekdays[$i]])->unique('start_time');
                    $schedulesArray[$weekdays[$i]] = array_values($slotCollection->toArray());
                }
            }
        }
        return $schedulesArray;
    }

    public function deleteSlots($startTime,$day){
        $startTime = Carbon::parse($startTime)->format('H:i:s');
        return Schedule::where('start_time',$startTime)->where('allocated_day',$day)->delete();
    }
}
