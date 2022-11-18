<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Repository\ScheduleRepo;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Common;
use Carbon\Carbon;
use Config;

class ScheduleController extends Controller
{
    public $scheduleRepo;
    public $common;

    public function __construct(ScheduleRepo $scheduleRepo){
        $this->scheduleRepo = $scheduleRepo;
        $this->common = new Common();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //Fetch all Schedules according to start date and End Date (default current Month all data)
    public function index(Request $request)
    {
        $startDate = Carbon::now()->firstOfMonth()->format('Y-m-d');
        $endDate = Carbon::now()->lastOfMonth()->format('Y-m-d');
        $requestData = array();

        if($request->query('start_date') != null || $request->query('end_date') != null){

            $requestData['start_date'] = $request->query('start_date');
            $requestData['end_date'] = $request->query('end_date');

            $isNotvalidations = $this->common->getValidation($requestData, [
                'start_date' => 'required_with:end_date|date_format:Y-m-d',
                'end_date' => 'required_with:start_date|date_format:Y-m-d|after_or_equal:start_date',
            ]);

            if($isNotvalidations){
                return response()->json(['status'=>400,'error'=>ERROR_400,'error_description'=>$isNotvalidations])->setStatusCode(400);
            }
            $startDate =  $requestData['start_date'];
            $endDate =  $requestData['end_date'];
        }

        $getScheduleData = $this->scheduleRepo->getSchedules($startDate,$endDate);

        if($getScheduleData){
            return response()->json(['status'=>200,'slots'=>$getScheduleData]);
        }else{
            return response()->json(['status'=>422,'error'=>ERROR_422,'error_description'=>ERROR_422_MSG])->setStatusCode(422);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    //Save Schedules in database according to start date and end date.
    public function store(Request $request)
    {

        $isNotvalidations = $this->common->postValidation($request, [
            'start_date' => 'required|date_format:Y-m-d',
            'end_date' => 'required|date_format:Y-m-d|after_or_equal:start_date',
            'slots' => ['required','array','max:7']
        ]);

        if($isNotvalidations){
            return response()->json(['status'=>400,'error'=>ERROR_400,'error_description'=>$isNotvalidations])->setStatusCode(400);
        }

        $saveData = $this->scheduleRepo->saveSlotsData($request);

        if($saveData){
            return response()->json(['status'=>200,'msg'=>'Schedule Saved successfully']);
        }else{
            return response()->json(['status'=>422,'error'=>ERROR_422,'error_description'=>ERROR_422_MSG])->setStatusCode(422);
        }
    }

    public function show($id){
        //to show the details of schedule
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    // delete all record from database according to start time and allocatted day
    public function destroy(Request $request)
    {
        $requestData['start_time'] = $request->query('start_time');
        $requestData['allocated_day'] = $request->query('allocated_day');

        $weekdays = Config::get('schedule.weekdays');
        $weekdays = implode(",",$weekdays);

        $isNotvalidations = $this->common->getValidation($requestData, [
            'start_time' => 'required|date_format:"H:i:s"',
            'allocated_day' => 'required|in:'.$weekdays
        ]);

        if($isNotvalidations){
            return response()->json(['status'=>400,'error'=>ERROR_400,'error_description'=>$isNotvalidations])->setStatusCode(400);
        }

        $deleted = $this->scheduleRepo->deleteSlots($requestData['start_time'],$requestData['allocated_day']);

        if($deleted){
            return response()->json(['status'=>200,'message'=>'slots deleted successfully.']);
        }else{
            return response()->json(['status'=>422,'error'=>ERROR_422,'error_description'=>ERROR_422_MSG])->setStatusCode(422);;
        }
    }
}
