<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rentals', function (Blueprint $table) {
            $table->id();
            $table->date('checkIn');
            $table->date('checkOut');
            $table->float('price', 10, 2);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('home_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('home_id')->references('id')->on('homes');
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rentals');
    }
};
