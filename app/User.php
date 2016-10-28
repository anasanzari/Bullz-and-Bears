<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'liquidcash', 'marketvalue', 'rank', 'dayworth', 'weekworth', 'shortval', 'fbid'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public $timestamps = false;

    public function setDetails(){
      $this->weekgain = $this->getWeekGain();
      $this->daygain = $this->getDayGain();
      $this->networth = $this->getNetWorth();

      if ($this->rank == 1) {
        $this->overallrank = $this->getOverAllRank();
        $this->dailyrank = $this->getDailyRank();
        $this->weeklyrank = $this->getWeeklyRank();
      } else {
        $this->overallrank =  "Not Ranked";
        $this->dailyrank = "Not Ranked";
        $this->weeklyrank =  "Not Ranked";
      }

    }

    public function getNetWorth(){
      return $this->liquidcash + $this->marketvalue;
    }

    public function getDayGain(){
      return $this->liquidcash + $this->marketvalue - $this->dayworth;
    }

    public function getWeekGain(){
      return $this->liquidcash + $this->marketvalue - $this->weekworth;
    }

    function getOverAllRank(){

      $rank = User::where('rank','>',0)
            ->whereRaw('liquidcash + marketvalue > '.($this->liquidcash + $this->marketvalue))
            ->count();

      return $rank + 1 ;
    }

    function getDailyRank(){

      $rank = User::where('rank','>',0)
            ->whereRaw('liquidcash + marketvalue - dayworth > '.($this->liquidcash + $this->marketvalue - $this->dayworth))
            ->count();

      return $rank + 1 ;
    }

    function getWeeklyRank(){

      $rank = User::where('rank','>',0)
            ->whereRaw('liquidcash + marketvalue - weekworth > '.($this->liquidcash + $this->marketvalue - $this->weekworth))
            ->count();

      return $rank + 1 ;

    }

    function buyUpdate($amount, $average){

      $this->rank = 1;
      $this->liquidcash -= round( $amount * $average * 1.002, 2);
      $this->marketvalue += round( $amount * $average, 2);
      return $this->save();

  	}

    function buyRevert($amount, $average){

      $this->rank = 1;
      $this->liquidcash += round( $amount * $average * 1.002, 2);
      if($this->marketvalue < round($amount * $average, 2) ){
        $this->marketvalue = 0;
      }else{
        $this->marketvalue -= round($amount * $average, 2);
      }
      return $this->save();

  	}

    function sellUpdate($amount, $average){

      $this->liquidcash += round($amount * $average * 0.998, 2);

      if($this->marketvalue < round($amount * $average, 2) ){
        $this->marketvalue = 0;
      }else{
        $this->marketvalue -= round($amount * $average, 2);
      }

      $this->save();

  	}

    function sellRevert($amount, $average){

      $this->liquidcash -= round($amount * $average * 0.998, 2);
      $this->marketvalue += round($amount * $average, 2);
      $this->save();

  	}

    function shortUpdate($amount, $average){

      $this->rank = 1;
      $this->liquidcash -= round($amount * $average * 0.002, 2); // y not 1.002 ?
      $this->shortval += round( $amount * $average, 2);
      $this->save();

    }


    function shortRevert($amount, $average){

          $this->rank = 1;
          $this->liquidcash += round($amount * $average * 0.002, 2); // y not 1.002 ?
          if($this->shortval < round($amount * $average, 2) ){
            $this->shortval = 0;
          }else{
            $this->shortval -= round($amount * $average, 2);
          }
          $this->save();

    }

    function coverUpdate($amount,$average,$oldaverage){

      $this->liquidcash += round(($oldaverage - $average * 1.002) * $amount, 2); // got to understand this

      if($this->shortval < round($amount * $average, 2) ){
        $this->shortval = 0;
      }else{
        $this->shortval -= round($amount * $average, 2);
      }

      $this->save();

    }

    function coverRevert($amount,$average,$oldaverage){

      $this->liquidcash -= round(($oldaverage - $average * 1.002) * $amount, 2); // got to understand this
      $this->shortval += round($amount * $average, 2);

      $this->save();

    }


}
