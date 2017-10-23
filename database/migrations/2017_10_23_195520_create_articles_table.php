<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {

            $table->increments('id');

            $table->boolean('enabled')
                ->default(false)
                ->comment('Shows/hides the article from the site');

            $table->string('title')
                ->comment('Article title');

            $table->string('url')
                ->comment('Article URL');

            $table->date('published')
                ->comment('Publish date of the article');

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
        Schema::dropIfExists('articles');
    }
}
