<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect(route('contacts.index'));
});
Route::group(['prefix' => 'contacts', 'as' => 'contacts.', 'middleware' => 'auth'], function () {
    Route::any('/',  [ContactController::class, "index"])->name('index');
    Route::any('/download',  [ContactController::class, "download"])->name('download');
    Route::get('/create',  [ContactController::class, "create"])->name('create');
    Route::post('/store',  [ContactController::class, "store"])->name('store');
    Route::get('/{contact}/edit',  [ContactController::class, "edit"])->name('edit');
    Route::post('/{contact}/update',  [ContactController::class, "update"])->name('update');
    Route::delete('/{contact}/delete',  [ContactController::class, "destroy"])->name('delete');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';