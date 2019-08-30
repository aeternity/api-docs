async function getLatestRelease() {
    return fetch('https://api.github.com/repos/aeternity/aeternity/releases/latest')
      .then(response => response.json())
      .then(data => {
        return data.tag_name;
      })
      .catch(error => console.error(error));
}

async function getRecentReleases() {
    return fetch('https://api.github.com/repos/aeternity/aeternity/releases?per_page=5')
      .then(response => response.json())
      .then(data => {
        return data.map(o => o['tag_name']);
      })
      .catch(error => console.error(error));
}

async function getSwaggerUrls() {
    const releases = await getRecentReleases();

    releases.push('master');

    return releases.map(v => {
        return {
            name: v,
            url: `https://raw.githubusercontent.com/aeternity/aeternity/${v}/config/swagger.yaml`
        };
    });
}

async function load() {
    const params = (new URL(location)).searchParams;
    const configUrl = params.has('config') ? params.get('config') : null;
    const config = {
        url: configUrl,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout"
    }

    // If the configuration is not provided as URL parameter, overwrite the url option with urls
    // https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/
    if (!configUrl) {
        let [urls, latest] = await Promise.all([getSwaggerUrls(), getLatestRelease()]);
        config.urls = urls;
        config['urls.primaryName'] = latest;
    }

    SwaggerUIBundle(config);
}

// cannot call async functions in global context
load();
