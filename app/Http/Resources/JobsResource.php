<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobsResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title'=> $this->title,
            'description'=> $this->description,
            'start_date'=> $this->start_date,
            'end_date'=> $this->end_date,
            'status_id'=> $this->status_id,
            'user_id'=> $this->user_id,
            'created_at'=> $this->created_at,
            'status_name' => $this->status->name, // Add this line
        ];
    }
}
