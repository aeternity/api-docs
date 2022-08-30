(() => {
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
        config.urls = [
            {name: 'mainnet', url: 'https://mainnet.aeternity.io/api?oas3'},
            {name: 'testnet', url: 'https://testnet.aeternity.io/api?oas3'},
        ]
    }

    SwaggerUIBundle(config);
})();
