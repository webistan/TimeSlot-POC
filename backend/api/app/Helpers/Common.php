<?php


namespace App\Helpers;

use App\Http\Controllers\Admin\MainDbController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class Common
{
    public function postValidation($request, $validations){
        $v = Validator::make($request->all() , $validations);

        if ($v->fails())
        {
            $error_description = "";
            foreach ($v->messages()
                         ->all() as $error_message)
            {
                $error_description .= $error_message . " ";
            }

            return $error_description;
        }else{
            return false;
        }
    }

    public function getValidation($request, $validations){
        $v = Validator::make($request, $validations);

        if ($v->fails())
        {
            $error_description = "";
            foreach ($v->messages()
                         ->all() as $error_message)
            {
                $error_description .= $error_message . " ";
            }

            return $error_description;
        }else{
            return false;
        }
    }

}
