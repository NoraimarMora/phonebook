<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactEmailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_email', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contact_id')
                ->unsigned();
            $table->integer('email_id')
                ->unsigned();
            $table->timestamps();
            
            $table->foreign('contact_id')
                ->references('id')
                ->on('contacts')
                ->onDelete('cascade');
            $table->foreign('email_id')
                ->references('id')
                ->on('emails')
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
        Schema::dropIfExists('contact_email');
    }
}
