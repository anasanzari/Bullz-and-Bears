<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableBoughtStock extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('bought_stocks', function (Blueprint $table) {
          $table->integer('playerid')->unsigned();
          $table->string('symbol');
          $table->decimal('amount', 15, 2);
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
        Schema::drop('bought_stocks');
    }
}
