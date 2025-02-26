<x-layout>
    <script>
        const baseUrl = '{{ asset("src") }}';
    </script>
    <div id="contenido" class="bg-grad row">
        @vite(['resources/js/show/fav.js'])
    </div>
</x-layout>