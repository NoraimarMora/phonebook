@if(count($groups) > 0)
    @foreach($groups as $group)
        <span class="groups" style="background-color: {{ $group->background_color }}; color: {{ $group->color }}">{{ $group->name }}</span>
    @endforeach
@endif