<?php
namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // 1. API ho an'ny React: Maka ny hetsika rehetra
    public function index() {
        return response()->json(Event::orderBy('event_date', 'asc')->get());
    }

    // 2. Dashboard: Mampiseho ny lisitra rehetra ao amin'ny pejy Admin
    public function adminIndex() {
        $events = Event::orderBy('event_date', 'desc')->paginate(10);
        return view('admin.events.index', compact('events'));
    }

    // 3. Fonction fampidirana (Store)
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'location' => 'required|string',
            'description' => 'nullable|string'
        ]);

        Event::create($validated);
        return back()->with('success', 'Hetsika voatahiry soa aman-tsara!');
    }

    // 4. Fonction famafana (Delete)
    public function destroy($id) {
        $event = Event::findOrFail($id);
        $event->delete();
        
        return back()->with('success', 'Hetsika voafafa soa aman-tsara!');
    }
}