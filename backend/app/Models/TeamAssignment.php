<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'user_id',
    ];

    public function assignedProjects()
    {
        return $this->belongsToMany(Project::class, 'team_assignments');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
