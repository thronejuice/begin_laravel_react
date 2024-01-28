<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Jobs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\JobsResource;
use App\Http\Requests\StoreJobsRequest;
use App\Http\Requests\UpdateJobsRequest;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return JobsResource::collection(Jobs::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreJobsRequest $request)
    {
        $data = $request->validated();

        $jobs = Jobs::create($data);

        return response(new JobsResource($jobs), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $jobs = Jobs::find($id);

        if ($jobs) {
            return new JobsResource($jobs);
        } else {
            return response()->json(['message' => 'Jobs not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateJobsRequest $request, $id)
    {
        $jobs = Jobs::find($id);

        if ($jobs) {
            $jobs->update($request->validated());
            return new JobsResource($jobs);
        } else {
            return response()->json(['message' => 'Jobs not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Jobs $jobs)
    {
        //
        $jobs->delete();

        return response(null, 204);
    }
}
