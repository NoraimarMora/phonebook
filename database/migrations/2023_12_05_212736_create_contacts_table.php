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
            $table->increments('id');
            $table->string('url_img')
                ->default("");
            $table->string('first_name');
            $table->string('second_name')
                ->default("");
            $table->string('first_lastname')
                ->default("");
            $table->string('second_lastname')
                ->default("");
            $table->string('country')
                ->default("");
            $table->string('city')
                ->default("");
            $table->string('postal_code')
                ->default("");
            $table->string('address')           // Linea 1 de la direccion
                ->default("");          
            $table->string('address_2')         // Linea 2 de la direccion
                ->default("");        
            $table->string('province')
                ->default("");
            $table->date('birth_date')
                ->nullable();
            $table->string('website')
                ->default("");
            $table->string('company')
                ->default("");
            $table->string('department')
                ->default("");
            $table->string('position')          // Puesto de trabajo
                ->default("");         
            $table->boolean('favorite')
                ->default(false);
            $table->integer('owner')            // Usuario que lo agrego
                ->unsigned();
            $table->boolean('deleted')
                ->default(false);
            $table->timestamp('deleted_at')
                ->nullable();
            $table->timestamps();

            $table->foreign('owner')            
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('contacts');
    }
}
