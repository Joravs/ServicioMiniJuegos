<x-layout>
    <script>
        const baseUrl = '{{ asset("src") }}';
    </script>
    <div id="contenido" class="row">
        @if(Auth::check())
            @vite(['resources/js/validations/fav.js'])
        @endif
    </div>
</x-layout>