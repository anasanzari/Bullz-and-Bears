<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableStocks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('stocks', function (Blueprint $table) {
          $table->timestamp('time_stamp');
          $table->string('name');
          $table->string('symbol');
          $table->decimal('value', 15, 2);
          $table->decimal('change', 15, 2);
          $table->decimal('daylow',15,2);
          $table->decimal('dayhigh',15,2);
          $table->decimal('weeklow',15,2);
          $table->decimal('weekhigh',15,2);
          $table->decimal('change_perc',15,2);
          $table->primary('symbol');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::drop('stocks');
    }
}
