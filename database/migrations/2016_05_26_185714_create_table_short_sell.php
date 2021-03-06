<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableShortSell extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('short_sell', function (Blueprint $table) {
          $table->integer('playerid')->unsigned();
          $table->string('symbol');
          $table->bigInteger('amount');
          $table->decimal('avg', 15, 2);

          $table->primary(['playerid','symbol']);
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
        Schema::drop("short_sell");
    }
}
