<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('history', function (Blueprint $table) {

          $table->increments('id');
          $table->integer('playerid')->unsigned();
          $table->string('symbol');
          $table->integer('skey')->unsigned()->nullable();
          $table->string('transaction_type',20);
          $table->decimal('amount', 15, 2);
          $table->decimal('value',15,2);
          $table->timestamp('transaction_time');

          $table->decimal('p_liquidcash', 10, 2);
          $table->decimal('p_marketvalue', 10, 2);

          $table->foreign('skey')->references('id')->on('schedules');
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
        Schema::drop('history');
    }
}
