<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('url_img');
            $table->string('first_name');
            $table->string('second_name');
            $table->string('first_lastname');
            $table->string('second_lastname');
            $table->string('country');
            $table->string('city');
            $table->string('postal_code');
            $table->string('address');          // Linea 1 de la direccion
            $table->string('address_2');        // Linea 2 de la direccion
            $table->string('province');
            $table->date('birth_date');
            $table->string('website');
            $table->string('company');
            $table->string('department');
            $table->string('position');         // Puesto de trabajo
            $table->foreign('owner')            // Usuario que lo agrego
                ->references('id')
                ->on('users')
                ->onDelete('SET 0');           
            $table->boolean('deleted');
            $table->timestamps();
            $table->timestamp('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
