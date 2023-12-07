<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactGroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_group', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contact_id')
                ->unsigned();
            $table->integer('group_id')
                ->unsigned();
            $table->timestamps();

            $table->foreign('contact_id')
                ->references('id')
                ->on('contacts')
                ->onDelete('cascade');
            $table->foreign('group_id')
                ->references('id')
                ->on('groups')
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
        Schema::dropIfExists('contact_group');
    }
}
