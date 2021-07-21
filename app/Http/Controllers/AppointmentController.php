<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    //TODO: Üzenettel térjen vissza

    function store(Request $request){

        $date = new Appointment();
        $date->date = $request->input()[0];
        $date->save();

        return $request->input();

    }

    function getAppointments(){
        $appointments = Appointment::get();
        foreach ($appointments as $appointment) {
            $dates[] = $appointment['date'];
        }
        return $dates;
    }
}
