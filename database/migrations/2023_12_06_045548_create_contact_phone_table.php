<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactPhoneTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_phone', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contact_id')
                ->unsigned();
            $table->integer('phone_id')
                ->unsigned();
            $table->timestamps();

            $table->foreign('contact_id')
                ->references('id')
                ->on('contacts')
                ->onDelete('cascade');
            $table->foreign('phone_id')
                ->references('id')
                ->on('phones')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contact_phone');
    }
}
