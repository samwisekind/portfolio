<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('order');
            $table->string('key');
            $table->string('title');
            $table->string('description');
            $table->string('technologies');
            $table->string('responsibilities');
            $table->string('url_website');
            $table->string('preview_video');
            $table->string('preview_image');
            $table->string('cover');
            $table->date('started');
            $table->date('ended');
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
        Schema::dropIfExists('projects');
    }
}
