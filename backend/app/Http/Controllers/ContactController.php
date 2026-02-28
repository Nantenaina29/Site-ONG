<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class ContactController extends Controller
{
    public function sendContact(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);
    
        try {
            // 1. Alefa ny Mailaka
            Mail::send([], [], function ($message) use ($data) {
                $message->to('elhadari04@gmail.com') // Mailaka handray ny hafatra
                        ->subject($data['subject'])
                        ->from($data['email'], $data['name'])
                        ->html("<h3>Message pour: {$data['name']}</h3>
                               <p>Email: {$data['email']}</p>
                               <p>Message: {$data['message']}</p>");
            });
    
            return response()->json(['message' => 'Message réussie!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Message echec.'], 500);
        }
    }
}