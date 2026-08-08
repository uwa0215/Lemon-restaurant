import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Booking {
    id: number;
    name: string;
    date: string;
    time: string;
    guests: number;
    created_at: string;
}

interface BookingsProps {
    bookings: Booking[];
}

export default function Bookings({ bookings }: BookingsProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-200">
                    Table Bookings Dashboard
                </h2>
            }
        >
            <Head title="Admin - Table Bookings" />

            <div className="py-12 bg-slate-900 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-slate-800 shadow-sm sm:rounded-lg border border-slate-700">
                        <div className="p-6 text-slate-100">
                            <h3 className="text-lg font-bold mb-6 font-serif text-amber-400">Current Table Reservations</h3>
                            
                            {bookings.length === 0 ? (
                                <p className="text-slate-500 py-12 text-center text-base">No bookings reserved yet.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-700 text-slate-400 text-sm uppercase tracking-wider">
                                                <th className="py-3 px-4">Name</th>
                                                <th className="py-3 px-4">Date</th>
                                                <th className="py-3 px-4">Time</th>
                                                <th className="py-3 px-4">Guests</th>
                                                <th className="py-3 px-4">Booked At</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {bookings.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-slate-750 text-slate-300 transition-colors">
                                                    <td className="py-4 px-4 font-semibold text-slate-200">{booking.name}</td>
                                                    <td className="py-4 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                                                    <td className="py-4 px-4">{booking.time}</td>
                                                    <td className="py-4 px-4">
                                                        <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">
                                                            {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-sm text-slate-500">
                                                        {new Date(booking.created_at).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
