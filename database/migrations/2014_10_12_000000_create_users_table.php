<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->decimal('liquidcash', 10, 2);
            $table->decimal('marketvalue', 10, 2);
            $table->integer('rank');
            $table->decimal('dayworth',10,2);
            $table->decimal('weekworth',10,2);
            $table->decimal('shortval',10,2);
            $table->string('fbid',50)->unique();
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
