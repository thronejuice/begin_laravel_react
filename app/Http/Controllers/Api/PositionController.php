<?php

namespace App\Http\Controllers\Api;

use App\Models\Position;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PositionResource;
use App\Http\Requests\StorePositionRequest;
use App\Http\Requests\UpdatePositionRequest;

class PositionController extends Controller
{
    //
    public function index()
    {
        return PositionResource::collection(Position::query()->orderBy('id', 'desc')->paginate(10));
    }

    public function store(StorePositionRequest $request)
    {
        $data = $request->validated();
    
        $user = Position::create($data);

        return response(new PositionResource($user) , 201);
    }

    public function show(Position $position)
    {
        return new PositionResource($position);
    }

    public function update(UpdatePositionRequest $request, Position $position)
    {
        $data = $request->validated();
        
        $position->update($data);

        return new PositionResource($position);
    }

    public function destroy(Position $position)
    {
        $position->delete();

        return response("", 204);
    }

}
