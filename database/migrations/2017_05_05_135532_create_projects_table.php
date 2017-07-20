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

            $table->boolean('enabled')
                ->default(false)
                ->comment('Shows/hides the project from the site');

            $table->integer('order')
                ->comment('Order in which to display the projects in the projects list');

            $table->string('key')
                ->comment('Project key for URL and route mapping');

            $table->string('title')
                ->comment('Project title');

            $table->string('description')
                ->comment('Project description');

            $table->string('technologies')
                ->comment('Project technologies, delimitied by a semicolon and a space ("; ")');

            $table->string('responsibilities')
                ->comment('Project responsibilities');

            $table->string('url_website')
                ->nullable()
                ->default(null)
                ->comment('Project website URL');

            $table->string('url_source')
                ->nullable()
                ->default(null)
                ->comment('Project source code/repository URL');

            $table->string('preview_video')
                ->nullable()
                ->default(null)
                ->comment('Proejct preview video (for featured projects) without file extension');

            $table->string('preview_image')
                ->nullable()
                ->default(null)
                ->comment('Project preview image for project list and meta tags');

            $table->date('started')
                ->comment('Start date of the project');

            $table->date('ended')
                ->comment('End date of the project');

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
