<x-layout>
    <script>
        const baseUrl = '{{ asset("src") }}';
    </script>
    <div id="contenido" class="row">
            @vite(['resources/js/validations/fav.js'])
    </div>
</x-layout>