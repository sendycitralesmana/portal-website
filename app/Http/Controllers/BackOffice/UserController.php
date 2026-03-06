<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('role')->orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
                ->orWhereHas('role', function ($userQuery) use ($search) {
                    $userQuery->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                });
            });
        }

        $users = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/pengguna/page', [
            'users' => $users,
            'search' => $request->search,
        ]);
    }

    public function create()
    {
        $roles = Role::get();

        return Inertia::render('backoffice/pengguna/add', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'min:8'],
            'role' => ['required'],
        ], [
            'name.required' => 'Nama tidak boleh kosong',
            'email.required' => 'Email tidak boleh kosong',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Password tidak boleh kosong',
            'password.min' => 'Password minimal 8 karakter',
            'role.required' => 'Role tidak boleh kosong',
        ]);

        $user = new User();
        $user->id = Str::uuid();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->remember_token = Str::random(40);
        $user->role_id = $request->role;
        $user->save();

        return to_route('backoffice.pengguna.index')->with('message', 'Pengguna berhasil ditambahkan');
    }

    public function edit($id)
    {
        $categories = Role::get();
        $user = User::with('role')->where('id', $id)->first();

        return Inertia::render('backoffice/pengguna/edit', [
            'categories' => $categories,
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'name.required' => 'Nama tidak boleh kosong',
        ]);

        $user = User::where('id', $id)->first();
        $user->role_id = $request->category;
        $user->name = $request->name;

        $user->save();

        return to_route('backoffice.pengguna.index')->with('message', 'Pengguna berhasil diperbarui');
    }

    public function destroy($id)
    {
        $user = User::where('id', $id)->first();

        $user->delete();

        return to_route('backoffice.pengguna.index')->with('message', 'Pengguna berhasil dihapus');
    }
}