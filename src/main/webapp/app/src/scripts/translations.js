function translateConfig($translateProvider) {
    $translateProvider
        .translations('pl', {
            'xxx': 'xxx pl'
        })
        .translations('en', {
            'xxx': 'xxx en'
        });
    $translateProvider.preferredLanguage('pl');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
}

angular
    .module('rozrusznik').config(translateConfig);