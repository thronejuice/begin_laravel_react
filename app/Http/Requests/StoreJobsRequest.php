<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:55',
            'description' => 'string|max:255',
            'status_id' => 'required|exists:status,id',
            'start_date' => 'date',
            'end_date' => 'date',
            'user_id' => 'required|exists:users,id',
        ];
    }
}
