use App\Http\Controllers\Api\ServerController;
use Illuminate\Support\Facades\Route;

Route::get('/servers', [ServerController::class, 'index']);