<x-layout>
    <script>
        const baseUrl = '{{ asset("src") }}';
    </script>
    <div id="contenido" class="row  px-3 justify-content-center gap-2">
        @if(session('message'))
        <span id='log' class='col-12 d-flex justify-content-between py-2 mb-0 bg-light opacity-75'><p>{{session('message')}}</p><p id='btnlog'>X</p></span>
        @endif
        @if(Auth::check())
        @vite(['resources/js/show/fav.js'])
        @endif
    </div>
</x-layout>