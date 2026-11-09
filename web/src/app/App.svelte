<script lang="ts">
  const version = fetch("/api/version").then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response.text();
  });
</script>

<h1>Tjikko</h1>
{#await version then value}
  <p>v{value}</p>
{:catch}
  <p>backend unreachable</p>
{/await}
