<?php

use Illuminate\Database\Seeder;
use App\AppState;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $app = AppState::find(1);
      if($app){
        echo "State Exists.\n";
        return;
      }
      $app = new AppState;
      $app->id = 1;
      $app->state = AppState::STATE_ACTIVE;
      $app->save();
      echo "State Created.\n";
    }
}
