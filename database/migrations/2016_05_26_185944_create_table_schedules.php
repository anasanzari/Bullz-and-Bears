<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableSchedules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('schedules', function (Blueprint $table) {

          $table->increments('id');
          $table->integer('playerid')->unsigned();
          $table->string('symbol');
          $table->string('transaction_type',20);
          $table->decimal('scheduled_price', 15, 2);
          $table->bigInteger('no_shares');
          $table->bigInteger('pend_no_shares');
          $table->string('flag', 10);

          $table->foreign('playerid')->references('id')->on('users');
          $table->foreign('symbol')->references('symbol')->on('stocks');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('schedules');

    }
}
