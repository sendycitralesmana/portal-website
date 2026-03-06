<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\Representative;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnRepresentativeController extends Controller
{
    public function index(Request $request)
    {

        $query = Representative::orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(office) LIKE ?', ["%{$search}%"]);
            });
        }

        $representatives = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/en/representative/page', [
            'representatives' => $representatives,
        ]);
    }

    public function create()
    {

        return Inertia::render('backoffice/en/representative/add', [
            
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'office' => ['required', 'max:255'],
            'address' => ['required'],
            'phone' => ['required', 'max:255'],
            'hotline' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:'.Representative::class],
            'instagram' => ['required', 'max:255'],
            'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'longitude' => ['required'],
            'latitude' => ['required'],
        ], [
            'office.required' => 'Representative is required',
            'address.required' => 'Address is required',
            'phone.required' => 'Phone number is required',
            'hotline.required' => 'Hotline number is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',
            'email.unique' => 'Email has already been registered',
            'instagram.required' => 'Instagram is required',
            'cover.required' => 'Cover is required',
            'cover.image' => 'Cover must be an image',
            'cover.mimes' => 'Cover must be a file of type: jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Cover must not be larger than 6MB',
            'longitude.required' => 'Longitude is required',
            'latitude.required' => 'Latitude is required',
        ]);

        $representative = new Representative();
        $representative->id = Str::uuid();
        $representative->office = $request->office;
        $representative->address = $request->address;
        $representative->phone = $request->phone;
        $representative->hotline = $request->hotline;
        $representative->email = $request->email;
        $representative->instagram = $request->instagram;
        $representative->longitude = $request->longitude;
        $representative->latitude = $request->latitude;
        
        if ($request->file('cover')) {
            $file = $request->file('cover');
            $path = Storage::disk('s3')->putFile('/representative', $file);
            $representative->cover = '/' . $path;
        }

        $representative->save();

        return to_route('backoffice.representative.index')->with('message', 'Representative has been successfully added');
    }

    public function edit($id)
    {
        $representative = Representative::where('id', $id)->first();

        return Inertia::render('backoffice/en/representative/edit', [
            'representative' => $representative
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'office' => ['required', 'max:255'],
            'address' => ['required'],
            'phone' => ['required', 'max:255'],
            'hotline' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique(Representative::class)->ignore($id)],
            'instagram' => ['required', 'max:255'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'longitude' => ['required'],
            'latitude' => ['required'],
        ], [
            'office.required' => 'Representative is required',
            'address.required' => 'Address is required',
            'phone.required' => 'Phone number is required',
            'hotline.required' => 'Hotline number is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',
            'email.unique' => 'Email has already been taken',
            'instagram.required' => 'Instagram is required',
            'cover.image' => 'Cover must be an image',
            'cover.mimes' => 'Cover must be a file of type: jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Cover must not be greater than 6MB',
            'longitude.required' => 'Longitude is required',
            'latitude.required' => 'Latitude is required',
        ]);

        $representative = Representative::where('id', $id)->first();
        $representative->office = $request->office;
        $representative->address = $request->address;
        $representative->phone = $request->phone;
        $representative->hotline = $request->hotline;
        $representative->email = $request->email;
        $representative->instagram = $request->instagram;
        $representative->longitude = $request->longitude;
        $representative->latitude = $request->latitude;

        if ($request->file('cover')) {
            Storage::disk('s3')->delete($representative->cover);
            $file = $request->file('cover');
            $path = Storage::disk('s3')->putFile('/representative', $file);
            $representative->cover = '/' . $path;
        }

        $representative->save();

        return to_route('backoffice.representative.index')->with('message', 'Representative has been successfully updated');
    }

    public function detail($id)
    {
        $representative = Representative::where('id', $id)->first();

        return Inertia::render('backoffice/en/representative/detail', [
            'representative' => $representative
        ]);
    }

    public function destroy($id)
    {
        $representative = Representative::where('id', $id)->first();
        Storage::disk('s3')->delete($representative->cover);
        $representative->delete();

        return to_route('backoffice.representative.index')->with('message', 'Representative has been successfully deleted');
    }
}