<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ContactsExport implements FromQuery, WithHeadings, WithMapping
{
    private $query;
    use Exportable;

    public function __construct($query)
    {
        $this->query = $query;
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'email',
            'phone',
            'image_url',
            'lat',
            'lng',
            'address',
            'categories',
            'created_at',
        ];
    }

    public function query()
    {
        return $this->query;
    }

    public function map($t): array
    {
        return [
            $t->id,
            $t->name,
            $t->email,
            $t->phone,
            $t->image_url,
            $t->lat,
            $t->lng,
            $t->address,
            $t->categories->pluck('title')->toArray(),
            $t->created_at,
        ];
    }
}
