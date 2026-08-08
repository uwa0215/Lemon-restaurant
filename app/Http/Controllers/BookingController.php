<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::orderBy('date')->orderBy('time')->get();
        return Inertia::render('Admin/Bookings', [
            'bookings' => $bookings
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|string',
            'guests' => 'required|integer|min:1|max:20',
        ]);

        Booking::create($validated);

        return redirect()->back()->with('success', 'Your table has been booked successfully!');
    }
}
